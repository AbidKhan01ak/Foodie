package com.foodie.middleware_backend.service;

import com.foodie.middleware_backend.model.Order;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @RabbitListener(queues = "status.queue")
    public void notifyFrontend(Order order) {
        System.out.println("Notify frontend: Order " + order.getId() + " updated to " + order.getStatus());
        // TODO: Push to WebSocket, or log for now
    }
}
