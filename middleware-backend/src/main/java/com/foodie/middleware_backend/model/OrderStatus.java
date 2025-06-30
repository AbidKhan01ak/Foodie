package com.foodie.middleware_backend.model;

public enum OrderStatus {
    PLACED,
    ACCEPTED,
    PREPARED,
    ASSIGNED_TO_DRIVER,
    PICKED_UP,
    EN_ROUTE,
    DELIVERED,
    REJECTED
}
