package com.fitnessapp.repository;

import com.fitnessapp.entity.PTSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PTSessionRepository extends JpaRepository<PTSession, Long> {
    List<PTSession> findByUserPersonalTrainingId(Long id);

    Iterable<PTSession> findAllByUserPersonalTrainingIdIn(Iterable<Long> ids);
}
