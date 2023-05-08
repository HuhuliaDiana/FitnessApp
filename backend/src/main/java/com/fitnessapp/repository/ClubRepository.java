package com.fitnessapp.repository;

import com.fitnessapp.entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClubRepository extends JpaRepository<Club, Long> {
    Iterable<Club> findAllByMembershipIdIn(Iterable<Long> ids);
    List<Club> findAllByCityId(Long cityId);
    List<Club> findAllByMembershipId(Long membershipId);
}
