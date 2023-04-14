package com.fitnessapp.entity;

import com.fitnessapp.enums.TrainingType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "personal_training_type", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class PersonalTrainingType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 15)
    private TrainingType name;

}
