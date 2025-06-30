package com.foodie.middleware_backend.repository;

import com.foodie.middleware_backend.model.Order;
import com.foodie.middleware_backend.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByRestaurantIdAndStatus(Long restaurantId, OrderStatus status);
    List<Order> findByDriverIdAndStatus(Long driverId, OrderStatus status);
}
