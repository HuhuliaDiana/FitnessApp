package com.fitnessapp.entity;

import com.fitnessapp.enums.SubscriptionPeriodType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "subscription_period", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class SubscriptionPeriod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    @Column(length = 100)
    private SubscriptionPeriodType name;
}
