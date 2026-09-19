package com.neobankpro.neobankpro.dto;

import com.neobankpro.neobankpro.entity.Notification;
import com.neobankpro.neobankpro.entity.NotificationType;

import java.time.LocalDateTime;

public class NotificationResponse {

    private Long id;

    private NotificationType type;

    private String title;

    private String message;

    private String transactionId;

    private boolean read;

    private LocalDateTime createdAt;

    public NotificationResponse() {
    }

    public NotificationResponse(
            Long id,
            NotificationType type,
            String title,
            String message,
            String transactionId,
            boolean read,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.message = message;
        this.transactionId = transactionId;
        this.read = read;
        this.createdAt = createdAt;
    }

    // ==========================================
    // ENTITY -> RESPONSE
    // ==========================================

    public static NotificationResponse fromEntity(
            Notification notification
    ) {

        return new NotificationResponse(
                notification.getId(),
                notification.getType(),
                notification.getTitle(),
                notification.getMessage(),
                notification.getTransactionId(),
                notification.isRead(),
                notification.getCreatedAt()
        );
    }

    // ==========================================
    // GETTERS
    // ==========================================

    public Long getId() {
        return id;
    }

    public NotificationType getType() {
        return type;
    }

    public String getTitle() {
        return title;
    }

    public String getMessage() {
        return message;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public boolean isRead() {
        return read;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // ==========================================
    // SETTERS
    // ==========================================

    public void setId(Long id) {
        this.id = id;
    }

    public void setType(NotificationType type) {
        this.type = type;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}