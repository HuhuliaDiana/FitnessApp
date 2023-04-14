package com.fitnessapp.repository;

import com.fitnessapp.entity.ClubRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClubRoleRepository extends JpaRepository<ClubRole, Long> {

    @Query("select p from ClubRole p JOIN p.participants u where p.club.id=?1 AND u.email=?2")
    List<ClubRole> findAllByClubIdAndParticipantEmail(Long clubId,String email);
}
