package com.fitnessapp.service.role;

import com.fitnessapp.entity.ClubRole;

import java.util.List;

public interface ClubRoleService {
    List<ClubRole> findByClubAndUserEmail(String email, Long clubId);
}
