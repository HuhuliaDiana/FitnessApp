package com.fitnessapp.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Getter
@Setter
@Accessors(fluent = true, chain = true)
public class RefreshToken {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String token;
    @OneToOne(fetch=FetchType.LAZY)
    private User user;
    private Instant expiration;
}
