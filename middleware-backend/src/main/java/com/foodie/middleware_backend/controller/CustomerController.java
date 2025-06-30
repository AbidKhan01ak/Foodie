package com.foodie.middleware_backend.controller;

import com.foodie.middleware_backend.model.Order;
import com.foodie.middleware_backend.service.OrderService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class CustomerController {

    private final OrderService orderService;

    public CustomerController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    @GetMapping("/{id}")
    public Order trackOrder(@PathVariable Long id) {
        return orderService.getOrder(id);
    }
}
