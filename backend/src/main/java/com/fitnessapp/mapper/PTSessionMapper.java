package com.fitnessapp.mapper;

import com.fitnessapp.dto.PTSessionDto;
import com.fitnessapp.entity.PTSession;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PTSessionMapper {
    PTSession map(PTSessionDto ptSessionDto);

    PTSessionDto map(PTSession ptSessionDto);
}
