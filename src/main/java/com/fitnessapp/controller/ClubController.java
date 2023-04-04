package com.fitnessapp.controller;

import com.fitnessapp.endpoints.ClubEndpoints;
import com.fitnessapp.entity.Club;
import com.fitnessapp.service.club.ClubService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
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
}
