package com.fitnessapp.facade;

import com.fitnessapp.dto.JwtResponse;
import com.fitnessapp.dto.LoginRequest;
import com.fitnessapp.entity.RefreshTokenRecord;
import com.fitnessapp.exception.RefreshTokenException;
import com.fitnessapp.security.JwtService;
import com.fitnessapp.security.RefreshTokenService;
import com.fitnessapp.security.UserDetailsServiceImpl;
import com.fitnessapp.service.user.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationFacade {

    private final UserDetailsServiceImpl userDetailsService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    public JwtResponse authenticateUser(final LoginRequest loginRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        return generateJwtResponse(loginRequest.getEmail());
    }

    public JwtResponse generateJwtResponse(String email) {
        return generateJwtResponse(email, Optional.empty());

    }

    public JwtResponse generateJwtResponse(String email, Optional<Long> clubId) {
        final var userDetails = (UserDetailsImpl) (clubId.isPresent() ? userDetailsService.loadUserByEmailAndClubId(email, clubId.get())
                : userDetailsService.loadUserByUsername(email));
        final var authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        return userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .collect(Collectors.collectingAndThen(Collectors.toList(), roleList -> new JwtResponse(
                        userDetails.getId(),
                        userDetails.getEmail(),
                        roleList,
                        jwtService.generateJwtToken(userDetails, clubId)
                )));
    }

    public String refreshToken(final RefreshTokenRecord refreshTokenRecord) {
        if (!refreshTokenService.validateToken(refreshTokenRecord.token())) {
            refreshTokenService.deleteToken(refreshTokenRecord.token());
            throw new RefreshTokenException("Refresh Token expired");
        }
        final var refreshToken = refreshTokenService.getRefreshToken(refreshTokenRecord.token());
        final var userDetails = (UserDetailsImpl) userDetailsService.loadUserByUsername(refreshToken.user().getEmail());
        final var authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);
        return jwtService.generateJwtToken(userDetails, Optional.empty());
    }
}
