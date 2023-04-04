package com.fitnessapp.enums;

import lombok.Getter;

import javax.validation.ValidationException;
import java.util.ArrayList;
import java.util.List;

@Getter
public enum MembershipType {
    BRONZE(1), SILVER(2), GOLD(3), PLATINUM(4), W(5);
    private final Integer order;

    MembershipType(Integer order) {
        this.order = order;
    }

    public static MembershipType getByOrder(Integer order) {
        for (MembershipType type : MembershipType.values()) {
            if (type.getOrder().equals(order)) return type;
        }
        throw new ValidationException("Provided order doesn't exist!");

    }

    public List<MembershipType> getAllSmallerThan() {
        List<MembershipType> list = new ArrayList<>();
        for (Integer i = 1; i <= this.order; i++) list.add(getByOrder(i));
        return list;
    }
}
