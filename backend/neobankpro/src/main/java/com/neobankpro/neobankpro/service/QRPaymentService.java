package com.neobankpro.neobankpro.service;

import com.neobankpro.neobankpro.dto.QRPaymentRequest;
import com.neobankpro.neobankpro.entity.BankAccount;
import com.neobankpro.neobankpro.entity.Transaction;
import com.neobankpro.neobankpro.entity.User;
import com.neobankpro.neobankpro.repository.BankAccountRepository;
import com.neobankpro.neobankpro.repository.TransactionRepository;
import com.neobankpro.neobankpro.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class QRPaymentService {

    private final UserRepository userRepository;
    private final BankAccountRepository bankAccountRepository;
    private final TransactionRepository transactionRepository;
    private final PasswordEncoder passwordEncoder;
    private final TransactionIdGenerator transactionIdGenerator;
    private final NotificationService notificationService;

    public QRPaymentService(
            UserRepository userRepository,
            BankAccountRepository bankAccountRepository,
            TransactionRepository transactionRepository,
            PasswordEncoder passwordEncoder,
            TransactionIdGenerator transactionIdGenerator,
            NotificationService notificationService) {

        this.userRepository = userRepository;
        this.bankAccountRepository = bankAccountRepository;
        this.transactionRepository = transactionRepository;
        this.passwordEncoder = passwordEncoder;
        this.transactionIdGenerator = transactionIdGenerator;
        this.notificationService = notificationService;
    }

    @Transactional
    public Transaction pay(
            String email,
            QRPaymentRequest request) {

        // ========================================
        // 1. FIND LOGGED-IN USER
        // ========================================

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));


        // ========================================
        // 2. VALIDATE AMOUNT
        // ========================================

        if (request.getAmount() == null ||
                request.getAmount().signum() <= 0) {

            throw new IllegalArgumentException(
                    "Invalid payment amount"
            );
        }


        // ========================================
        // 3. VALIDATE UPI ID
        // ========================================

        if (request.getUpiId() == null ||
                request.getUpiId().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "UPI ID is required"
            );
        }

        String upiId =
                request.getUpiId().trim();


        // ========================================
        // 4. BASIC UPI FORMAT VALIDATION
        // ========================================

        if (!upiId.matches(
                "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$")) {

            throw new IllegalArgumentException(
                    "Invalid UPI ID"
            );
        }


        // ========================================
        // 5. CHECK TRANSACTION PIN EXISTS
        // ========================================

        if (user.getTransactionPin() == null ||
                user.getTransactionPin().isBlank()) {

            throw new IllegalStateException(
                    "Transaction PIN is not set. Please set your PIN first."
            );
        }


        // ========================================
        // 6. VALIDATE TRANSACTION PIN
        // ========================================

        if (request.getPin() == null ||
                !request.getPin().matches("\\d{6}")) {

            throw new IllegalArgumentException(
                    "Please enter your 6-digit PIN"
            );
        }


        boolean pinCorrect =
                passwordEncoder.matches(
                        request.getPin(),
                        user.getTransactionPin()
                );


        if (!pinCorrect) {

            throw new IllegalArgumentException(
                    "Incorrect transaction PIN"
            );
        }


        // ========================================
        // 7. FIND PRIMARY BANK ACCOUNT
        // ========================================

        BankAccount account =
                bankAccountRepository
                        .findByUserAndPrimaryAccount(
                                user,
                                true
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Primary bank account not found"
                                ));


        // ========================================
        // 8. GET BANK ACCOUNT BALANCE
        // ========================================

        BigDecimal currentBalance =
                account.getBalance();

        if (currentBalance == null) {
            currentBalance = BigDecimal.ZERO;
        }


        // ========================================
        // 9. CHECK SUFFICIENT BALANCE
        // ========================================

        if (currentBalance.compareTo(
                request.getAmount()) < 0) {

            throw new IllegalArgumentException(
                    "Insufficient balance"
            );
        }


        // ========================================
        // 10. DEDUCT FROM BANK ACCOUNT
        // ========================================

        BigDecimal newBalance =
                currentBalance.subtract(
                        request.getAmount()
                );

        account.setBalance(newBalance);


        // ========================================
        // 11. SAVE BANK ACCOUNT
        // ========================================

        bankAccountRepository.save(account);


        // ========================================
        // 12. CREATE QR TRANSACTION
        // ========================================

        Transaction transaction =
                new Transaction(
                        user,
                        request.getAmount(),
                        "QR_PAYMENT",
                        "UPI",
                        "SUCCESS"
                );


        // ========================================
        // 13. GENERATE TRANSACTION ID
        // ========================================

        String transactionId =
                transactionIdGenerator.generate(
                        "QR_PAYMENT"
                );

        transaction.setTransactionId(
                transactionId
        );


        // ========================================
        // 14. SAVE TRANSACTION
        // ========================================

        Transaction savedTransaction =
                transactionRepository.save(
                        transaction
                );


        // ========================================
        // 15. CREATE NOTIFICATION
        // ========================================

        notificationService.createTransactionNotification(
                user,
                "QR Payment Successful",
                "₹" + request.getAmount()
                        .stripTrailingZeros()
                        .toPlainString()
                        + " was paid successfully via UPI.",
                savedTransaction
        );


        // ========================================
        // 16. RETURN TRANSACTION
        // ========================================

        return savedTransaction;
    }
}