package com.foodie.middleware_backend.controller;

import com.foodie.middleware_backend.model.Order;
import com.foodie.middleware_backend.model.OrderStatus;
import com.foodie.middleware_backend.repository.OrderRepository;
import com.foodie.middleware_backend.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/driver")
public class DriverController {

    private final OrderRepository orderRepository;
    private final OrderService orderService;

    public DriverController(OrderRepository orderRepository, OrderService orderService) {
        this.orderRepository = orderRepository;
        this.orderService = orderService;
    }

    @GetMapping("/orders")
    public List<Order> getAssignedOrders(@RequestParam Long driverId) {
        return orderRepository.findByDriverIdAndStatus(driverId, OrderStatus.ASSIGNED_TO_DRIVER);
    }

    @PostMapping("/order/{id}/status")
    public void updateDeliveryStatus(@PathVariable Long id, @RequestParam OrderStatus status) {
        orderService.updateOrderStatus(id, status);
    }
}
