package com.fitnessapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @ManyToMany(mappedBy = "clubs")
    private Set<PersonalTrainer> personalTrainers;
    @OneToMany(mappedBy = "club")
    private Set<ClubRole> clubRoles = new HashSet<>();
    @ManyToOne(fetch = FetchType.LAZY)
    private Membership membership;
    @ManyToOne(fetch = FetchType.LAZY)
    private City city;


}
