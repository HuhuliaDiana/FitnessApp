package com.fitnessapp.service;

import com.fitnessapp.dto.ERole;
import com.fitnessapp.dto.RoleDto;
import com.fitnessapp.dto.UserDto;
import com.fitnessapp.entity.Role;
import com.fitnessapp.entity.User;
import com.fitnessapp.mapper.UserMapper;
import com.fitnessapp.repository.UserRepository;
import com.fitnessapp.service.role.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;

    private User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found by email"));
    }

    public UserDto createUser(UserDto userDto) {
        String rawPassword = userDto.getPassword();
        String encodedPassword = passwordEncoder.encode(rawPassword);
        userDto.setPassword(encodedPassword);
        Role role;
        if (userDto.getUserRole() != null) {
            RoleDto roleDto = userDto.getUserRole();
            role = roleService.findByName(roleDto.getName());
        } else {
            role = roleService.findByName(ERole.PARTICIPANT);
        }
        User user = userMapper.map(userDto);
        user.setUserRole(role);
        return userMapper.map(userRepository.save(user));
    }

}
