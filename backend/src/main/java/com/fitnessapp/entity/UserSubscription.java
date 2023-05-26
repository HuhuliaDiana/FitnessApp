package com.fitnessapp.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Setter
@Getter
@Entity
@Table(name = "user_subscription")
public class UserSubscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private Subscription subscription;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate startFreeze;
    private LocalDate endFreeze;

    @ManyToOne(fetch = FetchType.LAZY)
    private Club club;
    private Integer noDaysLeftToFreeze = 0;


}
