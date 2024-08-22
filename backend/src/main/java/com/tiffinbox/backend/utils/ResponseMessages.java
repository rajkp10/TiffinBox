package com.tiffinbox.backend.utils;

public class ResponseMessages {
    public static final String USER_ALREADY_PRESENT = "User already registered.";
    public static final String SELLER_ALREADY_PRESENT = "Seller already registered.";
    public static final String REGISTRATION_SUCCESS = "User registration successful!";
    public static final String SELLER_REGISTRATION_SUCCESS = "User registration successful as a Seller!";
    public static final String USER_NOT_FOUND = "User not found for the provided email!";
    public static final String PSWD_NULL = "Password can't be Null!";
    public static final String PSWD_MISS_MATCH = "Password miss-match for the registered user!";
    public static final String ACCOUNT_NOT_VERIFIED = "Account is Not Verified from the Admin side, Please Contact Admin for Verification.";
    public static final String USER_NOT_FOUND_TOKEN = "User not Found for the corresponding token!";
    public static final String TOKEN_Expired = "Session timed out Please Login Again.";
    public static final String ORDER_NOT_FOUND = "No such order exists!";
    public static final String ALREADY_SUBSCRIBED = "User already subscribed to another subscription!";
    public static final String MEAL_NOT_FOUND = "No such meal exists!";
    public static final String INVALID_SUBSCRIPTION = "Invalid subscription type.";
    public static final String ORDER_DETAILS_FETCH = "Order details fetched!";
    public static final String TEMP_PSWD = "Forget Password Request";
    public static final String TEMP_PSWD_BODY = "Your Temporary Password is given below and it's meant to change."+System.lineSeparator()+"This Password will Expire after 10 Minutes."+System.lineSeparator()+"The password will then be reset to your old password.";
    // Admin Service Response
    public static final String FOOD_SERVICE_PROVIDER_NOT_FOUND = "Food service provider does not exist";
    public static final String USER_PENDING_REQUEST_RETRIVED = "User pending requests retrieved.";
    public static final String USER_SINGLE_PENDING_REQUEST_RETRIEVED = "Food service provider retrieved.";
    public static final String APPROVE_PENDING_REQUEST = "Pending request approved.";
    public static final String REJECT_PENDING_REQUEST = "Pending request rejected.";
    public static final String REMOVE_USER_SUCCESSFUL = "User removed successfully.";

    //Meal Menu Management
    public static final String MEAL_ADD_SUCCESSFUL = "Meal added Successfully";
    public static final String MEALS_RETRIEVED_SUCCESSFUL = "Meals retrieved Successfully";
    public static final String MEAL_UPDATE_SUCCESSFUL = "Meal updated Successfullly";
    public static final String MEAL_RETRIEVED_SUCCESSFUL = "Meal retrieved Successfully";
    public static final String MEAL_DELETE_SUCCESSFUL = "Meal deleted Successfully";
    public static final String PROVIDERS_LIST_SUCCESSFUL = "Food Service Providers retrieved Successfully.";
    public static final String PROVIDER_RETRIEVED_SUCCESSFUL = "Food Service Provider retrieved Successfully.";
    public static final String GET_ANALYSIS = "Analysis retrieved successfully.";

    // Order Track Service Response
    public static final String GET_ALL_ACCEPTED_ORDERS = "Accepted orders retrieved.";
    public static final String ORDER_ACCEPTED = "Order accepted successfully.";
    public static final String UPDATE_ORDER_STATUS = "Order status updated successfully.";
    public static final String UPDATE_ORDER_STATUS_ERROR = "Error updating order status.";
    public static final String OTP_SENT_VIA_EMAIL_SUCCESS = "OTP is sent successfully.";
    public static final String OTP_VERIFIED = "OTP verified successfully.";
    public static final String OTP_VERIFIED_FAILED = "OTP does not match.";
    public static final String ORDER_STATUS_RETRIEVED = "Order status retrieved successfully.";
    public static final String SUBSCRIPTIONS_RETRIEVED = "Subscriptions retrieved successfully.";
    public static final String DASHBOARD_ANALYTICS_FETCHED = "Dashboard Analytics fetched.";
}
