package com.fitnessapp.mapper;

import com.fitnessapp.dto.SubscriptionPeriodDto;
import com.fitnessapp.entity.SubscriptionPeriod;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SubscriptionPeriodMapper {
    SubscriptionPeriod map(SubscriptionPeriodDto subscriptionPeriodDto);
    SubscriptionPeriodDto map(SubscriptionPeriod subscriptionPeriod);
}
