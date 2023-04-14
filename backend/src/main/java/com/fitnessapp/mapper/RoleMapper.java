package com.fitnessapp.mapper;

import com.fitnessapp.dto.RoleDto;
import com.fitnessapp.entity.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    RoleDto map(Role role);
    Role map(RoleDto role);
}
