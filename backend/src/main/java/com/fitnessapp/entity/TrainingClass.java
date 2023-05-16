package com.fitnessapp.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
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
    @ManyToOne(fetch = FetchType.LAZY)
    private Club club;
    @ManyToOne(fetch = FetchType.LAZY)
    private TrainingClassHour trainingClassHour;
    private Integer spotsAvailable;


}
