package com.fitnessapp.service.subscription;

import com.fitnessapp.dto.SubscriptionDto;
import com.fitnessapp.mapper.SubscriptionMapper;
import com.fitnessapp.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService{
    private final SubscriptionMapper subscriptionMapper;
    private final SubscriptionRepository subscriptionRepository;
    @Override
    public void save(SubscriptionDto dto) {
        subscriptionRepository.save(subscriptionMapper.map(dto));
    }
}
