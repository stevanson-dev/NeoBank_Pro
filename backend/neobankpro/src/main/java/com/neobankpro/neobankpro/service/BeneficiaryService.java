package com.neobankpro.neobankpro.service;

import com.neobankpro.neobankpro.entity.Beneficiary;
import com.neobankpro.neobankpro.entity.User;
import com.neobankpro.neobankpro.repository.BeneficiaryRepository;
import com.neobankpro.neobankpro.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BeneficiaryService {

    private final BeneficiaryRepository beneficiaryRepository;
    private final UserRepository userRepository;

    public BeneficiaryService(
            BeneficiaryRepository beneficiaryRepository,
            UserRepository userRepository
    ) {
        this.beneficiaryRepository = beneficiaryRepository;
        this.userRepository = userRepository;
    }

    private User getUser(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    // ==================================================
    // GET BENEFICIARIES
    // ==================================================

    public List<Beneficiary> getBeneficiaries(String email) {

        User user = getUser(email);

        return beneficiaryRepository
                .findByUserOrderByCreatedAtDesc(user);
    }

    // ==================================================
    // ADD BENEFICIARY
    // ==================================================

    @Transactional
    public Beneficiary addBeneficiary(
            String email,
            Beneficiary beneficiary
    ) {

        User user = getUser(email);

        validateBeneficiary(beneficiary);

        if (beneficiary.getAccountType() == null ||
                beneficiary.getAccountType().trim().isEmpty()) {

            beneficiary.setAccountType("Savings");
        }

        // Never trust frontend user/id
        beneficiary.setId(null);
        beneficiary.setUser(user);

        return beneficiaryRepository.save(beneficiary);
    }

    // ==================================================
    // UPDATE BENEFICIARY
    // ==================================================

    @Transactional
    public Beneficiary updateBeneficiary(
            String email,
            Long beneficiaryId,
            Beneficiary request
    ) {

        User user = getUser(email);

        Beneficiary existing =
                beneficiaryRepository.findByIdAndUser(
                        beneficiaryId,
                        user
                );

        if (existing == null) {
            throw new RuntimeException(
                    "Beneficiary not found"
            );
        }

        validateBeneficiary(request);

        // ----------------------------------------------
        // UPDATE ONLY ALLOWED FIELDS
        // ----------------------------------------------

        existing.setName(
                request.getName().trim()
        );

        existing.setBankName(
                request.getBankName().trim()
        );

        existing.setAccountNumber(
                request.getAccountNumber().trim()
        );

        existing.setIfsc(
                request.getIfsc()
                        .trim()
                        .toUpperCase()
        );

        existing.setAccountType(
                request.getAccountType() == null ||
                        request.getAccountType()
                                .trim()
                                .isEmpty()
                        ? "Savings"
                        : request.getAccountType().trim()
        );

        if (request.getUpiId() != null &&
                !request.getUpiId().trim().isEmpty()) {

            existing.setUpiId(
                    request.getUpiId().trim()
            );

        } else {

            existing.setUpiId(null);
        }

        if (request.getNickname() != null &&
                !request.getNickname().trim().isEmpty()) {

            existing.setNickname(
                    request.getNickname().trim()
            );

        } else {

            existing.setNickname(null);
        }

        // Important:
        // existing user/id/createdAt are NOT changed.

        return beneficiaryRepository.save(existing);
    }

    // ==================================================
    // DELETE BENEFICIARY
    // ==================================================

    @Transactional
    public void deleteBeneficiary(
            String email,
            Long beneficiaryId
    ) {

        User user = getUser(email);

        Beneficiary beneficiary =
                beneficiaryRepository.findByIdAndUser(
                        beneficiaryId,
                        user
                );

        if (beneficiary == null) {

            throw new RuntimeException(
                    "Beneficiary not found"
            );
        }

        beneficiaryRepository.delete(beneficiary);
    }

    // ==================================================
    // VALIDATION
    // ==================================================

    private void validateBeneficiary(
            Beneficiary beneficiary
    ) {

        if (beneficiary == null) {
            throw new RuntimeException(
                    "Beneficiary details are required"
            );
        }

        if (beneficiary.getName() == null ||
                beneficiary.getName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Recipient name is required"
            );
        }

        if (beneficiary.getAccountNumber() == null ||
                beneficiary.getAccountNumber().trim().isEmpty()) {

            throw new RuntimeException(
                    "Account number is required"
            );
        }

        String accountNumber =
                beneficiary.getAccountNumber().trim();

        if (!accountNumber.matches("\\d{9,18}")) {

            throw new RuntimeException(
                    "Invalid account number"
            );
        }

        if (beneficiary.getBankName() == null ||
                beneficiary.getBankName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Bank name is required"
            );
        }

        if (beneficiary.getIfsc() == null ||
                beneficiary.getIfsc().trim().isEmpty()) {

            throw new RuntimeException(
                    "IFSC code is required"
            );
        }

        String ifsc =
                beneficiary.getIfsc()
                        .trim()
                        .toUpperCase();

        if (!ifsc.matches(
                "^[A-Z]{4}0[A-Z0-9]{6}$"
        )) {

            throw new RuntimeException(
                    "Invalid IFSC code"
            );
        }
    }
}