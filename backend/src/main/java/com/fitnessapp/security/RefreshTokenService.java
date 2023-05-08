package com.fitnessapp.security;

import com.fitnessapp.entity.RefreshToken;
import com.fitnessapp.exception.RefreshTokenException;
import com.fitnessapp.repository.RefreshTokenRepository;
import com.fitnessapp.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    @Value("${app.refreshTokenExpirationDays}")
    private Integer expiration;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserService userService;

    public String createRefreshToken(final String email) {
        return refreshTokenRepository.save(
                new RefreshToken()
                        .expiration(Instant.now().plus(expiration, ChronoUnit.DAYS))
                        .user(userService.findByEmail(email))
                        .token(UUID.randomUUID().toString())
        ).token();
    }

    public boolean validateToken(final String refreshToken) {
        return refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(RefreshTokenException::new)
                .expiration()
                .isAfter(Instant.now());
    }

    public RefreshToken getRefreshToken(final String token) {
        return refreshTokenRepository.findByToken(token).orElseThrow(RefreshTokenException::new);
    }

    public void deleteToken(final String refreshToken) {
        refreshTokenRepository.delete(getRefreshToken(refreshToken));
    }
}
