package com.neobankpro.neobankpro.event;

import com.neobankpro.neobankpro.dto.NotificationResponse;

public class NotificationEvent {

    private final String email;
    private final NotificationResponse notification;

    public NotificationEvent(
            String email,
            NotificationResponse notification
    ) {
        this.email = email;
        this.notification = notification;
    }

    public String getEmail() {
        return email;
    }

    public NotificationResponse getNotification() {
        return notification;
    }
}