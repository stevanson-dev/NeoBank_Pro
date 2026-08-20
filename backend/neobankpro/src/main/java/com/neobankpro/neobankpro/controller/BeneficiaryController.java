package com.neobankpro.neobankpro.controller;

import com.neobankpro.neobankpro.entity.Beneficiary;
import com.neobankpro.neobankpro.service.BeneficiaryService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/beneficiaries")
@CrossOrigin(origins = "http://localhost:5173")
public class BeneficiaryController {

    private final BeneficiaryService beneficiaryService;

    public BeneficiaryController(
            BeneficiaryService beneficiaryService
    ) {
        this.beneficiaryService = beneficiaryService;
    }

    // ==================================================
    // GET ALL BENEFICIARIES
    // ==================================================

    @GetMapping
    public ResponseEntity<?> getBeneficiaries(
            Authentication authentication
    ) {

        try {

            String email = authentication.getName();

            List<Beneficiary> beneficiaries =
                    beneficiaryService.getBeneficiaries(email);

            return ResponseEntity.ok(beneficiaries);

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    // ==================================================
    // ADD BENEFICIARY
    // ==================================================

    @PostMapping
    public ResponseEntity<?> addBeneficiary(
            Authentication authentication,
            @RequestBody Beneficiary beneficiary
    ) {

        try {

            String email = authentication.getName();

            Beneficiary saved =
                    beneficiaryService.addBeneficiary(
                            email,
                            beneficiary
                    );

            return ResponseEntity.ok(saved);

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    // ==================================================
    // UPDATE BENEFICIARY
    // ==================================================

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBeneficiary(
            Authentication authentication,
            @PathVariable Long id,
            @RequestBody Beneficiary beneficiary
    ) {

        try {

            String email = authentication.getName();

            Beneficiary updated =
                    beneficiaryService.updateBeneficiary(
                            email,
                            id,
                            beneficiary
                    );

            return ResponseEntity.ok(updated);

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    // ==================================================
    // DELETE BENEFICIARY
    // ==================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBeneficiary(
            Authentication authentication,
            @PathVariable Long id
    ) {

        try {

            String email = authentication.getName();

            beneficiaryService.deleteBeneficiary(
                    email,
                    id
            );

            return ResponseEntity.ok(
                    "Beneficiary deleted successfully"
            );

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }
}