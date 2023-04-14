package com.fitnessapp.service.user_subscription;

import com.fitnessapp.dto.FreezeMembershipDto;
import com.fitnessapp.dto.UserSubscriptionDto;
import com.fitnessapp.entity.Subscription;
import com.fitnessapp.entity.UserSubscription;
import com.fitnessapp.enums.MembershipType;
import com.fitnessapp.enums.SubscriptionPeriodType;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.UserSubscriptionMapper;
import com.fitnessapp.repository.UserSubscriptionRepository;
import com.fitnessapp.service.subscription.SubscriptionService;
import com.fitnessapp.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserSubscriptionService {
    private final UserSubscriptionRepository userSubscriptionRepository;
    private final UserSubscriptionMapper userSubscriptionMapper;
    private final SubscriptionService subscriptionService;
    private final UserService userService;


    public UserSubscription save(UserSubscriptionDto userSubscriptionDto) {
        return userSubscriptionRepository.save(userSubscriptionMapper.map(userSubscriptionDto));
    }

    public UserSubscription getByUserId(Long userId) {
        return userSubscriptionRepository.findByUser_Id(userId).orElseThrow(() -> new EntityNotFoundException("User subscription", "user id", userId));
    }

    @Transactional
    public UserSubscription buySubscription(Long id, LocalDate startingDate) {
        if (getOptionalCurrentUserSubscription().isPresent()) cancelSubscription(); // user can not have 2 subscriptions

        Subscription subscriptionWanted = subscriptionService.getById(id);
        SubscriptionPeriodType subPeriodType = subscriptionWanted.getSubscriptionPeriod().getName();

        UserSubscriptionDto userSubscriptionDto = new UserSubscriptionDto();
        userSubscriptionDto.setUser(userService.mapCurrentUser());
        userSubscriptionDto.setStartDate(startingDate);

        userSubscriptionDto.setEndDate(userSubscriptionDto.getStartDate().plusMonths(subPeriodType.getNoMonths()).minusDays(1));
        userSubscriptionDto.setSubscription(subscriptionService.map(subscriptionWanted));
        return save(userSubscriptionDto);

    }

    public MembershipType getMembershipOfCurrentUser() {
        UserSubscription userSubscription = getByUserId(userService.getCurrentUserId());
        Subscription subscription = subscriptionService.getById(userSubscription.getSubscription().getId());
        return subscription.getMembership().getName();

    }

    public boolean currentUserHasNoSubscription() {
        return userSubscriptionRepository.findByUser_Id(userService.getCurrentUserId()).isEmpty();
    }

    public void cancelSubscription() {
        UserSubscription userSubscription = getCurrentUserSubscription();
        userSubscriptionRepository.delete(userSubscription);
    }

    public UserSubscription getCurrentUserSubscription() {
        return getOptionalCurrentUserSubscription().orElseThrow(() -> new EntityNotFoundException("User subscription", "user_id", userService.getCurrentUserId()));
    }

    public Optional<UserSubscription> getOptionalCurrentUserSubscription() {
        Long currentUserId = userService.getCurrentUserId();
        return userSubscriptionRepository.findByUser_Id(currentUserId);
    }

    //in front afiseaza suma ce ramane de platit de la dateTime pana la finalul abonamentului
    public UserSubscription upgradeMembership(Long subscriptionId, LocalDate dateTime) {
        cancelSubscription();
        UserSubscriptionDto userSubscriptionDto = new UserSubscriptionDto();
        userSubscriptionDto.setUser(userService.mapCurrentUser());
        userSubscriptionDto.setStartDate(dateTime);
        userSubscriptionDto.setSubscription(subscriptionService.map(subscriptionService.getById(subscriptionId)));
        return save(userSubscriptionDto);

    }
    @Transactional
    public UserSubscription freezeMembership(FreezeMembershipDto freezeMembershipDto) {
        UserSubscription userSubscription = getByUserId(userService.getCurrentUserId());

        LocalDate firstDayOfFreeze = freezeMembershipDto.getFirstDayOfFreeze();
        userSubscription.setStartFreeze(firstDayOfFreeze);
        Long numberOfDays = freezeMembershipDto.getNumberOfDays();

        userSubscription.setEndFreeze(firstDayOfFreeze.plusDays(numberOfDays));
        userSubscription.setEndDate(userSubscription.getEndDate().plusDays(numberOfDays));
        return userSubscription;
    }
}
