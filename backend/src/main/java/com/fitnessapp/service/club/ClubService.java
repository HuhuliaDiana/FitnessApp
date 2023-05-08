package com.fitnessapp.service.club;

import com.fitnessapp.dto.ClubDto;
import com.fitnessapp.dto.SubscriptionDto;
import com.fitnessapp.entity.Club;
import com.fitnessapp.entity.Membership;
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
import java.util.Objects;

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

    public ClubDto getClubById(Long id) {
        return clubMapper.map(findClubById(id));
    }

    public List<Club> findAllByMembershipIdIn(List<Long> ids) {
        return (List<Club>) clubRepository.findAllByMembershipIdIn(ids);
    }

    public List<ClubDto> getAllClubsUserHasAccessIn() {
        Long currentUserId = userService.getCurrentUserId();

        //get subscription of user
        UserSubscription userSubscription = userSubscriptionService.getByUserId(currentUserId);
        Long subscriptionId = userSubscription.getSubscription().getId();
        Subscription subscription = subscriptionService.getById(subscriptionId);

        //get membership of user and its children
        List<MembershipType> membershipTypes = subscription.getMembership().getName().getAllLessThan();

        //get ids of these memberships
        List<Long> membershipIds = membershipService.getMembershipTypeIds(membershipTypes);

        //get clubs that can be frequented by current user
        var clubs = findAllByMembershipIdIn(membershipIds);
        return clubs.stream().map(clubMapper::map).toList();
    }

    public List<Club> getAllClubsByCityId(Long cityId) {
        return clubRepository.findAllByCityId(cityId);
    }

    //I have a club, get me subscriptions I can buy to access that club
    public List<SubscriptionDto> getSubscriptionsWhichAllowUserToAccessClub(Long clubId) {
        Club club = findClubById(clubId);
        List<MembershipType> membershipTypes = club.getMembership().getName().getAllGreaterThan();
        List<Long> membershipIds = membershipService.getMembershipTypeIds(membershipTypes);
        return subscriptionService.findAllByMembershipIdIn(membershipIds);

    }

    public Club findClubById(Long clubId) {
        return clubRepository.findById(clubId).orElseThrow(() -> new EntityNotFoundException("Club", "id", clubId));
    }

    public List<ClubDto> getAllClubs() {
        return clubRepository.findAll().stream().map(clubMapper::map).toList();
    }

    public List<SubscriptionDto> getSubscriptionsForClub(Long clubId) {
        Membership membership = findClubById(clubId).getMembership();
        return subscriptionService.findByMembershipId(membership.getId());

    }

    //sectiune de cluburi pe care le poate accesa utilizatorul
    public List<SubscriptionDto> getAllSubscriptionsForClub(Long clubId) {
        Membership membership = findClubById(clubId).getMembership();
        List<MembershipType> membershipTypes = membership.getName().getAllGreaterThan();
        List<Long> membershipIds = membershipService.getMembershipTypeIds(membershipTypes);
        return subscriptionService.findAllByMembershipIdIn(membershipIds);

    }

    //get clubs with same membership in order to transfer membership to another club
    public List<ClubDto> getRestOfClubsWithCurrentMembershipId(Long id) {
        UserSubscription userSubscription = userSubscriptionService.getCurrentUserSubscription();
        List<Club> clubs = clubRepository.findAllByMembershipId(id);
        List<Club> clubsFiltered = clubs.stream().filter(club -> !Objects.equals(club.getId(), userSubscription.getClub().getId())).toList();
        return clubsFiltered.stream().map(clubMapper::map).toList();
    }

}
