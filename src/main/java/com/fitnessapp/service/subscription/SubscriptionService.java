package com.fitnessapp.service.subscription;

import com.fitnessapp.dto.SubscriptionDto;
import com.fitnessapp.entity.Subscription;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.SubscriptionMapper;
import com.fitnessapp.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubscriptionService {
    private final SubscriptionMapper subscriptionMapper;
    private final SubscriptionRepository subscriptionRepository;

    public void save(SubscriptionDto dto) {
        subscriptionRepository.save(subscriptionMapper.map(dto));
    }

    public Subscription getBySubscriptionPeriodAndMembership(Long subPeriodId, Long membershipId) {
        return subscriptionRepository.findBySubscriptionPeriodIdAndMembershipId(subPeriodId, membershipId).orElseThrow(() ->
                new EntityNotFoundException("Subscription was not found with sub period id: %s and membership id: %s".formatted(subPeriodId, membershipId)));
    }

    public Subscription getById(Long id) {
        return subscriptionRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Subscription", "id", id));
    }

    public SubscriptionDto map(Subscription subscription) {
        return subscriptionMapper.map(subscription);
    }






}
