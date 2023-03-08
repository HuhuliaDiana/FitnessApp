package com.fitnessapp.service.role;

import com.fitnessapp.enums.ERole;
import com.fitnessapp.dto.RoleDto;
import com.fitnessapp.entity.Role;
import org.springframework.stereotype.Service;

public interface RoleService {
    Role findByName(ERole name);
    void save(RoleDto roleDto);
}
