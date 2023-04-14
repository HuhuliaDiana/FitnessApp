package com.fitnessapp.entity;

import com.fitnessapp.enums.ECity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "club")
@Setter
@Getter
@NoArgsConstructor
public class Club {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String address;
    private String phone;
    @ManyToMany(mappedBy = "clubs")
    private Set<User> users = new HashSet<>();
    @OneToMany(mappedBy = "club")
    private Set<ClubRole> clubRoles = new HashSet<>();
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "membership_id")
    private Membership membership;
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "city_id")
    private City city;


}