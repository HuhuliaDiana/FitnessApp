package com.fitnessapp.service.role;

import com.fitnessapp.enums.ERole;
import com.fitnessapp.dto.RoleDto;
import com.fitnessapp.entity.Role;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.RoleMapper;
import com.fitnessapp.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService{
    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    
    public Role findByName(ERole name) {
        return roleRepository.findByName(name).orElseThrow(() -> new EntityNotFoundException("Role", "name", name));
    }

    
    public void save(RoleDto roleDto) {
        roleRepository.save(roleMapper.map(roleDto));
    }


}
