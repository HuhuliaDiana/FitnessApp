package com.fitnessapp.service.membership;

import com.fitnessapp.dto.MembershipDto;
import com.fitnessapp.entity.Membership;
import com.fitnessapp.enums.EMembership;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.MembershipMapper;
import com.fitnessapp.repository.MembershipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MembershipServiceImpl implements MembershipService {
    private final MembershipMapper membershipMapper;
    private final MembershipRepository membershipRepository;

    @Override
    public void save(MembershipDto membershipDto) {
        Membership membership = membershipMapper.map(membershipDto);
        membershipMapper.map(membershipRepository.save(membership));

    }

    @Override
    public Membership findByName(EMembership name) {
        return membershipRepository.findByName(name).orElseThrow(() -> new EntityNotFoundException("City", "name", name));
    }
}
