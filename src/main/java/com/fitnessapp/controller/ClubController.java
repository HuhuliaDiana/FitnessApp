package com.fitnessapp.controller;

import com.fitnessapp.endpoints.ClubEndpoints;
import com.fitnessapp.entity.Club;
import com.fitnessapp.entity.Subscription;
import com.fitnessapp.service.club.ClubService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(ClubEndpoints.CLUB_BASE_URL)
public class ClubController {
    private final ClubService clubService;

    @Operation(summary = "Get all clubs available for current user.")
    @GetMapping(ClubEndpoints.CLUBS_AVAILABLE_FOR_CURRENT_USER)
    public List<Club> getAllClubsAvailableForCurrentUser() {
        return clubService.getAllClubsUserHasAccessIn();
    }

    @Operation(summary = "Get clubs by city id.")
    @GetMapping(ClubEndpoints.CLUBS_BY_CITY_ID)
    public List<Club> getClubsByCityId(@PathVariable Long id) {
        return clubService.getAllClubsByCityId(id);
    }

    @Operation(summary = "Get subscriptions which allow user to access club by id.")
    @GetMapping(ClubEndpoints.CLUB_SUBSCRIPTIONS_PERMIT_USER_ACCESS_BY_ID)
    public List<Subscription> getSubscriptionsWhichAllowUserToAccessClub(@PathVariable Long id) {
        return clubService.getSubscriptionsWhichAllowUserToAccessClub(id);
    }
}
