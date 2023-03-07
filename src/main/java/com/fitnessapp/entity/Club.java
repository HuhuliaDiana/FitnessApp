package com.fitnessapp.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.*;

@Entity
@Table(name = "club")
@Setter
@Getter
@NoArgsConstructor
public class Club extends BaseEntity {

    private String name;

    @ManyToMany(mappedBy = "clubs")
    private Set<User> users = new HashSet<>();

    @OneToMany(mappedBy = "club")
    private Set<ClubRole> clubRoles = new HashSet<>();
}
