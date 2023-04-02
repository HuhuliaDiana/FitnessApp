package com.fitnessapp.service.user;

import com.fitnessapp.dto.UserSubscriptionDto;
import com.fitnessapp.entity.*;
import com.fitnessapp.enums.MembershipType;
import com.fitnessapp.enums.ERole;
import com.fitnessapp.dto.RoleDto;
import com.fitnessapp.dto.UserDto;
import com.fitnessapp.enums.SubscriptionPeriodType;
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
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;
    private final MembershipService membershipService;
    private final SubscriptionPeriodService subscriptionPeriodService;
    private final SubscriptionService subscriptionService;
    private final SubscriptionMapper subscriptionMapper;
    private final UserSubscriptionService userSubscriptionService;

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

    @Transactional
    public UserSubscription buySubscription(MembershipType membershipType, SubscriptionPeriodType subscriptionPeriodType) {
        Membership membership = membershipService.findByName(membershipType);
        SubscriptionPeriod subscriptionPeriod = subscriptionPeriodService.findByName(subscriptionPeriodType);
        Subscription subscription = subscriptionService.getBySubscriptionPeriodAndMembership(subscriptionPeriod.getId(), membership.getId());
        UserSubscriptionDto userSubscriptionDto = new UserSubscriptionDto();
        userSubscriptionDto.setUser(userMapper.map(getCurrentUser()));
        userSubscriptionDto.setStartDate(LocalDateTime.now());
        userSubscriptionDto.setSubscription(subscriptionMapper.map(subscription));
        return userSubscriptionService.save(userSubscriptionDto);

    }


}
