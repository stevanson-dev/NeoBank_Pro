package com.neobankpro.neobankpro.controller;

import com.neobankpro.neobankpro.dto.QRPaymentRequest;
import com.neobankpro.neobankpro.entity.Transaction;
import com.neobankpro.neobankpro.service.QRPaymentService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/qr-payments")
@CrossOrigin(origins = "http://localhost:5173")
public class QRPaymentController {

    private final QRPaymentService qrPaymentService;

    public QRPaymentController(
            QRPaymentService qrPaymentService) {

        this.qrPaymentService = qrPaymentService;
    }


    // ========================================
    // QR PAYMENT
    // ========================================

    @PostMapping
    public ResponseEntity<?> makePayment(
            @RequestBody QRPaymentRequest request,
            Authentication authentication) {

        try {

            String email =
                    authentication.getName();

            Transaction transaction =
                    qrPaymentService.pay(
                            email,
                            request
                    );


            // ========================================
            // RESPONSE
            // ========================================

            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "QR payment successful"
            );

            response.put(
                    "transactionId",
                    transaction.getId()
            );

            response.put(
                    "amount",
                    transaction.getAmount()
            );

            response.put(
                    "type",
                    transaction.getType()
            );

            response.put(
                    "method",
                    transaction.getMethod()
            );

            response.put(
                    "status",
                    transaction.getStatus()
            );

            response.put(
                    "createdAt",
                    transaction.getCreatedAt()
            );


            return ResponseEntity.ok(response);

        } catch (Exception e) {

            Map<String, String> error =
                    new HashMap<>();

            error.put(
                    "message",
                    e.getMessage()
            );

            return ResponseEntity
                    .badRequest()
                    .body(error);
        }
    }
}