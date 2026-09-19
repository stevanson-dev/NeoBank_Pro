package com.neobankpro.neobankpro.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(
    name = "notifications",
    indexes = {
        @Index(name = "idx_notification_user", columnList = "user_id"),
        @Index(name = "idx_notification_created_at", columnList = "created_at")
    }
)
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // NOTIFICATION TYPE
    // ==========================================

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 30)
    private NotificationType type;

    // ==========================================
    // TITLE
    // ==========================================

    @Column(name = "title", nullable = false, length = 150)
    private String title;

    // ==========================================
    // MESSAGE
    // ==========================================

    @Column(name = "message", nullable = false, length = 500)
    private String message;

    // ==========================================
    // TRANSACTION ID
    // ==========================================

    /*
     * Example:
     * TRF-A8K92PQ
     * DEP-7X2LMQ4
     * WDL-P9K4T2A
     * BIL-X72M8QK
     * QR-A92KLP7
     * CRD-8Q2MXP1
     *
     * This is optional because security/system
     * notifications may not have a transaction.
     */
    @Column(name = "transaction_id", length = 50)
    private String transactionId;

    // ==========================================
    // READ STATUS
    // ==========================================

    @Column(name = "is_read", nullable = false)
    private boolean read = false;

    // ==========================================
    // CREATED DATE
    // ==========================================

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // ==========================================
    // USER
    // ==========================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public Notification() {
    }

    // ==========================================
    // ID
    // ==========================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // ==========================================
    // TYPE
    // ==========================================

    public NotificationType getType() {
        return type;
    }

    public void setType(NotificationType type) {
        this.type = type;
    }

    // ==========================================
    // TITLE
    // ==========================================

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    // ==========================================
    // MESSAGE
    // ==========================================

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    // ==========================================
    // TRANSACTION ID
    // ==========================================

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    // ==========================================
    // READ
    // ==========================================

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    // ==========================================
    // CREATED AT
    // ==========================================

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // ==========================================
    // USER
    // ==========================================

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // ==========================================
    // AUTO CREATED DATE
    // ==========================================

    @PrePersist
    protected void onCreate() {

        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}