package com.fitnessapp.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.*;


@Entity
@Table(name = "participant", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    @Size(min = 8, max = 100)
    private String password;

    @ManyToOne
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Role userRole;

    @ManyToMany
    @JoinTable(name = "booked_class",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "training_class_id"))
    private Set<TrainingClass> trainingClasses = new HashSet<>();




}
