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
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "subscription_period_id")
    private SubscriptionPeriod subscriptionPeriod;
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "membership_id")
    private Membership membership;

}
