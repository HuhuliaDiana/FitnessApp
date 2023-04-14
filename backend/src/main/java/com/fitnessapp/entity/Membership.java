package com.fitnessapp.entity;

import com.fitnessapp.enums.MembershipType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "membership", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class Membership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private MembershipType name;


}
