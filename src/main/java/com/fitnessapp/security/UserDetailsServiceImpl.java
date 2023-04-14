package com.fitnessapp.security;

import com.fitnessapp.entity.ClubRole;
import com.fitnessapp.entity.User;
import com.fitnessapp.repository.UserRepository;
import com.fitnessapp.service.role.ClubRoleService;
import com.fitnessapp.service.user.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsProjectBoundedService {

    private final UserRepository userRepository;
    private final ClubRoleService clubRoleService;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email: %s".formatted(email)));
        return UserDetailsImpl.buildWithAppBoundAuthorities(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByEmailAndClubId(String email, Long clubId) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email: %s".formatted(email)));
        List<ClubRole> clubRoles = clubRoleService.findByClubAndUserEmail(email, clubId);
        if (clubRoles.isEmpty()) {
            throw new AccessDeniedException(String.format("User with email: %s is not attached to club with id: %s", email, clubId));
        }
        return UserDetailsImpl.buildWithClubBoundAuthorities(user, clubRoles, clubId);
    }


}
