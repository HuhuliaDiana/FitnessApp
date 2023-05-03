package com.fitnessapp.security;

import com.fitnessapp.service.user.UserDetailsImpl;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {

    @PreAuthorize("hasAuthority(#role)")
    public boolean hasAccess(final String role) {
        final var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof UserDetailsImpl userDetails) {
            return userDetails.isParticipant();
        }
        return false;
    }

}
