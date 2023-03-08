package com.fitnessapp.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "subscription")
@NoArgsConstructor
public class Subscription extends BaseEntity {
    private Double price;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "subscription_period_id")
    private SubscriptionPeriod subscriptionPeriod;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "membership_id")
    private Membership membership;

}
