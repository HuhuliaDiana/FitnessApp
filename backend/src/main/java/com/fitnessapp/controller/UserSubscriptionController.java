package com.fitnessapp.controller;

import com.fitnessapp.dto.FreezeMembershipDto;
import com.fitnessapp.dto.SubscriptionDto;
import com.fitnessapp.dto.UserSubscriptionDto;
import com.fitnessapp.endpoints.UserSubscriptionEndpoints;
import com.fitnessapp.entity.UserSubscription;
import com.fitnessapp.dto.SubscriptionRecord;
import com.fitnessapp.service.user_subscription.UserSubscriptionService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(UserSubscriptionEndpoints.USER_SUBSCRIPTION_BASE_URL)
@CrossOrigin(origins = "http://localhost:3000")
public class UserSubscriptionController {
    private final UserSubscriptionService userSubscriptionService;

    @Operation(summary = "Buy subscription by id and date.")
    @PostMapping(UserSubscriptionEndpoints.USER_SUBSCRIPTION_BUY_BY_ID)
    public UserSubscription buySubscription(@RequestBody SubscriptionRecord subscriptionRecord) {
        return userSubscriptionService.buySubscription(subscriptionRecord);
    }

    @Operation(summary = "Cancel subscription.")
    @DeleteMapping
    public void cancelSubscription() {
        userSubscriptionService.cancelSubscription();
    }

    @Operation(summary = "Upgrade membership.")
    @PostMapping(UserSubscriptionEndpoints.USER_SUBSCRIPTION_UPGRADE_BY_ID)
    public UserSubscription upgradeMembership(@RequestBody SubscriptionRecord subscriptionRecord) {
        return userSubscriptionService.upgradeMembership(subscriptionRecord.id(), subscriptionRecord.localDate());
    }

    @Operation(summary = "Freeze membership.")
    @PatchMapping(UserSubscriptionEndpoints.USER_SUBSCRIPTION_FREEZE_BY_ID)
    public UserSubscription freezeMembership(@RequestBody FreezeMembershipDto freezeMembershipDto) {
        return userSubscriptionService.freezeMembership(freezeMembershipDto);
    }

    @Operation(summary = "Get current subscription.")
    @GetMapping
    public UserSubscriptionDto getCurrentSubscription(){
        return userSubscriptionService.getCurrentUserSubscriptionDto();
    }
    @Operation(summary = "Get memberships to upgrade current membership.")
    @GetMapping(UserSubscriptionEndpoints.USER_SUBSCRIPTION_UPGRADE_BY_ID)
    public List<SubscriptionDto> getMembershipsForUpgrading() {
        return userSubscriptionService.getMembershipsForUpgrading();
    }

    @Operation(summary = "Transfer current membership to club by id.")
    @PutMapping(UserSubscriptionEndpoints.USER_SUBSCRIPTION_TRANSFER_TO_CLUB_BY_ID)
    public UserSubscriptionDto transferMembershipToClubById(@PathVariable Long id) {
        return userSubscriptionService.transferMembershipToClubById(id);
    }
}
