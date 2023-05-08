package com.fitnessapp.repository;

import com.fitnessapp.entity.Club;
import com.fitnessapp.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription,Long> {
    Optional<Subscription> findBySubscriptionPeriodIdAndMembershipId(Long subPeriodId, Long membershipId);
    Iterable<Subscription> findAllByMembershipIdIn(Iterable<Long> ids);
    Iterable<Subscription> findAllByMembershipIdInAndSubscriptionPeriodId(Iterable<Long> ids, Long id);
    List<Subscription> findByMembershipId(Long id);

}
