package com.fitnessapp.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "club")
@Setter
@Getter
@NoArgsConstructor
public class Club extends BaseEntity {

    private String name;
    private String address;
    private String phone;
    @ManyToMany(mappedBy = "clubs")
    private Set<User> users = new HashSet<>();

    @OneToMany(mappedBy = "club")
    private Set<ClubRole> clubRoles = new HashSet<>();
//    @OneToOne
//    @JoinColumn(name = "membership_id", referencedColumnName = "id")
//    private Membership membership;
//    @ManyToOne(cascade = CascadeType.MERGE)
//    @JoinColumn(name = "city_id")
//    private City city;


}
