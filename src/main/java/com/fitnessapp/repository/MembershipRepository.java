package com.fitnessapp.repository;

import com.fitnessapp.entity.Membership;
import com.fitnessapp.enums.EMembership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MembershipRepository extends JpaRepository<Membership,Long> {
    Optional<Membership> findByName(EMembership name);
}
