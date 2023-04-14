package com.fitnessapp.mapper;

import com.fitnessapp.dto.SubscriptionDto;
import com.fitnessapp.entity.Subscription;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SubscriptionMapper {
    SubscriptionDto map(Subscription subscription);
    Subscription map(SubscriptionDto subscription);
}
