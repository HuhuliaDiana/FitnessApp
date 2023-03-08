package com.fitnessapp.service.membership;

import com.fitnessapp.dto.MembershipDto;
import com.fitnessapp.entity.Membership;
import com.fitnessapp.enums.EMembership;

public interface MembershipService {
    void save(MembershipDto membershipDto);
    Membership findByName(EMembership name);
}
