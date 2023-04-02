package com.fitnessapp.entity;

import com.fitnessapp.enums.EPersonalTrainingType;

import javax.persistence.*;

public class PersonalTrainingType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EPersonalTrainingType trainingType;
    private Long sessionsNumber;
    private Double price;

}
