package com.fitnessapp.facade;

import com.fitnessapp.dto.JwtResponse;
import com.fitnessapp.dto.LoginRequest;
import com.fitnessapp.security.JwtService;
import com.fitnessapp.security.UserDetailsServiceImpl;
import com.fitnessapp.service.user.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationFacade {

    private final UserDetailsServiceImpl userDetailsService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public JwtResponse authenticateUser(final LoginRequest loginRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        return generateJwtResponse(loginRequest.getEmail());
    }

    public JwtResponse generateJwtResponse(String email) {
        final var userDetails = (UserDetailsImpl) userDetailsService.loadUserByUsername(email);
        final var authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        return userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .collect(Collectors.collectingAndThen(Collectors.toList(), roleList -> new JwtResponse(
                        userDetails.getId(),
                        userDetails.getEmail(),
                        roleList,
                        jwtService.generateJwtToken(userDetails)
                )));
    }

}
