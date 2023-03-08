package com.fitnessapp.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "city_club")
public class CityClub extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    @ManyToOne
    @JoinTable(name = "city_clubs",
            joinColumns = @JoinColumn(name = "city_club_id"),
            inverseJoinColumns = @JoinColumn(name = "club_id"))
    private Club club;
}
