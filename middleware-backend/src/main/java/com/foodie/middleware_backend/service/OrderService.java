package com.foodie.middleware_backend.service;

import com.foodie.middleware_backend.model.Order;
import com.foodie.middleware_backend.model.OrderStatus;
import com.foodie.middleware_backend.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import static com.foodie.middleware_backend.config.RabbitMQConfig.*;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final RabbitTemplate rabbitTemplate;

    public OrderService(OrderRepository orderRepository, RabbitTemplate rabbitTemplate) {
        this.orderRepository = orderRepository;
        this.rabbitTemplate = rabbitTemplate;
    }

    public Order createOrder(Order order) {
        order.setStatus(OrderStatus.PLACED);
        Order savedOrder = orderRepository.save(order);
        rabbitTemplate.convertAndSend(RESTAURANT_QUEUE, savedOrder);
        return savedOrder;
    }

    public void updateOrderStatus(Long id, OrderStatus status) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setStatus(status);
        orderRepository.save(order);
        rabbitTemplate.convertAndSend(STATUS_QUEUE, order);
    }

    public Order getOrder(Long id) {
        return orderRepository.findById(id).orElse(null);
    }
}
