package com.fitnessapp.service.user;

import com.fitnessapp.dto.RoleDto;
import com.fitnessapp.dto.UserDto;
import com.fitnessapp.entity.Role;
import com.fitnessapp.entity.User;
import com.fitnessapp.enums.ERole;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.SubscriptionMapper;
import com.fitnessapp.mapper.UserMapper;
import com.fitnessapp.repository.UserRepository;
import com.fitnessapp.service.membership.MembershipService;
import com.fitnessapp.service.role.RoleService;
import com.fitnessapp.service.subscription.SubscriptionPeriodService;
import com.fitnessapp.service.subscription.SubscriptionService;
import com.fitnessapp.service.user_subscription.UserSubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;

    public User findByEmail(String email) {
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
        User saveUser;
        try {
            saveUser = userRepository.save(user);
        } catch (Exception e) {
            throw new ValidationException("User with email: %s already exists.".formatted(userDto.getEmail()));
        }
        return userMapper.map(saveUser);
    }

    public Long getCurrentUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ((UserDetailsImpl) principal).getId();
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User", "id", id));
    }

    public User getCurrentUser() {
        return findById(getCurrentUserId());
    }

    public UserDto mapCurrentUser() {
        return userMapper.map(getCurrentUser());
    }


}
