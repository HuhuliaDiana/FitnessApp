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
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "personal_training_type_id")
    private PersonalTrainingType personalTrainingType;

    @ManyToMany
    @JoinTable(name = "trainer_club",
            joinColumns = @JoinColumn(name = "personal_trainer_id"),
            inverseJoinColumns = @JoinColumn(name = "club_id"))
    private Set<Club> clubs = new HashSet<>();

}
