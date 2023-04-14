package com.fitnessapp.controller;

import com.fitnessapp.dto.FreezeMembershipDto;
import com.fitnessapp.endpoints.UserSubscriptionEndpoints;
import com.fitnessapp.entity.UserSubscription;
import com.fitnessapp.service.user_subscription.UserSubscriptionService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping(UserSubscriptionEndpoints.USER_SUBSCRIPTION_BASE_URL)
public class UserSubscriptionController {
    private final UserSubscriptionService userSubscriptionService;

    @Operation(summary = "Buy subscription by id and date.")
    @PostMapping(UserSubscriptionEndpoints.USER_SUBSCRIPTION_BUY_BY_ID)
    public UserSubscription buySubscription(@PathVariable Long id, @RequestBody LocalDate startingDate) {
        return userSubscriptionService.buySubscription(id, startingDate);
    }

    @Operation(summary = "Cancel subscription.")
    @DeleteMapping
    public void cancelSubscription() {
        userSubscriptionService.cancelSubscription();
    }

    @Operation(summary = "Upgrade membership.")
    @PostMapping(UserSubscriptionEndpoints.USER_SUBSCRIPTION_UPGRADE_BY_ID)
    public UserSubscription upgradeMembership(@PathVariable Long id,
                                              @RequestBody LocalDate date) {
        return userSubscriptionService.upgradeMembership(id, date);
    }

    @Operation(summary = "Freeze membership.")
    @PatchMapping(UserSubscriptionEndpoints.USER_SUBSCRIPTION_FREEZE_BY_ID)
    public UserSubscription freezeMembership(@RequestBody FreezeMembershipDto freezeMembershipDto) {
        return userSubscriptionService.freezeMembership(freezeMembershipDto);
    }
}
