package com.fitnessapp.repository;

import com.fitnessapp.entity.SubscriptionPeriod;
import com.fitnessapp.enums.SubscriptionPeriodType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubscriptionPeriodRepository extends JpaRepository<SubscriptionPeriod, Long> {
    Optional<SubscriptionPeriod> findByName(SubscriptionPeriodType name);
}
