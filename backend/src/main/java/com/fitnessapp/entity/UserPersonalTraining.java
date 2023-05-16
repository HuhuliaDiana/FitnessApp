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

    @ManyToOne(fetch = FetchType.LAZY)
    private PersonalTraining personalTraining;
    private LocalDate startDate;

    @ManyToOne(fetch = FetchType.LAZY)
    private PersonalTrainer personalTrainer;
    private Integer noSessionsLeft;


}
