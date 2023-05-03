package com.fitnessapp.service.user;

import com.fitnessapp.entity.ClubRole;
import com.fitnessapp.entity.User;
import com.fitnessapp.enums.ERole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@AllArgsConstructor
public class UserDetailsImpl implements UserDetails {

    private Long id;
    private Long clubId;
    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    @Serial
    private static final long serialVersionUID = 1L;

    public static UserDetailsImpl buildWithAppBoundAuthorities(User user) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getUserRole().getName().name()));
        return build(user, authorities, null);
    }

    public static UserDetailsImpl buildWithClubBoundAuthorities(User user, List<ClubRole> clubRoles, Long clubId) {
        List<SimpleGrantedAuthority> authorities = clubRoles
                .stream()
                .map(pr -> new SimpleGrantedAuthority(pr.getRole().getName().name()))
                .toList();
        return build(user, authorities, clubId);
    }

    private static UserDetailsImpl build(User user, List<? extends GrantedAuthority> authorities, Long clubId) {
        return new UserDetailsImpl(user.getId(), clubId, user.getEmail(), user.getPassword(), authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setClubId(Long id) {
        this.clubId = id;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public boolean isParticipant() {
        return authorities.stream().map(GrantedAuthority::getAuthority).anyMatch(a -> a.equals(ERole.PARTICIPANT.name()));
    }
}
