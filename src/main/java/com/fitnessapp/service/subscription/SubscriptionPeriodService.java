package com.fitnessapp.service.subscription;

import com.fitnessapp.dto.SubscriptionPeriodDto;
import com.fitnessapp.entity.SubscriptionPeriod;
import com.fitnessapp.enums.ESubscriptionPeriod;

public interface SubscriptionPeriodService {
    void save(SubscriptionPeriodDto dto);
    SubscriptionPeriod findByName(ESubscriptionPeriod name);

}
