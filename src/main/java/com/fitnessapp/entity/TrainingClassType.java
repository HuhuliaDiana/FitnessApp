package com.fitnessapp.entity;

import com.fitnessapp.enums.ClassType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table(name = "training_class_type", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class TrainingClassType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ClassType name;

}
