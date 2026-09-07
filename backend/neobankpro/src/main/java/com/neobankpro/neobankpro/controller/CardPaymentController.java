package com.neobankpro.neobankpro.controller;

import com.neobankpro.neobankpro.dto.CardPaymentRequest;
import com.neobankpro.neobankpro.dto.CardPaymentResponse;
import com.neobankpro.neobankpro.service.CardPaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/card-payments")
public class CardPaymentController {

    private final CardPaymentService cardPaymentService;

    public CardPaymentController(
            CardPaymentService cardPaymentService
    ) {
        this.cardPaymentService = cardPaymentService;
    }

    // =========================================================
    // PAY WITH CARD
    // =========================================================

    @PostMapping
    public ResponseEntity<CardPaymentResponse> pay(
            @RequestBody CardPaymentRequest request
    ) {

        CardPaymentResponse response =
                cardPaymentService.pay(request);

        return ResponseEntity.ok(response);
    }
}