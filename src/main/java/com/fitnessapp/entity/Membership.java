package com.fitnessapp.entity;

import com.fitnessapp.enums.EMembership;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "membership", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class Membership extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private EMembership name;


}
