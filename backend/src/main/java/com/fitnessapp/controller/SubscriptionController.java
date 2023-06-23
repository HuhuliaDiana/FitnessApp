package com.fitnessapp.controller;

import com.fitnessapp.dto.SubscriptionDto;
import com.fitnessapp.endpoints.SubscriptionEndpoints;
import com.fitnessapp.service.subscription.SubscriptionService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(SubscriptionEndpoints.SUBSCRIPTION_BASE_URL)
@CrossOrigin(origins = "http://localhost:3000")
public class SubscriptionController {
    private final SubscriptionService subscriptionService;

    @Operation(summary = "Get subscription by id")
    @GetMapping(SubscriptionEndpoints.SUBSCRIPTIONS_BY_ID)
    public SubscriptionDto getSubscriptionById(@PathVariable Long id) {
        return subscriptionService.findById(id);

    }
}
