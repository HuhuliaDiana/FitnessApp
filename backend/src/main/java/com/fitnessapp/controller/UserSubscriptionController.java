package com.fitnessapp.controller;

import com.fitnessapp.dto.FreezeMembershipDto;
import com.fitnessapp.dto.UserSubscriptionDto;
import com.fitnessapp.endpoints.UserSubscriptionEndpoints;
import com.fitnessapp.entity.UserSubscription;
import com.fitnessapp.entity.SubscriptionDate;
import com.fitnessapp.service.user_subscription.UserSubscriptionService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(UserSubscriptionEndpoints.USER_SUBSCRIPTION_BASE_URL)
@CrossOrigin(origins = "http://localhost:3000")
public class UserSubscriptionController {
    private final UserSubscriptionService userSubscriptionService;

    @Operation(summary = "Buy subscription by id and date.")
    @PostMapping(UserSubscriptionEndpoints.USER_SUBSCRIPTION_BUY_BY_ID)
    public UserSubscription buySubscription(@RequestBody SubscriptionDate subscriptionDate) {
        return userSubscriptionService.buySubscription(subscriptionDate);
    }

    @Operation(summary = "Cancel subscription.")
    @DeleteMapping
    public void cancelSubscription() {
        userSubscriptionService.cancelSubscription();
    }

    @Operation(summary = "Upgrade membership.")
    @PostMapping(UserSubscriptionEndpoints.USER_SUBSCRIPTION_UPGRADE_BY_ID)
    public UserSubscription upgradeMembership(@RequestBody SubscriptionDate subscriptionDate) {
        return userSubscriptionService.upgradeMembership(subscriptionDate.getId(), subscriptionDate.getDate());
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
}
