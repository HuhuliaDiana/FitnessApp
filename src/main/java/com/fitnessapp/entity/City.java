package com.fitnessapp.entity;

import com.fitnessapp.enums.ECity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "city", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class City extends BaseEntity {
    @Enumerated(EnumType.STRING)
    @Column(length = 15)
    private ECity name;

}
