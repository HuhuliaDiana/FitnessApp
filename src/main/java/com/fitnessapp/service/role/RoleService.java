package com.fitnessapp.service.role;

import com.fitnessapp.dto.ERole;
import com.fitnessapp.dto.RoleDto;
import com.fitnessapp.entity.Role;

import java.util.Optional;

public interface RoleService {
    Role findByName(ERole name);
    RoleDto save(RoleDto roleDto);
}
