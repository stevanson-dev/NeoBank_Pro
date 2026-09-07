package com.neobankpro.neobankpro.service;

import com.neobankpro.neobankpro.dto.WithdrawRequest;
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
public class WithdrawService {

    private final UserRepository userRepository;
    private final BankAccountRepository bankAccountRepository;
    private final TransactionRepository transactionRepository;
    private final PasswordEncoder passwordEncoder;
    private final TransactionIdGenerator transactionIdGenerator;

    public WithdrawService(
            UserRepository userRepository,
            BankAccountRepository bankAccountRepository,
            TransactionRepository transactionRepository,
            PasswordEncoder passwordEncoder,
            TransactionIdGenerator transactionIdGenerator) {

        this.userRepository = userRepository;
        this.bankAccountRepository = bankAccountRepository;
        this.transactionRepository = transactionRepository;
        this.passwordEncoder = passwordEncoder;
        this.transactionIdGenerator = transactionIdGenerator;
    }

    @Transactional
    public Transaction withdraw(
            String email,
            WithdrawRequest request) {

        // ==========================================
        // 1. FIND LOGGED-IN USER
        // ==========================================

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));


        // ==========================================
        // 2. CHECK TRANSACTION PIN
        // ==========================================

        if (user.getTransactionPin() == null ||
                user.getTransactionPin().isBlank()) {

            throw new IllegalStateException(
                    "Transaction PIN is not set. Please set your PIN first."
            );
        }


        // ==========================================
        // 3. VERIFY TRANSACTION PIN
        // ==========================================

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
                    "Current PIN is incorrect"
            );
        }


        // ==========================================
        // 4. VALIDATE AMOUNT
        // ==========================================

        if (request.getAmount() == null ||
                request.getAmount()
                        .compareTo(BigDecimal.ZERO) <= 0) {

            throw new IllegalArgumentException(
                    "Invalid withdrawal amount"
            );
        }


        // ==========================================
        // 5. FIND PRIMARY BANK ACCOUNT
        // ==========================================

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


        // ==========================================
        // 6. GET BANK ACCOUNT BALANCE
        // ==========================================

        BigDecimal currentBalance =
                account.getBalance();

        if (currentBalance == null) {
            currentBalance = BigDecimal.ZERO;
        }


        // ==========================================
        // 7. CHECK SUFFICIENT BALANCE
        // ==========================================

        if (currentBalance.compareTo(
                request.getAmount()) < 0) {

            throw new IllegalArgumentException(
                    "Insufficient balance"
            );
        }


        // ==========================================
        // 8. SUBTRACT FROM BANK ACCOUNT
        // ==========================================

        BigDecimal newBalance =
                currentBalance.subtract(
                        request.getAmount()
                );

        account.setBalance(newBalance);


        // ==========================================
        // 9. SAVE BANK ACCOUNT
        // ==========================================

        bankAccountRepository.save(account);


        // ==========================================
        // 10. CREATE TRANSACTION
        // ==========================================

        Transaction transaction =
                new Transaction(
                        user,
                        request.getAmount(),
                        "WITHDRAW",
                        request.getMethod(),
                        "SUCCESS"
                );


        // ==========================================
        // 11. GENERATE TRANSACTION ID
        // ==========================================

        String transactionId =
                transactionIdGenerator.generate(
                        "WITHDRAW"
                );

        transaction.setTransactionId(
                transactionId
        );


        // ==========================================
        // 12. SAVE TRANSACTION
        // ==========================================

        return transactionRepository.save(
                transaction
        );
    }
}