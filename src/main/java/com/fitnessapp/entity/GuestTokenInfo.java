package com.fitnessapp.entity;

import lombok.*;

import javax.persistence.Table;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class GuestTokenInfo {
    private String email;
    private Long userId;
}
