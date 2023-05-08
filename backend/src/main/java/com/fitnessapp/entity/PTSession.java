package com.fitnessapp.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Setter
@Getter
@Entity
@Table(name = "personal_training_session")
public class PTSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "personal_trainer_id")
    private PersonalTrainer personalTrainer;

    private LocalDate sessionDate;
    private String startSessionTime;
    private String endSessionTime;


}
