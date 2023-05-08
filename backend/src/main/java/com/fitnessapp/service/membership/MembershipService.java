package com.fitnessapp.service.membership;

import com.fitnessapp.dto.ClubDto;
import com.fitnessapp.dto.MembershipDto;
import com.fitnessapp.entity.*;
import com.fitnessapp.enums.MembershipType;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.ClubMapper;
import com.fitnessapp.mapper.MembershipMapper;
import com.fitnessapp.repository.MembershipRepository;
import com.fitnessapp.service.subscription.SubscriptionService;
import com.fitnessapp.service.user.UserService;
import com.google.common.collect.Lists;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MembershipService {
    private final MembershipMapper membershipMapper;
    private final MembershipRepository membershipRepository;
    private final ClubMapper clubMapper;

    public void save(MembershipDto membershipDto) {
        Membership membership = membershipMapper.map(membershipDto);
        membershipRepository.save(membership);

    }

    public Membership findByName(MembershipType name) {
        return membershipRepository.findByName(name).orElseThrow(() -> new EntityNotFoundException("City", "name", name));
    }

    public List<Long> getMembershipTypeIds(List<MembershipType> membershipTypes) {
        List<Membership> memberships = Lists.newArrayList(membershipRepository.findAllByNameIn(membershipTypes));
        return memberships.stream().map(Membership::getId).toList();
    }

    public List<MembershipRecord> getAllMemberships() {
        List<MembershipRecord> list = new ArrayList<>();
        membershipRepository.findAll().forEach(membership -> {
            Set<ClubDto> clubs = membership.getClubs().stream().map(clubMapper::map).collect(Collectors.toSet());
            MembershipRecord membershipRecord = new MembershipRecord(membership.getId(), membership.getName().name(), clubs);
            list.add(membershipRecord);

        });
        return list;
    }


}
