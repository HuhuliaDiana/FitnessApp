package com.fitnessapp.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "subscription")
@Getter
@Setter
@NoArgsConstructor
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double price;
    @ManyToOne(fetch = FetchType.LAZY)
    private SubscriptionPeriod subscriptionPeriod;
    @ManyToOne(fetch = FetchType.LAZY)
    private Membership membership;

}
