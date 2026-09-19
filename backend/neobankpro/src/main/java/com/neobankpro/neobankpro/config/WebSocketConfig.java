package com.neobankpro.neobankpro.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig
        implements WebSocketMessageBrokerConfigurer {

    private final WebSocketJwtInterceptor webSocketJwtInterceptor;

    public WebSocketConfig(
            WebSocketJwtInterceptor webSocketJwtInterceptor
    ) {
        this.webSocketJwtInterceptor =
                webSocketJwtInterceptor;
    }

    // ==========================================
    // MESSAGE BROKER
    // ==========================================

    @Override
    public void configureMessageBroker(
            MessageBrokerRegistry registry
    ) {

        registry.enableSimpleBroker(
                "/topic",
                "/queue"
        );

        registry.setApplicationDestinationPrefixes(
                "/app"
        );

        registry.setUserDestinationPrefix(
                "/user"
        );
    }

    // ==========================================
    // CLIENT INBOUND CHANNEL
    // ==========================================

    @Override
    public void configureClientInboundChannel(
            ChannelRegistration registration
    ) {

        registration.interceptors(
                webSocketJwtInterceptor
        );
    }

    // ==========================================
    // WEBSOCKET ENDPOINT
    // ==========================================

    @Override
    public void registerStompEndpoints(
            StompEndpointRegistry registry
    ) {

        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns(
                        "http://localhost:5173"
                );
    }
}