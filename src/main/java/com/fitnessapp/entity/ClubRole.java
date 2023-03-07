package com.fitnessapp.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.*;

@Entity
@Getter
@Setter
@Table(name = "club_role")
public class ClubRole extends BaseEntity {

    @ManyToMany(mappedBy = "clubRoles")
    private Set<User> participants = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "club_id")
    private Club club;

    @ManyToOne
    @JoinTable(name = "club_roles",
            joinColumns = @JoinColumn(name = "club_role_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Role role;
}
