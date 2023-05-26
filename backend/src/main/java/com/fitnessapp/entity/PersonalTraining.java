package com.fitnessapp.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "personal_training")
public class PersonalTraining {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private PersonalTrainingType personalTrainingType;
    private Integer sessionsNumber;
    private Double price;
    private Integer noDaysValidity;

    @ManyToMany(mappedBy = "personalTrainings")
    private Set<PersonalTrainer> personalTrainer;
}
