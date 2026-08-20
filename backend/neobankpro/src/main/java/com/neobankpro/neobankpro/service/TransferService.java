package com.neobankpro.neobankpro.service;

import com.neobankpro.neobankpro.dto.TransferRequest;
import com.neobankpro.neobankpro.entity.Transaction;
import com.neobankpro.neobankpro.entity.User;
import com.neobankpro.neobankpro.repository.TransactionRepository;
import com.neobankpro.neobankpro.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TransferService {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final PasswordEncoder passwordEncoder;

    public TransferService(
            UserRepository userRepository,
            TransactionRepository transactionRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Transaction transfer(
            String email,
            TransferRequest request) {

        // 1. Find logged-in user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // 2. Check transaction PIN exists
        if (user.getTransactionPin() == null) {

            throw new IllegalStateException(
                    "Transaction PIN is not set. Please set your PIN first."
            );
        }

        // 3. Validate transaction PIN
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

        // 4. Validate amount
        if (request.getAmount() == null ||
                request.getAmount().signum() <= 0) {

            throw new IllegalArgumentException(
                    "Invalid transfer amount"
            );
        }

        // 5. Check balance
        if (user.getBalance()
                .compareTo(request.getAmount()) < 0) {

            throw new IllegalArgumentException(
                    "Insufficient balance"
            );
        }

        // 6. Deduct amount
        user.setBalance(
                user.getBalance()
                        .subtract(request.getAmount())
        );

        // 7. Save updated balance
        userRepository.save(user);

        // 8. Create transaction
        Transaction transaction = new Transaction(
                user,
                request.getAmount(),
                "TRANSFER",
                request.getMethod(),
                "SUCCESS"
        );

        // 9. Save transaction
        return transactionRepository.save(transaction);
    }
}