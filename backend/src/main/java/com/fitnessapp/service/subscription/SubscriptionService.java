package com.fitnessapp.service.subscription;

import com.fitnessapp.dto.SubscriptionDto;
import com.fitnessapp.entity.Subscription;
import com.fitnessapp.enums.MembershipType;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.SubscriptionMapper;
import com.fitnessapp.repository.SubscriptionRepository;
import com.fitnessapp.service.membership.MembershipService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionService {
    private final SubscriptionMapper subscriptionMapper;
    private final SubscriptionRepository subscriptionRepository;
    private final MembershipService membershipService;

    public void save(SubscriptionDto dto) {
        subscriptionRepository.save(subscriptionMapper.map(dto));
    }

    public Subscription getBySubscriptionPeriodAndMembership(Long subPeriodId, Long membershipId) {
        return subscriptionRepository.findBySubscriptionPeriodIdAndMembershipId(subPeriodId, membershipId).orElseThrow(() ->
                new EntityNotFoundException("Subscription was not found with sub period id: %s and membership id: %s".formatted(subPeriodId, membershipId)));
    }

    public Subscription getById(Long id) {
        return subscriptionRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Subscription", "id", id));
    }
    public SubscriptionDto findById(Long id) {
        return map(getById(id));
    }

    public SubscriptionDto map(Subscription subscription) {
        return subscriptionMapper.map(subscription);
    }

    public List<SubscriptionDto> findAllByMembershipIdIn(List<Long> ids) {
        var subscriptions = (List<Subscription>) subscriptionRepository.findAllByMembershipIdIn(ids);
        return subscriptions.stream().map(subscriptionMapper::map).toList();
    }

    public List<SubscriptionDto> findAllByMembershipIdInAndSubscriptionPeriodId(List<Long> ids, Long id) {
        var subscriptions = (List<Subscription>) subscriptionRepository.findAllByMembershipIdInAndSubscriptionPeriodId(ids, id);
        return subscriptions.stream().map(subscriptionMapper::map).toList();
    }

    public List<SubscriptionDto> findByMembershipId(Long id) {
        return subscriptionRepository.findByMembershipId(id).stream().map(subscriptionMapper::map).toList();
    }




}
