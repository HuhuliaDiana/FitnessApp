package com.fitnessapp.controller;

import com.fitnessapp.dto.ClubDto;
import com.fitnessapp.dto.SubscriptionDto;
import com.fitnessapp.endpoints.ClubEndpoints;
import com.fitnessapp.entity.Club;
import com.fitnessapp.service.club.ClubService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(ClubEndpoints.CLUB_BASE_URL)
@CrossOrigin(origins = "http://localhost:3000")
public class ClubController {
    private final ClubService clubService;

    @Operation(summary = "Get all clubs available for current user.")
    @GetMapping(ClubEndpoints.CLUBS_AVAILABLE_FOR_CURRENT_USER)
    public List<ClubDto> getAllClubsAvailableForCurrentUser() {
        return clubService.getAllClubsUserHasAccessIn();
    }

    @Operation(summary = "Get clubs by city id.")
    @GetMapping(ClubEndpoints.CLUBS_BY_CITY_ID)
    public List<Club> getClubsByCityId(@PathVariable Long id) {
        return clubService.getAllClubsByCityId(id);
    }

    @Operation(summary = "Get subscriptions which allow user to access club by id.")
    @GetMapping(ClubEndpoints.CLUB_SUBSCRIPTIONS_PERMIT_USER_ACCESS_BY_ID)
    public List<SubscriptionDto> getSubscriptionsWhichAllowUserToAccessClub(@PathVariable Long id) {
        return clubService.getSubscriptionsWhichAllowUserToAccessClub(id);
    }

    @Operation(summary = "Get all clubs.")
    @GetMapping
    public List<ClubDto> getAllClubs() {
        return clubService.getAllClubs();
    }

    @Operation(summary = "Get club by id")
    @GetMapping(ClubEndpoints.CLUB_BY_ID)
    public ClubDto getClubById(@PathVariable Long id) {
        return clubService.getClubById(id);
    }

    @Operation(summary = "Get subscriptions for club by id.")
    @GetMapping(ClubEndpoints.CLUB_SUBSCRIPTIONS_BY_ID)
    public List<SubscriptionDto> getSubscriptionsForClub(@PathVariable Long id) {
        return clubService.getSubscriptionsForClub(id);
    }

    @Operation(summary = "Get all subscriptions available for club by id.")
    @GetMapping(ClubEndpoints.CLUB_ALL_SUBSCRIPTIONS_BY_ID)
    public List<SubscriptionDto> getAllSubscriptionsAvailableForClub(@PathVariable Long id) {
        return clubService.getAllSubscriptionsForClub(id);
    }

    @Operation(summary = "Get clubs with membership id, exclude current subscription's club.")
    @GetMapping(ClubEndpoints.CLUBS_BY_MEMBERSHIP_ID_EXCLUDE_CURRENT_MEMBERSHIP_CLUB)
    public List<ClubDto> getRestOfClubsWithCurrentMembershipId(@PathVariable Long id) {
        return clubService.getRestOfClubsWithCurrentMembershipId(id);
    }


}
