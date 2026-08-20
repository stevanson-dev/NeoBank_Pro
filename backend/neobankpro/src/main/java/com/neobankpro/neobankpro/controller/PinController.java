package com.neobankpro.neobankpro.controller;

import com.neobankpro.neobankpro.dto.ChangePinRequest;
import com.neobankpro.neobankpro.dto.SetPinRequest;
import com.neobankpro.neobankpro.service.PinService;

import jakarta.validation.Valid;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pin")
@CrossOrigin(origins = "http://localhost:5173")
public class PinController {

    private final PinService pinService;

    public PinController(PinService pinService) {
        this.pinService = pinService;
    }


    // SET NEW PIN
    @PostMapping("/set")
    public ResponseEntity<?> setPin(
            Authentication authentication,
            @Valid @RequestBody SetPinRequest request) {

        try {

            String email = authentication.getName();

            pinService.setPin(email, request);

            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "message", "PIN set successfully"
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


    // CHANGE PIN
    @PostMapping("/change")
    public ResponseEntity<?> changePin(
            Authentication authentication,
            @Valid @RequestBody ChangePinRequest request) {

        try {

            String email = authentication.getName();

            pinService.changePin(email, request);

            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "message", "PIN changed successfully"
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