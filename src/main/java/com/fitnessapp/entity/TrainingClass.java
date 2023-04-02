package com.fitnessapp.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "training_class")
public class TrainingClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime classDate;
    private String trainerName;
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "club_id")
    private Club club;
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "training_class_hour_id")
    private TrainingClassHour trainingClassHour;
    private Integer spotsAvailable;

}
