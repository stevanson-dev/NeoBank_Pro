package com.neobankpro.neobankpro.service;

import com.neobankpro.neobankpro.dto.CardPaymentRequest;
import com.neobankpro.neobankpro.dto.CardPaymentResponse;
import com.neobankpro.neobankpro.entity.*;
import com.neobankpro.neobankpro.repository.CardPaymentRepository;
import com.neobankpro.neobankpro.repository.CardRepository;
import com.neobankpro.neobankpro.repository.TransactionRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
public class CardPaymentService {

    private final CardRepository cardRepository;
    private final CardPaymentRepository cardPaymentRepository;
    private final TransactionRepository transactionRepository;
    private final PasswordEncoder passwordEncoder;
    private final TransactionIdGenerator transactionIdGenerator;
    private final NotificationService notificationService;

    public CardPaymentService(
            CardRepository cardRepository,
            CardPaymentRepository cardPaymentRepository,
            TransactionRepository transactionRepository,
            PasswordEncoder passwordEncoder,
            TransactionIdGenerator transactionIdGenerator,
            NotificationService notificationService
    ) {
        this.cardRepository = cardRepository;
        this.cardPaymentRepository = cardPaymentRepository;
        this.transactionRepository = transactionRepository;
        this.passwordEncoder = passwordEncoder;
        this.transactionIdGenerator = transactionIdGenerator;
        this.notificationService = notificationService;
    }

    @Transactional
    public CardPaymentResponse pay(CardPaymentRequest request) {

        // =========================================================
        // 1. BASIC VALIDATION
        // =========================================================

        if (request.getCardId() == null) {
            throw new RuntimeException("Card is required");
        }

        if (request.getAmount() == null ||
                request.getAmount().compareTo(BigDecimal.ZERO) <= 0) {

            throw new RuntimeException(
                    "Amount must be greater than zero"
            );
        }

        if (request.getMerchantName() == null ||
                request.getMerchantName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Merchant name is required"
            );
        }

        if (request.getPin() == null ||
                !request.getPin().matches("\\d{4}")) {

            throw new RuntimeException(
                    "Card PIN must contain exactly 4 digits"
            );
        }

        if (request.getPaymentType() == null) {
            throw new RuntimeException(
                    "Payment type is required"
            );
        }


        // =========================================================
        // 2. GET LOGGED-IN USER
        // =========================================================

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            throw new RuntimeException(
                    "User is not authenticated"
            );
        }

        String username =
                authentication.getName();


        // =========================================================
        // 3. FIND CARD
        // =========================================================

        Card card =
                cardRepository
                        .findById(request.getCardId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Card not found"
                                )
                        );


        // =========================================================
        // 4. VERIFY CARD OWNER
        // =========================================================

        if (card.getBankAccount() == null ||
                card.getBankAccount().getUser() == null) {

            throw new RuntimeException(
                    "Invalid card account"
            );
        }

        if (!card.getBankAccount()
                .getUser()
                .getEmail()
                .equalsIgnoreCase(username)) {

            throw new RuntimeException(
                    "You cannot use this card"
            );
        }


        // =========================================================
        // 5. CARD STATUS CHECK
        // =========================================================

        if (card.getStatus() == CardStatus.BLOCKED) {

            throw new RuntimeException(
                    "Card is blocked"
            );
        }

        if (card.getStatus() == CardStatus.FROZEN) {

            throw new RuntimeException(
                    "Card is frozen"
            );
        }

        if (card.getStatus() != CardStatus.ACTIVE) {

            throw new RuntimeException(
                    "Card is not active"
            );
        }


        // =========================================================
        // 6. EXPIRY CHECK
        // =========================================================

        if (card.getExpiryDate() != null &&
                card.getExpiryDate()
                        .isBefore(LocalDate.now())) {

            card.setStatus(CardStatus.EXPIRED);

            cardRepository.save(card);

            throw new RuntimeException(
                    "Card has expired"
            );
        }


        // =========================================================
        // 7. PIN SET CHECK
        // =========================================================

        if (!card.isPinSet() ||
                card.getPinHash() == null) {

            throw new RuntimeException(
                    "Please set your card PIN first"
            );
        }


        // =========================================================
        // 8. PIN TEMPORARY LOCK CHECK
        // =========================================================

        if (card.getPinLockedUntil() != null &&
                card.getPinLockedUntil()
                        .isAfter(LocalDateTime.now())) {

            throw new RuntimeException(
                    "Card PIN is temporarily locked"
            );
        }


        // =========================================================
        // 9. VERIFY PIN
        // =========================================================

        if (!passwordEncoder.matches(
                request.getPin(),
                card.getPinHash()
        )) {

            int attempts =
                    card.getPinFailedAttempts() + 1;

            card.setPinFailedAttempts(attempts);

            // 5 WRONG ATTEMPTS
            if (attempts >= 5) {

                card.setPinLockedUntil(
                        LocalDateTime.now()
                                .plusMinutes(15)
                );

                card.setPinFailedAttempts(0);

                cardRepository.save(card);

                throw new RuntimeException(
                        "Too many wrong PIN attempts. " +
                        "Try again after 15 minutes."
                );
            }

            cardRepository.save(card);

            throw new RuntimeException(
                    "Incorrect PIN. Attempts remaining: "
                            + (5 - attempts)
            );
        }


        // Correct PIN
        card.setPinFailedAttempts(0);
        card.setPinLockedUntil(null);


        // =========================================================
        // 10. PAYMENT TYPE CHECK
        // =========================================================

        if (request.getPaymentType() ==
                PaymentType.ONLINE) {

            if (!card.isOnlineEnabled()) {

                throw new RuntimeException(
                        "Online payments are disabled for this card"
                );
            }
        }


        if (request.getPaymentType() ==
                PaymentType.POS) {

            if (!card.isPosEnabled()) {

                throw new RuntimeException(
                        "POS payments are disabled for this card"
                );
            }
        }


        // =========================================================
        // 11. DAILY LIMIT CHECK
        // =========================================================

        LocalDateTime todayStart =
                LocalDateTime.of(
                        LocalDate.now(),
                        LocalTime.MIN
                );

        LocalDateTime tomorrowStart =
                todayStart.plusDays(1);

        BigDecimal dailyUsed =
                cardPaymentRepository.getTotalAmount(
                        card,
                        CardPaymentStatus.SUCCESS,
                        todayStart,
                        tomorrowStart
                );

        if (dailyUsed == null) {
            dailyUsed = BigDecimal.ZERO;
        }

        BigDecimal dailyAfterPayment =
                dailyUsed.add(
                        request.getAmount()
                );

        if (card.getDailyLimit() != null &&
                dailyAfterPayment.compareTo(
                        card.getDailyLimit()
                ) > 0) {

            throw new RuntimeException(
                    "Daily card payment limit exceeded"
            );
        }


        // =========================================================
        // 12. MONTHLY LIMIT CHECK
        // =========================================================

        LocalDate firstDay =
                LocalDate.now()
                        .withDayOfMonth(1);

        LocalDateTime monthStart =
                firstDay.atStartOfDay();

        LocalDateTime nextMonthStart =
                monthStart.plusMonths(1);

        BigDecimal monthlyUsed =
                cardPaymentRepository.getTotalAmount(
                        card,
                        CardPaymentStatus.SUCCESS,
                        monthStart,
                        nextMonthStart
                );

        if (monthlyUsed == null) {
            monthlyUsed = BigDecimal.ZERO;
        }

        BigDecimal monthlyAfterPayment =
                monthlyUsed.add(
                        request.getAmount()
                );

        if (card.getMonthlyLimit() != null &&
                monthlyAfterPayment.compareTo(
                        card.getMonthlyLimit()
                ) > 0) {

            throw new RuntimeException(
                    "Monthly card payment limit exceeded"
            );
        }


        // =========================================================
        // MONTHLY RESPONSE VALUES
        // =========================================================

        BigDecimal monthlyLimit =
                card.getMonthlyLimit();

        BigDecimal monthlyRemaining = null;

        if (monthlyLimit != null) {

            monthlyRemaining =
                    monthlyLimit.subtract(
                            monthlyAfterPayment
                    );

            if (monthlyRemaining.compareTo(
                    BigDecimal.ZERO
            ) < 0) {

                monthlyRemaining =
                        BigDecimal.ZERO;
            }
        }


        // =========================================================
        // 13. BANK ACCOUNT
        // =========================================================

        BankAccount bankAccount =
                card.getBankAccount();

        if (bankAccount == null) {

            throw new RuntimeException(
                    "Bank account not found"
            );
        }


        BigDecimal remainingBalance = null;
        BigDecimal availableCredit = null;


        // =========================================================
        // 14. DEBIT CARD PAYMENT
        // =========================================================

        if (card.getCardType() ==
                CardType.DEBIT) {

            BigDecimal balance =
                    bankAccount.getBalance();

            if (balance == null) {
                balance = BigDecimal.ZERO;
            }

            // Insufficient balance
            if (balance.compareTo(
                    request.getAmount()
            ) < 0) {

                throw new RuntimeException(
                        "Insufficient account balance"
                );
            }

            // Deduct money
            balance =
                    balance.subtract(
                            request.getAmount()
                    );

            bankAccount.setBalance(balance);

            remainingBalance = balance;
        }


        // =========================================================
        // 15. CREDIT CARD PAYMENT
        // =========================================================

        if (card.getCardType() ==
                CardType.CREDIT) {

            BigDecimal available =
                    card.getAvailableCredit();

            if (available == null) {

                available =
                        card.getCreditLimit() != null
                                ? card.getCreditLimit()
                                : BigDecimal.ZERO;
            }

            // Insufficient credit
            if (available.compareTo(
                    request.getAmount()
            ) < 0) {

                throw new RuntimeException(
                        "Insufficient credit limit"
                );
            }

            // Reduce available credit
            available =
                    available.subtract(
                            request.getAmount()
                    );

            BigDecimal used =
                    card.getUsedCredit() != null
                            ? card.getUsedCredit()
                            : BigDecimal.ZERO;

            used =
                    used.add(
                            request.getAmount()
                    );

            card.setAvailableCredit(available);
            card.setUsedCredit(used);

            availableCredit = available;
        }


        // =========================================================
        // 16. SAVE CARD
        // =========================================================

        cardRepository.save(card);


        // =========================================================
        // 17. CREATE CARD PAYMENT
        // =========================================================

        CardPayment payment =
                new CardPayment();

        payment.setCard(card);

        payment.setBankAccount(
                bankAccount
        );

        payment.setAmount(
                request.getAmount()
        );

        payment.setMerchantName(
                request.getMerchantName().trim()
        );

        payment.setPaymentType(
                request.getPaymentType()
        );

        payment.setStatus(
                CardPaymentStatus.SUCCESS
        );


        // =========================================================
        // 18. GENERATE TRANSACTION ID
        // =========================================================

        String transactionId =
                transactionIdGenerator.generate(
                        "CARD_PAYMENT"
                );

        payment.setTransactionId(
                transactionId
        );


        // =========================================================
        // 19. SAVE CARD PAYMENT
        // =========================================================

        CardPayment savedPayment =
                cardPaymentRepository.save(
                        payment
                );


        // =========================================================
        // 20. SAVE TO TRANSACTION HISTORY
        // =========================================================

        User user =
                bankAccount.getUser();

        Transaction transaction =
                new Transaction(
                        user,
                        request.getAmount(),
                        "CARD_PAYMENT",
                        request.getPaymentType() ==
                                PaymentType.ONLINE
                                ? "CARD_ONLINE"
                                : "CARD_POS",
                        "SUCCESS"
                );

        transaction.setTransactionId(
                transactionId
        );

        transaction.setCategory(
                "Card Payment"
        );

        transaction.setNotes(
                "Payment to "
                        + request.getMerchantName().trim()
        );

        Transaction savedTransaction =
                transactionRepository.save(
                        transaction
                );


        // =========================================================
        // 21. CREATE NOTIFICATION
        // =========================================================

        notificationService.createTransactionNotification(
                user,
                "Card Payment Successful",
                "₹" + request.getAmount()
                        .stripTrailingZeros()
                        .toPlainString()
                        + " payment was made at "
                        + request.getMerchantName().trim()
                        + ".",
                savedTransaction
        );


        // =========================================================
        // 22. MASK CARD NUMBER
        // =========================================================

        String cardNumber =
                card.getCardNumber();

        if (cardNumber != null &&
                cardNumber.length() >= 4) {

            cardNumber =
                    "****" +
                    cardNumber.substring(
                            cardNumber.length() - 4
                    );
        }


        // =========================================================
        // 23. RESPONSE
        // =========================================================

        return new CardPaymentResponse(
                true,
                "Payment successful",
                savedPayment.getId(),
                transactionId,
                request.getAmount(),
                request.getMerchantName(),
                cardNumber,
                remainingBalance,
                availableCredit,
                monthlyLimit,
                monthlyAfterPayment,
                monthlyRemaining
        );
    }
}