package com.fitnessapp.service.membership;

import com.fitnessapp.dto.MembershipDto;
import com.fitnessapp.entity.Membership;
import com.fitnessapp.enums.MembershipType;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.MembershipMapper;
import com.fitnessapp.repository.MembershipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MembershipService {
    private final MembershipMapper membershipMapper;
    private final MembershipRepository membershipRepository;

    
    public void save(MembershipDto membershipDto) {
        Membership membership = membershipMapper.map(membershipDto);
        membershipRepository.save(membership);

    }

    
    public Membership findByName(MembershipType name) {
        return membershipRepository.findByName(name).orElseThrow(() -> new EntityNotFoundException("City", "name", name));
    }
}
