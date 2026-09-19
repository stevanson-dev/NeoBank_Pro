package com.neobankpro.neobankpro.service;

import com.neobankpro.neobankpro.event.NotificationEvent;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
public class NotificationWebSocketListener {

    private final SimpMessagingTemplate messagingTemplate;

    public NotificationWebSocketListener(
            SimpMessagingTemplate messagingTemplate
    ) {
        this.messagingTemplate = messagingTemplate;
    }

    @TransactionalEventListener(
            phase = TransactionPhase.AFTER_COMMIT
    )
    public void handleNotification(
            NotificationEvent event
    ) {
        messagingTemplate.convertAndSendToUser(
                event.getEmail(),
                "/queue/notifications",
                event.getNotification()
        );
    }
}