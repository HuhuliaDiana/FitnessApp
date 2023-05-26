package com.fitnessapp.enums;

import lombok.Getter;

@Getter
public enum SubscriptionPeriodType {
    FULL_TIME_12_MONTHS(12), BINDING_12_MONTHS(12), FULL_TIME_1_MONTH_ROLLING(1);
    final Integer noMonths;

    SubscriptionPeriodType(Integer noMonths) {
        this.noMonths = noMonths;
    }


}
