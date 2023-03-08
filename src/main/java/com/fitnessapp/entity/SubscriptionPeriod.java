package com.fitnessapp.entity;

import com.fitnessapp.enums.ESubscriptionPeriod;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "subscription_period", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class SubscriptionPeriod extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private ESubscriptionPeriod name;
}
