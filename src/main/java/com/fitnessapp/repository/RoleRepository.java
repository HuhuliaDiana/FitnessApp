package com.fitnessapp.repository;

import com.fitnessapp.enums.ERole;
import com.fitnessapp.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);

}
