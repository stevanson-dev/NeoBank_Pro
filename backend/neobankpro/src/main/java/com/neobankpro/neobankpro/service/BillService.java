package com.neobankpro.neobankpro.service;

import com.neobankpro.neobankpro.dto.BillRequest;
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
public class BillService {

    private final UserRepository userRepository;
    private final BankAccountRepository bankAccountRepository;
    private final TransactionRepository transactionRepository;
    private final PasswordEncoder passwordEncoder;
    private final TransactionIdGenerator transactionIdGenerator;
    private final NotificationService notificationService;

    public BillService(
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
    public Transaction payBill(
            String email,
            BillRequest request) {

        // ========================================
        // 1. FIND LOGGED-IN USER
        // ========================================

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));


        // ========================================
        // 2. CHECK TRANSACTION PIN
        // ========================================

        if (user.getTransactionPin() == null ||
                user.getTransactionPin().isBlank()) {

            throw new IllegalStateException(
                    "Transaction PIN is not set. Please set your PIN first."
            );
        }


        // ========================================
        // 3. VALIDATE TRANSACTION PIN
        // ========================================

        if (request.getPin() == null ||
                request.getPin().isBlank()) {

            throw new IllegalArgumentException(
                    "Transaction PIN is required"
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
        // 4. VALIDATE AMOUNT
        // ========================================

        if (request.getAmount() == null ||
                request.getAmount()
                        .compareTo(BigDecimal.ZERO) <= 0) {

            throw new IllegalArgumentException(
                    "Invalid bill amount"
            );
        }


        // ========================================
        // 5. VALIDATE CATEGORY
        // ========================================

        if (request.getCategory() == null ||
                request.getCategory().isBlank()) {

            throw new IllegalArgumentException(
                    "Bill category is required"
            );
        }


        // ========================================
        // 6. VALIDATE PROVIDER
        // ========================================

        if (request.getProvider() == null ||
                request.getProvider().isBlank()) {

            throw new IllegalArgumentException(
                    "Bill provider is required"
            );
        }


        // ========================================
        // 7. VALIDATE ACCOUNT NUMBER
        // ========================================

        if (request.getAccountNumber() == null ||
                request.getAccountNumber().isBlank()) {

            throw new IllegalArgumentException(
                    "Bill account number is required"
            );
        }


        // ========================================
        // 8. FIND PRIMARY BANK ACCOUNT
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
        // 9. GET BANK ACCOUNT BALANCE
        // ========================================

        BigDecimal currentBalance =
                account.getBalance();

        if (currentBalance == null) {
            currentBalance = BigDecimal.ZERO;
        }


        // ========================================
        // 10. CHECK SUFFICIENT BALANCE
        // ========================================

        if (currentBalance.compareTo(
                request.getAmount()) < 0) {

            throw new IllegalArgumentException(
                    "Insufficient balance"
            );
        }


        // ========================================
        // 11. DEDUCT BILL AMOUNT
        // ========================================

        BigDecimal newBalance =
                currentBalance.subtract(
                        request.getAmount()
                );

        account.setBalance(newBalance);


        // ========================================
        // 12. SAVE BANK ACCOUNT BALANCE
        // ========================================

        bankAccountRepository.save(account);


        // ========================================
        // 13. CREATE BILL TRANSACTION
        // ========================================

        Transaction transaction =
                new Transaction(
                        user,
                        request.getAmount(),
                        "BILL_PAYMENT",
                        request.getProvider(),
                        "SUCCESS",
                        request.getCategory(),
                        request.getProvider(),
                        request.getAccountNumber()
                );


        // ========================================
        // 14. GENERATE TRANSACTION ID
        // ========================================

        String transactionId =
                transactionIdGenerator.generate(
                        "BILL_PAYMENT"
                );

        transaction.setTransactionId(
                transactionId
        );


        // ========================================
        // 15. SAVE TRANSACTION
        // ========================================

        Transaction savedTransaction =
                transactionRepository.save(
                        transaction
                );


        // ========================================
        // 16. CREATE NOTIFICATION
        // ========================================

        notificationService.createTransactionNotification(
                user,
                "Bill Payment Successful",
                "₹" + request.getAmount()
                        .stripTrailingZeros()
                        .toPlainString()
                        + " bill payment for "
                        + request.getProvider()
                        + " was successful.",
                savedTransaction
        );


        // ========================================
        // 17. RETURN TRANSACTION
        // ========================================

        return savedTransaction;
    }
}