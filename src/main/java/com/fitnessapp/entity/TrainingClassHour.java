package com.fitnessapp.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table(name = "training_class_hour")
public class TrainingClassHour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "training_class_type_id")
    private TrainingClassType trainingClassType;
    private String classHour;
    private Integer timerDuration;

}
