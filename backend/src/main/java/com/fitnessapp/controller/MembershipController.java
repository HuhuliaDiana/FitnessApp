package com.fitnessapp.controller;

import com.fitnessapp.endpoints.MembershipEndpoints;
import com.fitnessapp.entity.MembershipRecord;
import com.fitnessapp.service.membership.MembershipService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(MembershipEndpoints.MEMBERSHIP_BASE_URL)
@CrossOrigin(origins = "http://localhost:3000")
public class MembershipController {
    private final MembershipService membershipService;

    @Operation(summary = "Get all memberships.")
    @GetMapping
    public List<MembershipRecord> getAllMemberships() {
        return membershipService.getAllMemberships();

    }
}
