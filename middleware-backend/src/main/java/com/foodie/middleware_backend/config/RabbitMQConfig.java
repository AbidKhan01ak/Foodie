package com.foodie.middleware_backend.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class RabbitMQConfig {

    public static final String ORDER_QUEUE = "order.queue";
    public static final String RESTAURANT_QUEUE = "restaurant.queue";
    public static final String DRIVER_QUEUE = "driver.queue";
    public static final String STATUS_QUEUE = "status.queue";

    @Bean
    public Queue orderQueue(){
        return new Queue(ORDER_QUEUE);
    }

    @Bean
    public Queue restaurantQueue() {
        return new Queue(RESTAURANT_QUEUE);
    }

    @Bean
    public Queue driverQueue() {
        return new Queue(DRIVER_QUEUE);
    }

    @Bean
    public Queue statusQueue() {
        return new Queue(STATUS_QUEUE);
    }
}
