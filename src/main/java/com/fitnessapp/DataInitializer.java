package com.fitnessapp;

import com.fitnessapp.dto.ERole;
import com.fitnessapp.dto.RoleDto;
import com.fitnessapp.repository.RoleRepository;
import com.fitnessapp.service.role.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

@RequiredArgsConstructor
@Transactional
@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleService roleService;
    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) {
        if (roleRepository.count() == 0) saveRoles();
    }

    private void saveRoles() {
        Arrays.stream(ERole.values()).forEach(eRole -> {
            var role = new RoleDto();
            role.setName(eRole);
            roleService.save(role);
        });

    }
}
