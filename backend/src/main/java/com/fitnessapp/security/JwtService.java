package com.fitnessapp.security;

import com.fitnessapp.service.user.UserDetailsImpl;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class JwtService {

    public static final String CLUB_ID_CLAIM_KEY = "clubId";
    public static final String AUTHORITIES_CLAIM_KEY = "roles";
    @Value("${app.jwtSecret}")
    public String jwtSecret;

    @Value("${app.jwtExpirationHours}")
    public Integer expiration;

    public String generateJwtToken(final UserDetailsImpl userDetails) {
        final String authorities = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        JwtBuilder jwtBuilder = Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("roles", authorities)
                .setIssuedAt(new Date())
                .setExpiration(Date.from(Instant.now().plus(expiration, ChronoUnit.HOURS)))
                .signWith(SignatureAlgorithm.HS384, "superSecretKey");
        return jwtBuilder.compact();
    }

    public String parseJwt(final String token) {
        return StringUtils.hasText(token) && token.startsWith("Bearer ") ? token.substring(7) : null;
    }

    public boolean isGuestToken(String jwt) {
        try {
            return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJwt(jwt).getBody().containsKey("guest_info");
        } catch (Exception exception) {
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public UsernamePasswordAuthenticationToken getAuthToken(String token, UserDetailsImpl userDetails) {
        JwtParser jwtParser = Jwts.parser().setSigningKey(jwtSecret);
        Claims claims = jwtParser.parseClaimsJws(token).getBody();
        if (claims.get(CLUB_ID_CLAIM_KEY) != null) {
            userDetails.setClubId(Long.parseLong(claims.get(CLUB_ID_CLAIM_KEY).toString()));
        }
        Collection<? extends GrantedAuthority> authorities = Arrays.stream(claims.get(AUTHORITIES_CLAIM_KEY).toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .toList();
        return new UsernamePasswordAuthenticationToken(userDetails, "", authorities);
    }
}
