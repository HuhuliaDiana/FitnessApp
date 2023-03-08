package com.fitnessapp.repository;

import com.fitnessapp.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface SubscriptionRepository extends JpaRepository<Subscription,Long> {
}
