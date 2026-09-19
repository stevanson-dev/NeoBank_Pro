package com.neobankpro.neobankpro.service;

import com.neobankpro.neobankpro.dto.NotificationResponse;
import com.neobankpro.neobankpro.entity.Notification;
import com.neobankpro.neobankpro.entity.NotificationType;
import com.neobankpro.neobankpro.entity.Transaction;
import com.neobankpro.neobankpro.entity.User;
import com.neobankpro.neobankpro.event.NotificationEvent;
import com.neobankpro.neobankpro.repository.NotificationRepository;
import com.neobankpro.neobankpro.repository.UserRepository;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final ApplicationEventPublisher eventPublisher;

    public NotificationService(
            NotificationRepository notificationRepository,
            UserRepository userRepository,
            ApplicationEventPublisher eventPublisher
    ) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.eventPublisher = eventPublisher;
    }

    // ==========================================
    // GET USER NOTIFICATIONS
    // ==========================================

    @Transactional(readOnly = true)
    public List<NotificationResponse> getNotifications(
            String email
    ) {

        User user = getUser(email);

        return notificationRepository
                .findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(NotificationResponse::fromEntity)
                .toList();
    }

    // ==========================================
    // CREATE NOTIFICATION
    // ==========================================

    @Transactional
    public Notification createNotification(
            User user,
            NotificationType type,
            String title,
            String message,
            String transactionId
    ) {

        Notification notification = new Notification();

        notification.setUser(user);
        notification.setType(type);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setTransactionId(transactionId);
        notification.setRead(false);

        Notification savedNotification =
                notificationRepository.save(notification);

        /*
         * Convert entity to DTO before publishing.
         *
         * We do not send the JPA entity directly through
         * WebSocket.
         */
        NotificationResponse response =
                NotificationResponse.fromEntity(
                        savedNotification
                );

        /*
         * The event is handled AFTER the surrounding
         * database transaction successfully commits.
         */
        eventPublisher.publishEvent(
                new NotificationEvent(
                        user.getEmail(),
                        response
                )
        );

        return savedNotification;
    }

    // ==========================================
    // CREATE TRANSACTION NOTIFICATION
    // ==========================================

    @Transactional
    public Notification createTransactionNotification(
            User user,
            String title,
            String message,
            Transaction transaction
    ) {

        String transactionId = null;

        if (transaction != null) {
            transactionId =
                    transaction.getTransactionId();
        }

        return createNotification(
                user,
                NotificationType.TRANSACTION,
                title,
                message,
                transactionId
        );
    }

    // ==========================================
    // MARK ONE AS READ
    // ==========================================

    @Transactional
    public NotificationResponse markAsRead(
            String email,
            Long notificationId
    ) {

        User user = getUser(email);

        Notification notification =
                notificationRepository
                        .findByIdAndUser(
                                notificationId,
                                user
                        )
                        .orElseThrow(
                                () -> new IllegalArgumentException(
                                        "Notification not found."
                                )
                        );

        if (!notification.isRead()) {

            notification.setRead(true);

            notificationRepository.save(notification);
        }

        return NotificationResponse.fromEntity(
                notification
        );
    }

    // ==========================================
    // MARK ALL AS READ
    // ==========================================

    @Transactional
    public void markAllAsRead(
            String email
    ) {

        User user = getUser(email);

        List<Notification> notifications =
                notificationRepository
                        .findByUserOrderByCreatedAtDesc(user);

        boolean changed = false;

        for (Notification notification : notifications) {

            if (!notification.isRead()) {

                notification.setRead(true);

                changed = true;
            }
        }

        if (changed) {

            notificationRepository.saveAll(
                    notifications
            );
        }
    }

    // ==========================================
    // DELETE NOTIFICATION
    // ==========================================

    @Transactional
    public void deleteNotification(
            String email,
            Long notificationId
    ) {

        User user = getUser(email);

        Notification notification =
                notificationRepository
                        .findByIdAndUser(
                                notificationId,
                                user
                        )
                        .orElseThrow(
                                () -> new IllegalArgumentException(
                                        "Notification not found."
                                )
                        );

        notificationRepository.delete(notification);
    }

    // ==========================================
    // UNREAD COUNT
    // ==========================================

    @Transactional(readOnly = true)
    public long getUnreadCount(
            String email
    ) {

        User user = getUser(email);

        return notificationRepository
                .countByUserAndReadFalse(user);
    }

    // ==========================================
    // FIND USER
    // ==========================================

    private User getUser(
            String email
    ) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(
                        () -> new IllegalArgumentException(
                                "User not found."
                        )
                );
    }
}