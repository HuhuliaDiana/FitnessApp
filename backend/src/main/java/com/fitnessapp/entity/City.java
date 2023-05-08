package com.fitnessapp.entity;

import com.fitnessapp.enums.ECity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "city", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    @Column(length = 15)
    private ECity name;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "city")
    private Set<Club> clubs = new HashSet<>();

}
