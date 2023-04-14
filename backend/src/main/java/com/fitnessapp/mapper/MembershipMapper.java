package com.fitnessapp.mapper;

import com.fitnessapp.dto.MembershipDto;
import com.fitnessapp.entity.Membership;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MembershipMapper {

    MembershipDto map(Membership membership);
    Membership map(MembershipDto membership);
}
