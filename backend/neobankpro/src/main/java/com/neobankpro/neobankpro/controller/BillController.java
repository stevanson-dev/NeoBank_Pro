package com.neobankpro.neobankpro.controller;

import com.neobankpro.neobankpro.dto.BillRequest;
import com.neobankpro.neobankpro.entity.Transaction;
import com.neobankpro.neobankpro.service.BillService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/bills")
@CrossOrigin(origins = "http://localhost:5173")
public class BillController {

    private final BillService billService;

    public BillController(
            BillService billService) {

        this.billService = billService;
    }


    @PostMapping
    public ResponseEntity<?> payBill(
            @RequestBody BillRequest request,
            Authentication authentication) {

        try {

            String email =
                    authentication.getName();


            Transaction transaction =
                    billService.payBill(
                            email,
                            request
                    );


            Map<String, Object> response =
                    new HashMap<>();


            // ========================================
            // COMMON RESPONSE
            // ========================================

            response.put(
                    "message",
                    "Bill payment successful"
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


            // ========================================
            // BILL DETAILS
            // ========================================

            response.put(
                    "category",
                    transaction.getBillCategory()
            );

            response.put(
                    "provider",
                    transaction.getBillProvider()
            );

            response.put(
                    "accountNumber",
                    maskAccountNumber(
                            transaction.getBillAccountNumber()
                    )
            );


            return ResponseEntity.ok(response);


        } catch (RuntimeException e) {

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


    // ========================================
    // MASK ACCOUNT NUMBER
    // ========================================

    private String maskAccountNumber(
            String accountNumber) {

        if (accountNumber == null ||
                accountNumber.isBlank()) {

            return null;
        }


        if (accountNumber.length() <= 4) {

            return accountNumber;
        }


        String lastFour =
                accountNumber.substring(
                        accountNumber.length() - 4
                );


        return "****" + lastFour;
    }
}