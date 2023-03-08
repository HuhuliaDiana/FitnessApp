package com.fitnessapp.entity;

import com.fitnessapp.enums.ERole;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "role", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class Role extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(length = 15)
    private ERole name;
}
