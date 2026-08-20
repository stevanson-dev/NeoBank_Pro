package com.neobankpro.neobankpro.controller;

import com.neobankpro.neobankpro.dto.TransferRequest;
import com.neobankpro.neobankpro.entity.Transaction;
import com.neobankpro.neobankpro.service.TransferService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/transfers")
@CrossOrigin(origins = "http://localhost:5173")
public class TransferController {

    private final TransferService transferService;

    public TransferController(
            TransferService transferService) {

        this.transferService = transferService;
    }

    @PostMapping
    public ResponseEntity<?> transfer(
            Authentication authentication,
            @Valid @RequestBody TransferRequest request) {

        try {

            String email = authentication.getName();

            Transaction transaction =
                    transferService.transfer(email, request);

            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "message", "Transfer successful",
                            "transactionId", transaction.getId(),
                            "amount", transaction.getAmount(),
                            "type", transaction.getType(),
                            "method", transaction.getMethod(),
                            "status", transaction.getStatus(),
                            "createdAt", transaction.getCreatedAt()
                    )
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest()
                    .body(
                            Map.of(
                                    "success", false,
                                    "message", e.getMessage()
                            )
                    );

        } catch (IllegalStateException e) {

            return ResponseEntity.badRequest()
                    .body(
                            Map.of(
                                    "success", false,
                                    "message", e.getMessage()
                            )
                    );
        }
    }
}