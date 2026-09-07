package com.neobankpro.neobankpro.controller;

import com.neobankpro.neobankpro.dto.ChangeCardPinRequest;
import com.neobankpro.neobankpro.dto.SetCardPinRequest; 

import com.neobankpro.neobankpro.dto.CardFeatureRequest;
import com.neobankpro.neobankpro.dto.CardLimitRequest;
import com.neobankpro.neobankpro.dto.CardResponse;
import com.neobankpro.neobankpro.entity.CardVariant;
import com.neobankpro.neobankpro.service.CardService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.neobankpro.neobankpro.dto.ForgotCardPinRequest;

import java.util.Map;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    private final CardService cardService;

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    // ==========================================
    // GET ALL USER CARDS
    // ==========================================

    @GetMapping
    public ResponseEntity<List<CardResponse>> getMyCards(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                cardService.getUserCards(email)
        );
    }

    // ==========================================
    // CREATE DEBIT VIRTUAL CARD
    // ==========================================

    @PostMapping("/debit/virtual")
    public ResponseEntity<CardResponse> createDebitVirtualCard(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                cardService.createDebitCard(
                        email,
                        CardVariant.VIRTUAL
                )
        );
    }

    // ==========================================
    // CREATE DEBIT PHYSICAL CARD
    // ==========================================

    @PostMapping("/debit/physical")
    public ResponseEntity<CardResponse> createDebitPhysicalCard(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                cardService.createDebitCard(
                        email,
                        CardVariant.PHYSICAL
                )
        );
    }

    // ==========================================
    // CREATE CREDIT VIRTUAL CARD
    // ==========================================

    @PostMapping("/credit/virtual")
    public ResponseEntity<CardResponse> createCreditVirtualCard(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                cardService.createCreditCard(
                        email,
                        CardVariant.VIRTUAL
                )
        );
    }

    // ==========================================
    // CREATE CREDIT PHYSICAL CARD
    // ==========================================

    @PostMapping("/credit/physical")
    public ResponseEntity<CardResponse> createCreditPhysicalCard(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                cardService.createCreditCard(
                        email,
                        CardVariant.PHYSICAL
                )
        );
    }

    // ==========================================
    // FREEZE CARD
    // ==========================================

    @PatchMapping("/{cardId}/freeze")
    public ResponseEntity<CardResponse> freezeCard(
            @PathVariable Long cardId,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                cardService.freezeCard(
                        email,
                        cardId
                )
        );
    }

    // ==========================================
    // UNFREEZE CARD
    // ==========================================

    @PatchMapping("/{cardId}/unfreeze")
    public ResponseEntity<CardResponse> unfreezeCard(
            @PathVariable Long cardId,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                cardService.unfreezeCard(
                        email,
                        cardId
                )
        );
    }

    // ==========================================
    // DELETE CARD
    // ==========================================

  @PatchMapping("/{cardId}/block")
public ResponseEntity<?> blockCard(
        @PathVariable Long cardId,
        Authentication authentication
) {
    Map<String, String> response =
            cardService.blockCard(
                    cardId,
                    authentication.getName()
            );

    return ResponseEntity.ok(response);
}

    // ==========================================
    // UPDATE MONTHLY LIMIT
    // ==========================================

    @PatchMapping("/{cardId}/monthly-limit")
    public ResponseEntity<CardResponse> updateMonthlyLimit(
            @PathVariable Long cardId,
            @RequestBody CardLimitRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        BigDecimal monthlyLimit =
                request.getMonthlyLimit();

        return ResponseEntity.ok(
                cardService.updateMonthlyLimit(
                        email,
                        cardId,
                        monthlyLimit
                )
        );
    }

    // ==========================================
    // ONLINE PAYMENTS
    // ==========================================

    @PatchMapping("/{cardId}/online")
    public ResponseEntity<CardResponse> updateOnlinePayment(
            @PathVariable Long cardId,
            @RequestBody CardFeatureRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                cardService.updateOnlinePayment(
                        email,
                        cardId,
                        request.isEnabled()
                )
        );
    }

    // ==========================================
    // CONTACTLESS
    // ==========================================

    @PatchMapping("/{cardId}/contactless")
    public ResponseEntity<CardResponse> updateContactless(
            @PathVariable Long cardId,
            @RequestBody CardFeatureRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                cardService.updateContactless(
                        email,
                        cardId,
                        request.isEnabled()
                )
        );
    }

    // ==========================================
    // INTERNATIONAL
    // ==========================================

    @PatchMapping("/{cardId}/international")
    public ResponseEntity<CardResponse> updateInternational(
            @PathVariable Long cardId,
            @RequestBody CardFeatureRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                cardService.updateInternational(
                        email,
                        cardId,
                        request.isEnabled()
                )
        );
    }

    // ==========================================
    // ATM WITHDRAWAL
    // ==========================================

    @PatchMapping("/{cardId}/atm")
    public ResponseEntity<CardResponse> updateAtm(
            @PathVariable Long cardId,
            @RequestBody CardFeatureRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                cardService.updateAtm(
                        email,
                        cardId,
                        request.isEnabled()
                )
        );
    }

    // ==========================================
    // POS PAYMENTS
    // ==========================================

    @PatchMapping("/{cardId}/pos")
    public ResponseEntity<CardResponse> updatePos(
            @PathVariable Long cardId,
            @RequestBody CardFeatureRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                cardService.updatePos(
                        email,
                        cardId,
                        request.isEnabled()
                )
        );
    }

    // ==========================================
// SET CARD PIN
// ==========================================

@PostMapping("/{cardId}/pin")
public ResponseEntity<CardResponse> setCardPin(
        @PathVariable Long cardId,
        @RequestBody SetCardPinRequest request,
        Authentication authentication) {

    String email = authentication.getName();

    return ResponseEntity.ok(
            cardService.setCardPin(
                    email,
                    cardId,
                    request
            )
    );
}


// ==========================================
// CHANGE CARD PIN
// ==========================================

@PatchMapping("/{cardId}/pin")
public ResponseEntity<CardResponse> changeCardPin(
        @PathVariable Long cardId,
        @RequestBody ChangeCardPinRequest request,
        Authentication authentication) {

    String email = authentication.getName();

    return ResponseEntity.ok(
            cardService.changeCardPin(
                    email,
                    cardId,
                    request
            )
    );
}

      // ==========================================
// FORGOT CARD PIN
// ==========================================

@PostMapping("/{cardId}/pin/forgot")
public ResponseEntity<CardResponse> forgotCardPin(
        @PathVariable Long cardId,
        @RequestBody ForgotCardPinRequest request,
        Authentication authentication) {

    String email =
            authentication.getName();

    return ResponseEntity.ok(
            cardService.forgotCardPin(
                    email,
                    cardId,
                    request
            )
    );
}


}