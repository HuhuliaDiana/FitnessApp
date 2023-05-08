package com.fitnessapp.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Setter
@Getter
@Entity
@Table(name = "user_personal_training")
public class UserPersonalTraining {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "personal_training_id")
    private PersonalTraining personalTraining;
    private LocalDate startDate;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "personal_trainer_id")
    private PersonalTrainer personalTrainer;
    private Integer noSessionsLeft;


}
