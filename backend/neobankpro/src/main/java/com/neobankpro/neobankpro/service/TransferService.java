package com.neobankpro.neobankpro.service;

import com.neobankpro.neobankpro.dto.TransferRequest;
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
public class TransferService {

    private final UserRepository userRepository;
    private final BankAccountRepository bankAccountRepository;
    private final TransactionRepository transactionRepository;
    private final PasswordEncoder passwordEncoder;
    private final TransactionIdGenerator transactionIdGenerator;

    public TransferService(
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
    public Transaction transfer(
            String email,
            TransferRequest request) {

        // ==========================================
        // 1. FIND SENDER
        // ==========================================

        User sender = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Sender not found"));


        // ==========================================
        // 2. CHECK TRANSACTION PIN
        // ==========================================

        if (sender.getTransactionPin() == null ||
                sender.getTransactionPin().isBlank()) {

            throw new IllegalStateException(
                    "Transaction PIN is not set. Please set your PIN first."
            );
        }


        // ==========================================
        // 3. VALIDATE PIN
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
                        sender.getTransactionPin()
                );

        if (!pinCorrect) {

            throw new IllegalArgumentException(
                    "Incorrect transaction PIN"
            );
        }


        // ==========================================
        // 4. VALIDATE AMOUNT
        // ==========================================

        if (request.getAmount() == null ||
                request.getAmount().compareTo(BigDecimal.ZERO) <= 0) {

            throw new IllegalArgumentException(
                    "Invalid transfer amount"
            );
        }


        // ==========================================
        // 5. VALIDATE RECIPIENT ACCOUNT
        // ==========================================

        if (request.getRecipientAccount() == null ||
                request.getRecipientAccount().isBlank()) {

            throw new IllegalArgumentException(
                    "Recipient account is required"
            );
        }

        String recipientAccountNumber =
                request.getRecipientAccount().trim();


        // ==========================================
        // 6. FIND SENDER PRIMARY ACCOUNT
        // ==========================================

        BankAccount senderAccount =
                bankAccountRepository
                        .findByUserAndPrimaryAccount(
                                sender,
                                true
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Sender primary bank account not found"
                                ));


        // ==========================================
        // 7. FIND RECIPIENT ACCOUNT
        // ==========================================

        BankAccount recipientAccount =
                bankAccountRepository
                        .findByAccountNumber(
                                recipientAccountNumber
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Recipient bank account not found"
                                ));


        // ==========================================
        // 8. PREVENT SELF TRANSFER
        // ==========================================

        if (senderAccount.getId()
                .equals(recipientAccount.getId())) {

            throw new IllegalArgumentException(
                    "You cannot transfer money to your own account"
            );
        }


        // ==========================================
        // 9. CHECK SENDER BALANCE
        // ==========================================

        BigDecimal senderBalance =
                senderAccount.getBalance();

        if (senderBalance == null) {
            senderBalance = BigDecimal.ZERO;
        }

        if (senderBalance.compareTo(
                request.getAmount()) < 0) {

            throw new IllegalArgumentException(
                    "Insufficient balance"
            );
        }


        // ==========================================
        // 10. GET RECIPIENT BALANCE
        // ==========================================

        BigDecimal recipientBalance =
                recipientAccount.getBalance();

        if (recipientBalance == null) {
            recipientBalance = BigDecimal.ZERO;
        }


        // ==========================================
        // 11. DEDUCT FROM SENDER
        // ==========================================

        senderAccount.setBalance(
                senderBalance.subtract(
                        request.getAmount()
                )
        );


        // ==========================================
        // 12. CREDIT RECIPIENT
        // ==========================================

        recipientAccount.setBalance(
                recipientBalance.add(
                        request.getAmount()
                )
        );


        // ==========================================
        // 13. SAVE BOTH ACCOUNTS
        // ==========================================

        bankAccountRepository.save(senderAccount);
        bankAccountRepository.save(recipientAccount);


        // ==========================================
        // 14. CREATE SENDER TRANSACTION
        // ==========================================

        Transaction transaction =
                new Transaction(
                        sender,
                        request.getAmount(),
                        "TRANSFER",
                        request.getMethod(),
                        "SUCCESS"
                );


        // ==========================================
        // 15. GENERATE TRANSACTION ID
        // ==========================================

        String transactionId =
                transactionIdGenerator.generate(
                        "TRANSFER"
                );

        transaction.setTransactionId(
                transactionId
        );


        // ==========================================
        // 16. SET RECIPIENT DETAILS
        // ==========================================

        transaction.setRecipientName(
                request.getRecipientName()
        );

        transaction.setRecipientAccount(
                request.getRecipientAccount()
        );

        transaction.setRecipientBank(
                request.getRecipientBank()
        );


        // ==========================================
        // 17. SAVE TRANSACTION
        // ==========================================

        return transactionRepository.save(
                transaction
        );
    }
}