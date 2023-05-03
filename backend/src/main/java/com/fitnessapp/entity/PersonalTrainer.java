package com.fitnessapp.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Entity
@Table(name = "personal_trainer")
public class PersonalTrainer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToMany
    @JoinTable(name = "trainer_club",
            joinColumns = @JoinColumn(name = "personal_trainer_id"),
            inverseJoinColumns = @JoinColumn(name = "club_id"))
    private Set<Club> clubs;

    @ManyToMany
    @JoinTable(name = "trainer_personal_training",
            joinColumns = @JoinColumn(name = "personal_trainer_id"),
            inverseJoinColumns = @JoinColumn(name = "personal_training_id"))
    private Set<PersonalTraining> personalTrainings;

}
