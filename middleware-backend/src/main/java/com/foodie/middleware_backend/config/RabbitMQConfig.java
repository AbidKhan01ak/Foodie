package com.foodie.middleware_backend.config;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String ORDER_QUEUE = "order.queue";
    public static final String RESTAURANT_QUEUE = "restaurant.queue";
    public static final String DRIVER_QUEUE = "driver.queue";
    public static final String STATUS_QUEUE = "status.queue";

    @Bean
    public Queue orderQueue() {
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

    // ✅ JSON message converter for POJO serialization
    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    // ✅ Inject converter into RabbitTemplate
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(messageConverter());
        return rabbitTemplate;
    }
}
