package com.fitnessapp.mapper;

import com.fitnessapp.dto.UserSubscriptionDto;
import com.fitnessapp.entity.UserSubscription;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserSubscriptionMapper {
    UserSubscription map(UserSubscriptionDto userSubscriptionDto);
    UserSubscriptionDto map(UserSubscription userSubscriptionDto);
}
