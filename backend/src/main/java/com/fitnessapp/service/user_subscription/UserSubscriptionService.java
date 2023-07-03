package com.fitnessapp.service.user_subscription;

import com.fitnessapp.dto.FreezeMembershipDto;
import com.fitnessapp.dto.SubscriptionDto;
import com.fitnessapp.dto.UserSubscriptionDto;
import com.fitnessapp.entity.Club;
import com.fitnessapp.entity.Subscription;
import com.fitnessapp.dto.SubscriptionRecord;
import com.fitnessapp.entity.UserSubscription;
import com.fitnessapp.enums.MembershipType;
import com.fitnessapp.enums.SubscriptionPeriodType;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.ClubMapper;
import com.fitnessapp.mapper.UserSubscriptionMapper;
import com.fitnessapp.repository.ClubRepository;
import com.fitnessapp.repository.UserSubscriptionRepository;
import com.fitnessapp.service.membership.MembershipService;
import com.fitnessapp.service.subscription.SubscriptionService;
import com.fitnessapp.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserSubscriptionService {
    private final UserSubscriptionRepository userSubscriptionRepository;
    private final UserSubscriptionMapper userSubscriptionMapper;
    private final SubscriptionService subscriptionService;
    private final UserService userService;
    private final ClubMapper clubMapper;
    private final ClubRepository clubRepository;
    private final MembershipService membershipService;


    public UserSubscription save(UserSubscriptionDto userSubscriptionDto) {
        return userSubscriptionRepository.save(userSubscriptionMapper.map(userSubscriptionDto));
    }

    public UserSubscription getByUserId(Long userId) {
        return userSubscriptionRepository.findByUser_Id(userId).orElseThrow(() -> new EntityNotFoundException("User subscription", "user id", userId));
    }

    @Transactional
    public UserSubscription buyMembership(SubscriptionRecord subscriptionRecord) {
        if (getOptionalCurrentUserSubscription().isPresent()) cancelSubscription();

        Subscription subscriptionWanted = subscriptionService.getById(subscriptionRecord.id());
        LocalDate date = LocalDate.parse(subscriptionRecord.localDate());
        SubscriptionPeriodType subPeriodType = subscriptionWanted.getSubscriptionPeriod().getName();

        UserSubscriptionDto userSubscriptionDto = new UserSubscriptionDto();
        userSubscriptionDto.setUser(userService.mapCurrentUser());
        userSubscriptionDto.setStartDate(date);
        Club club = clubRepository.findById(subscriptionRecord.clubId()).orElseThrow(() ->
                new EntityNotFoundException("Club", "id", subscriptionRecord.clubId()));
        userSubscriptionDto.setClub(clubMapper.map(club));

        userSubscriptionDto.setEndDate(userSubscriptionDto.getStartDate().plusMonths(subPeriodType.getNoMonths())
                .minusDays(1));
        userSubscriptionDto.setSubscription(subscriptionService.map(subscriptionWanted));

        var subscriptionPeriodType = subscriptionWanted.getSubscriptionPeriod().getName();
        if (!subscriptionPeriodType.equals(SubscriptionPeriodType.FULL_TIME_1_MONTH_ROLLING))
            userSubscriptionDto.setNoDaysLeftToFreeze(30);

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

    public UserSubscriptionDto getCurrentUserSubscriptionDto() {
        return userSubscriptionMapper.map(getCurrentUserSubscription());
    }

    public Optional<UserSubscription> getOptionalCurrentUserSubscription() {
        Long currentUserId = userService.getCurrentUserId();
        return userSubscriptionRepository.findByUser_Id(currentUserId);
    }

    @Transactional
    public UserSubscriptionDto freezeMembership(FreezeMembershipDto freezeMembershipDto) {
        UserSubscription userSubscription = getByUserId(userService.getCurrentUserId());

        LocalDate firstDayOfFreeze = freezeMembershipDto.getFirstDayOfFreeze();
        userSubscription.setStartFreeze(firstDayOfFreeze);
        Integer numberOfDays = freezeMembershipDto.getNumberOfDays();

        userSubscription.setEndFreeze(firstDayOfFreeze.plusDays(numberOfDays));
        userSubscription.setEndDate(userSubscription.getEndDate().plusDays(numberOfDays));
        userSubscription.setNoDaysLeftToFreeze(userSubscription.getNoDaysLeftToFreeze() - freezeMembershipDto.getNumberOfDays());
        return userSubscriptionMapper.map(userSubscription);
    }

    public List<SubscriptionDto> getMembershipsForUpgrading() {
        UserSubscription userSubscription = getCurrentUserSubscription();
        MembershipType membershipName = userSubscription.getSubscription().getMembership().getName();
        Long subPeriodId = userSubscription.getSubscription().getSubscriptionPeriod().getId();
        List<MembershipType> membershipTypes = membershipName.getAllGreaterThan();
        List<Long> membershipIds = membershipService.getMembershipTypeIds(membershipTypes);
        return subscriptionService.findAllByMembershipIdInAndSubscriptionPeriodId(membershipIds, subPeriodId);

    }

    @Transactional
    public UserSubscriptionDto transferMembershipToClubById(Long id) {
        UserSubscription userSubscription = getCurrentUserSubscription();
        userSubscription.setClub(clubRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Club", "id", id)));
        return userSubscriptionMapper.map(userSubscription);
    }


    public List<SubscriptionDto> getMembershipsForRenew() {
        UserSubscription userSubscription = getCurrentUserSubscription();
        MembershipType membershipName = userSubscription.getSubscription().getMembership().getName();
        List<MembershipType> membershipTypes = membershipName.getAllGreaterThan();
        List<Long> membershipIds = membershipService.getMembershipTypeIds(membershipTypes);
        return subscriptionService.findAllByMembershipIdIn(membershipIds);
    }
}
