package com.fitnessapp.service.role;

import com.fitnessapp.dto.ERole;
import com.fitnessapp.dto.RoleDto;
import com.fitnessapp.entity.Role;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.RoleMapper;
import com.fitnessapp.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    @Override
    public Role findByName(ERole name) {
        return roleRepository.findByName(name).orElseThrow(() -> new EntityNotFoundException("Role", "name", name));
    }

    @Override
    public RoleDto save(RoleDto roleDto) {
        Role role = roleMapper.map(roleDto);
        return roleMapper.map(roleRepository.save(role));
    }


}
