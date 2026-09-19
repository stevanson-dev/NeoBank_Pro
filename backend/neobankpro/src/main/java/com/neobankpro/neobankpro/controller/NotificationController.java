package com.neobankpro.neobankpro.controller;

import com.neobankpro.neobankpro.dto.NotificationResponse;
import com.neobankpro.neobankpro.service.NotificationService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(
            NotificationService notificationService
    ) {
        this.notificationService = notificationService;
    }

    // ==========================================
    // GET ALL NOTIFICATIONS
    // ==========================================

    @GetMapping
    public ResponseEntity<List<NotificationResponse>> getNotifications(
            Authentication authentication
    ) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                notificationService.getNotifications(email)
        );
    }

    // ==========================================
    // GET UNREAD COUNT
    // ==========================================

    @GetMapping("/unread-count")
    public ResponseEntity<Map<String, Object>> getUnreadCount(
            Authentication authentication
    ) {

        String email = authentication.getName();

        long unreadCount =
                notificationService.getUnreadCount(email);

        Map<String, Object> response =
                new HashMap<>();

        response.put("success", true);
        response.put("unreadCount", unreadCount);

        return ResponseEntity.ok(response);
    }

    // ==========================================
    // MARK ONE AS READ
    // ==========================================

    @PatchMapping("/{id}/read")
    public ResponseEntity<NotificationResponse> markAsRead(
            @PathVariable Long id,
            Authentication authentication
    ) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                notificationService.markAsRead(
                        email,
                        id
                )
        );
    }

    // ==========================================
    // MARK ALL AS READ
    // ==========================================

    @PatchMapping("/read-all")
    public ResponseEntity<Map<String, Object>> markAllAsRead(
            Authentication authentication
    ) {

        String email = authentication.getName();

        notificationService.markAllAsRead(email);

        Map<String, Object> response =
                new HashMap<>();

        response.put("success", true);
        response.put(
                "message",
                "All notifications marked as read."
        );

        return ResponseEntity.ok(response);
    }

    // ==========================================
    // DELETE
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteNotification(
            @PathVariable Long id,
            Authentication authentication
    ) {

        String email = authentication.getName();

        notificationService.deleteNotification(
                email,
                id
        );

        Map<String, Object> response =
                new HashMap<>();

        response.put("success", true);
        response.put(
                "message",
                "Notification deleted successfully."
        );

        return ResponseEntity.ok(response);
    }
}