package com.fitnessapp.service.club;

import com.fitnessapp.dto.ClubDto;
import com.fitnessapp.entity.Club;
import com.fitnessapp.entity.Subscription;
import com.fitnessapp.entity.UserSubscription;
import com.fitnessapp.enums.MembershipType;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.ClubMapper;
import com.fitnessapp.repository.ClubRepository;
import com.fitnessapp.service.membership.MembershipService;
import com.fitnessapp.service.subscription.SubscriptionService;
import com.fitnessapp.service.user.UserService;
import com.fitnessapp.service.user_subscription.UserSubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClubService {
    private final ClubMapper clubMapper;
    private final ClubRepository clubRepository;
    private final UserService userService;
    private final UserSubscriptionService userSubscriptionService;
    private final MembershipService membershipService;
    private final SubscriptionService subscriptionService;

    public void save(ClubDto clubDto) {
        clubRepository.save(clubMapper.map(clubDto));
    }

    public Club findById(Long id) {
        return clubRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Club", "id", id));
    }

    public List<Club> findAllByMembershipIdIn(List<Long> ids) {
        return (List<Club>) clubRepository.findAllByMembershipIdIn(ids);
    }

    public List<Club> getAllClubsUserHasAccessIn() {
        Long currentUserId = userService.getCurrentUserId();

        //get subscription of user
        UserSubscription userSubscription = userSubscriptionService.getByUserId(currentUserId);
        Long subscriptionId = userSubscription.getSubscription().getId();
        Subscription subscription = subscriptionService.getById(subscriptionId);

        //get membership of user and its children
        List<MembershipType> membershipTypes = subscription.getMembership().getName().getAllSmallerThan();

        //get ids of these memberships
        List<Long> membershipIds = membershipService.getMembershipTypeIds(membershipTypes);

        //get clubs that can be frequented by current user
        return findAllByMembershipIdIn(membershipIds);
    }

}
