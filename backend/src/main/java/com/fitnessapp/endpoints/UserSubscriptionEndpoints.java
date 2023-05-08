package com.fitnessapp.endpoints;

public class UserSubscriptionEndpoints {
    public final static String USER_SUBSCRIPTION_BASE_URL = "/user-subscription";
    public static final String CLUBS_BY_MEMBERSHIP_ID_EXCLUDE_CURRENT_MEMBERSHIP_CLUB = "/has-membership/{id}";

    public final static String USER_SUBSCRIPTION_BUY_BY_ID = "/buy";
    public final static String USER_SUBSCRIPTION_FREEZE_BY_ID = "/freeze";
    public final static String USER_SUBSCRIPTION_UPGRADE_BY_ID = "/upgrade";
    public final static String USER_SUBSCRIPTION_TRANSFER_TO_CLUB_BY_ID= "/transfer/{id}";
}
