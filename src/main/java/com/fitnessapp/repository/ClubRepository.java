package com.fitnessapp.repository;

import com.fitnessapp.entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface ClubRepository extends JpaRepository<Club, Long> {
    List<Club> findAllByMembership_Id(Long id);
}
