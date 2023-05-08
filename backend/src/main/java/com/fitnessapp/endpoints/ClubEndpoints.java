package com.fitnessapp.endpoints;

public class ClubEndpoints {
    public static final String CLUB_BASE_URL = "/club";
    public static final String CLUBS_BY_MEMBERSHIP_ID_EXCLUDE_CURRENT_MEMBERSHIP_CLUB = "/has-membership/{id}";
    public static final String CLUBS_AVAILABLE_FOR_CURRENT_USER = "/available";
    public static final String CLUBS_BY_CITY_ID = "/city/{id}";
    public static final String CLUB_BY_ID = "/{id}";
    public static final String CLUB_SUBSCRIPTIONS_PERMIT_USER_ACCESS_BY_ID = "/subscriptions/{id}";
    public static final String CLUB_SUBSCRIPTIONS_BY_ID = "/{id}/subscriptions";
    public static final String CLUB_ALL_SUBSCRIPTIONS_BY_ID = "/{id}/subscriptions/all";
}
