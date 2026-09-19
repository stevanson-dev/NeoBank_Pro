package com.neobankpro.neobankpro.repository;

import com.neobankpro.neobankpro.entity.Notification;
import com.neobankpro.neobankpro.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    // ==========================================
    // GET USER NOTIFICATIONS
    // ==========================================

    List<Notification> findByUserOrderByCreatedAtDesc(
            User user
    );

    // ==========================================
    // FIND USER'S OWN NOTIFICATION
    // ==========================================

    Optional<Notification> findByIdAndUser(
            Long id,
            User user
    );

    // ==========================================
    // COUNT UNREAD
    // ==========================================

    long countByUserAndReadFalse(
            User user
    );
}