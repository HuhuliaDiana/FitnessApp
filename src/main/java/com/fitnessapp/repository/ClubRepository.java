package com.fitnessapp.repository;

import com.fitnessapp.entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClubRepository extends JpaRepository<Club, Long> {
    Optional<Club> findByMembership_Id(Long id);
}
