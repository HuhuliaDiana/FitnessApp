package com.fitnessapp.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "membership_club")
public class MembershipClub extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "membership_id")
    private Membership membership;

    @ManyToOne
    @JoinTable(name = "membership_clubs",
            joinColumns = @JoinColumn(name = "membership_club_id"),
            inverseJoinColumns = @JoinColumn(name = "club_id"))
    private Club club;
}
