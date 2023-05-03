package com.fitnessapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "personal_training")
public class PersonalTraining {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToMany(mappedBy = "personalTrainings")
    private Set<PersonalTrainer> personalTrainer;
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "personal_training_type_id")
    private PersonalTrainingType personalTrainingType;
    private Integer sessionsNumber;
    private Double price;

}
