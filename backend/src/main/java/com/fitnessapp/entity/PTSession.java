package com.fitnessapp.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Setter
@Getter
@Entity
@Table(name = "personal_training_session")
public class PTSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private UserPersonalTraining userPersonalTraining;
    private LocalDate sessionDate;
    private String startSessionTime;
    private String endSessionTime;


}
