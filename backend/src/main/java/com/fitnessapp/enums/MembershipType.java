package com.fitnessapp.enums;

import lombok.Getter;

import javax.validation.ValidationException;
import java.util.ArrayList;
import java.util.List;

@Getter
public enum MembershipType {
    BRONZE, SILVER, GOLD, PLATINUM;

    private static MembershipType getByOrdinal(int order) {
        for (MembershipType type : MembershipType.values()) {
            if (type.ordinal() == order) return type;
        }
        throw new ValidationException("Provided order doesn't exist!");

    }

    public List<MembershipType> getAllLessThan() {
        List<MembershipType> list = new ArrayList<>();
        for (int i = 0; i <= this.ordinal(); i++) list.add(getByOrdinal(i));
        return list;
    }

    public List<MembershipType> getAllGreaterThan() {
        List<MembershipType> list = new ArrayList<>();
        for (int i = 3; i >= this.ordinal(); i--) list.add(getByOrdinal(i));
        return list;
    }
}
