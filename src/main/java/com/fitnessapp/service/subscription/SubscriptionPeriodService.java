package com.fitnessapp.service.subscription;

import com.fitnessapp.dto.SubscriptionPeriodDto;
import com.fitnessapp.entity.SubscriptionPeriod;
import com.fitnessapp.enums.SubscriptionPeriodType;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.SubscriptionPeriodMapper;
import com.fitnessapp.repository.SubscriptionPeriodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubscriptionPeriodService {

    private final SubscriptionPeriodRepository repository;
    private final SubscriptionPeriodMapper subscriptionPeriodMapper;

    
    public void save(SubscriptionPeriodDto dto) {
        repository.save(subscriptionPeriodMapper.map(dto));

    }

    
    public SubscriptionPeriod findByName(SubscriptionPeriodType name) {
        return repository.findByName(name).orElseThrow(() -> new EntityNotFoundException("Subscription Period", "name", name));
    }
}
