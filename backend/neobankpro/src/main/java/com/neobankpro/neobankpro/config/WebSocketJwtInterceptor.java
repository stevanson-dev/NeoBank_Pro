package com.neobankpro.neobankpro.config;

import com.neobankpro.neobankpro.service.JwtService;

import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.List;

@Component
@Order(99)
public class WebSocketJwtInterceptor
        implements ChannelInterceptor {

    private final JwtService jwtService;

    public WebSocketJwtInterceptor(
            JwtService jwtService
    ) {
        this.jwtService = jwtService;
    }

    @Override
    public Message<?> preSend(
            Message<?> message,
            MessageChannel channel
    ) {

        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(
                        message,
                        StompHeaderAccessor.class
                );

        if (accessor == null) {
            return message;
        }

        StompCommand command = accessor.getCommand();

        if (StompCommand.CONNECT.equals(command)) {

            String authorization =
                    accessor.getFirstNativeHeader(
                            "Authorization"
                    );

            if (authorization == null ||
                    !authorization.startsWith("Bearer ")) {

                throw new IllegalArgumentException(
                        "Missing WebSocket Authorization token."
                );
            }

            String token =
                    authorization
                            .substring(7)
                            .trim();

            if (token.isEmpty()) {

                throw new IllegalArgumentException(
                        "Empty WebSocket Authorization token."
                );
            }

            String email =
                    jwtService.extractEmail(token);

            if (email == null ||
                    !jwtService.isTokenValid(
                            token,
                            email
                    )) {

                throw new IllegalArgumentException(
                        "Invalid or expired WebSocket token."
                );
            }

            Principal authentication =
                    new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            List.of(
                                    new SimpleGrantedAuthority(
                                            "ROLE_USER"
                                    )
                            )
                    );

            accessor.setUser(authentication);
        }

        return message;
    }
}