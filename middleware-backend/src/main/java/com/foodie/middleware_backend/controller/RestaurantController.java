package com.foodie.middleware_backend.controller;


import com.foodie.middleware_backend.model.Order;
import com.foodie.middleware_backend.model.OrderStatus;
import com.foodie.middleware_backend.repository.OrderRepository;
import com.foodie.middleware_backend.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurant")
public class RestaurantController {

    private final OrderRepository orderRepository;
    private final OrderService orderService;

    public RestaurantController(OrderRepository orderRepository, OrderService orderService) {
        this.orderRepository = orderRepository;
        this.orderService = orderService;
    }

    @GetMapping("/orders")
    public List<Order> getPendingOrders(@RequestParam Long restaurantId) {
        return orderRepository.findByRestaurantIdAndStatus(restaurantId, OrderStatus.PLACED);
    }

    @PostMapping("/order/{id}/status")
    public void updateOrder(@PathVariable Long id, @RequestParam OrderStatus status) {
        orderService.updateOrderStatus(id, status);
    }
}
