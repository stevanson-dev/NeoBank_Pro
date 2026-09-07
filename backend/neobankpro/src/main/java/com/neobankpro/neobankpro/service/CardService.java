
package com.neobankpro.neobankpro.service;

import com.neobankpro.neobankpro.dto.CardResponse;
import com.neobankpro.neobankpro.dto.ChangeCardPinRequest;
import com.neobankpro.neobankpro.dto.ForgotCardPinRequest;
import com.neobankpro.neobankpro.dto.SetCardPinRequest;

import com.neobankpro.neobankpro.entity.BankAccount;
import com.neobankpro.neobankpro.entity.Card;
import com.neobankpro.neobankpro.entity.CardStatus;
import com.neobankpro.neobankpro.entity.CardType;
import com.neobankpro.neobankpro.entity.CardVariant;
import com.neobankpro.neobankpro.entity.User;

import com.neobankpro.neobankpro.exception.DuplicateResourceException;

import com.neobankpro.neobankpro.repository.BankAccountRepository;
import com.neobankpro.neobankpro.repository.CardRepository;
import com.neobankpro.neobankpro.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.neobankpro.neobankpro.entity.CardPaymentStatus;
import com.neobankpro.neobankpro.repository.CardPaymentRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class CardService {

    private final CardRepository cardRepository;
    private final UserRepository userRepository;
    private final BankAccountService bankAccountService;
    private final PasswordEncoder passwordEncoder;
    private final BankAccountRepository bankAccountRepository;
    private final CardPaymentRepository cardPaymentRepository;

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

   public CardService(
        CardRepository cardRepository,
        BankAccountRepository bankAccountRepository,
        UserRepository userRepository,
        BankAccountService bankAccountService,
        PasswordEncoder passwordEncoder,
        CardPaymentRepository cardPaymentRepository) {

        this.cardRepository = cardRepository;
        this.bankAccountRepository = bankAccountRepository;
        this.userRepository = userRepository;
        this.bankAccountService = bankAccountService;
        this.passwordEncoder = passwordEncoder;
        this.cardPaymentRepository = cardPaymentRepository;
    }


    // ==========================================
// GET CURRENT MONTH CARD PAYMENT USAGE
// ==========================================

private BigDecimal getMonthlyUsed(Card card) {

    LocalDateTime start =
            LocalDate.now()
                    .withDayOfMonth(1)
                    .atStartOfDay();

    LocalDateTime end =
            start.plusMonths(1);

    BigDecimal total =
            cardPaymentRepository.getTotalAmount(
                    card,
                    CardPaymentStatus.SUCCESS,
                    start,
                    end
            );

    return total != null
            ? total
            : BigDecimal.ZERO;
}

    // ==========================================
    // GET USER
    // ==========================================

    private User getUserByEmail(String email) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );
    }

    // ==========================================
    // GET PRIMARY BANK ACCOUNT
    // ==========================================

    private BankAccount getPrimaryBankAccount(User user) {

        BankAccount bankAccount =
                bankAccountService.getPrimaryAccount(user);

        if (bankAccount == null) {
            throw new RuntimeException(
                    "Primary bank account not found"
            );
        }

        return bankAccount;
    }

    // ==========================================
    // GET ALL USER CARDS
    // ==========================================

    @Transactional(readOnly = true)
    public List<CardResponse> getUserCards(String email) {

        User user =
                getUserByEmail(email);

        BankAccount bankAccount =
                getPrimaryBankAccount(user);

        return cardRepository
        .findByBankAccount(bankAccount)
        .stream()
        .map(card ->
                new CardResponse(
                        card,
                        getMonthlyUsed(card)
                )
        )
        .toList();
    }

    // ==========================================
    // GET USER CARD BY ID
    // ==========================================

    private Card getUserCard(
            String email,
            Long cardId) {

        User user =
                getUserByEmail(email);

        BankAccount bankAccount =
                getPrimaryBankAccount(user);

        return cardRepository
                .findByIdAndBankAccount(
                        cardId,
                        bankAccount
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Card not found"
                        )
                );
    }

    // ==========================================
    // CREATE DEBIT CARD
    // ==========================================

    @Transactional
    public CardResponse createDebitCard(
            String email,
            CardVariant variant) {

        if (variant == null) {
            throw new RuntimeException(
                    "Card variant is required"
            );
        }

        User user =
                getUserByEmail(email);

        BankAccount bankAccount =
                getPrimaryBankAccount(user);

        // --------------------------------------
        // CHECK CARD SLOT
        // --------------------------------------
        //
        // ACTIVE / FROZEN / PENDING
        //      -> DUPLICATE
        //
        // BLOCKED / EXPIRED
        //      -> REPLACEMENT ALLOWED
        //
        // NO CARD
        //      -> NEW CARD
        // --------------------------------------

        checkCardSlotAvailable(
                bankAccount,
                CardType.DEBIT,
                variant
        );

        // --------------------------------------
        // CREATE CARD
        // --------------------------------------

        Card card =
                createBaseCard(
                        user,
                        bankAccount,
                        CardType.DEBIT,
                        variant
                );

        // --------------------------------------
        // DEBIT CARD ACTIVE
        // --------------------------------------

        card.setStatus(
                CardStatus.ACTIVE
        );

        // --------------------------------------
        // DEBIT DOES NOT USE CREDIT VALUES
        // --------------------------------------

        card.setCreditLimit(null);
        card.setUsedCredit(null);
        card.setAvailableCredit(null);

        // --------------------------------------
        // SAVE
        // --------------------------------------

        Card savedCard =
                cardRepository.save(card);

        return new CardResponse(
        savedCard,
        getMonthlyUsed(savedCard)
);
    }

    // ==========================================
    // CREATE CREDIT CARD
    // ==========================================

    @Transactional
    public CardResponse createCreditCard(
            String email,
            CardVariant variant) {

        if (variant == null) {
            throw new RuntimeException(
                    "Card variant is required"
            );
        }

        User user =
                getUserByEmail(email);

        BankAccount bankAccount =
                getPrimaryBankAccount(user);

        // --------------------------------------
        // CHECK CARD SLOT
        // --------------------------------------

        checkCardSlotAvailable(
                bankAccount,
                CardType.CREDIT,
                variant
        );

        // --------------------------------------
        // CREATE CARD
        // --------------------------------------

        Card card =
                createBaseCard(
                        user,
                        bankAccount,
                        CardType.CREDIT,
                        variant
                );

        // --------------------------------------
        // CREDIT LIMIT
        // --------------------------------------

        BigDecimal creditLimit =
                new BigDecimal("50000");

        card.setCreditLimit(
                creditLimit
        );

        card.setUsedCredit(
                BigDecimal.ZERO
        );

        card.setAvailableCredit(
                creditLimit
        );

        // --------------------------------------
        // CREDIT CARD ACTIVE
        // --------------------------------------

        card.setStatus(
                CardStatus.ACTIVE
        );

        // --------------------------------------
        // SAVE
        // --------------------------------------

        Card savedCard =
                cardRepository.save(card);

        return new CardResponse(
        savedCard,
        getMonthlyUsed(savedCard)
);
    }

    // ==========================================
    // CHECK CARD SLOT AVAILABLE
    // ==========================================

    private void checkCardSlotAvailable(
            BankAccount bankAccount,
            CardType cardType,
            CardVariant cardVariant) {

        // --------------------------------------
        // GET ALL CARDS IN SAME SLOT
        // --------------------------------------
        //
        // Example:
        //
        // DEBIT + VIRTUAL
        //
        // Card 1 -> BLOCKED
        // Card 2 -> ACTIVE
        //
        // --------------------------------------

        List<Card> existingCards =
                cardRepository
                        .findByBankAccountAndCardTypeAndCardVariant(
                                bankAccount,
                                cardType,
                                cardVariant
                        );

        // --------------------------------------
        // NO EXISTING CARD
        // --------------------------------------

        if (existingCards.isEmpty()) {
            return;
        }

        // --------------------------------------
        // CHECK ALL EXISTING CARDS
        // --------------------------------------

        for (Card card : existingCards) {

            // ----------------------------------
            // AUTO EXPIRE
            // ----------------------------------

            if (isExpired(card)
                    && card.getStatus() != CardStatus.BLOCKED
                    && card.getStatus() != CardStatus.EXPIRED) {

                card.setStatus(
                        CardStatus.EXPIRED
                );

                cardRepository.save(card);
            }

            // ----------------------------------
            // ACTIVE
            // ----------------------------------
            //
            // ACTIVE card means duplicate.
            // ----------------------------------

            if (card.getStatus() == CardStatus.ACTIVE) {

                throw duplicateCardException(
                        cardType,
                        cardVariant
                );
            }

            // ----------------------------------
            // FROZEN
            // ----------------------------------
            //
            // FROZEN card is still owned/usable
            // after unfreeze.
            //
            // Therefore replacement is NOT allowed.
            // ----------------------------------

            if (card.getStatus() == CardStatus.FROZEN) {

                throw duplicateCardException(
                        cardType,
                        cardVariant
                );
            }

            // ----------------------------------
            // PENDING
            // ----------------------------------
            //
            // Pending card is already requested.
            // ----------------------------------

            if (card.getStatus() == CardStatus.PENDING) {

                throw duplicateCardException(
                        cardType,
                        cardVariant
                );
            }

            // ----------------------------------
            // BLOCKED
            // ----------------------------------
            //
            // Replacement is allowed.
            // ----------------------------------

            if (card.getStatus() == CardStatus.BLOCKED) {
                continue;
            }

            // ----------------------------------
            // EXPIRED
            // ----------------------------------
            //
            // Replacement is allowed.
            // ----------------------------------

            if (card.getStatus() == CardStatus.EXPIRED) {
                continue;
            }
        }
    }

    // ==========================================
    // DUPLICATE CARD EXCEPTION
    // ==========================================

    private DuplicateResourceException duplicateCardException(
            CardType cardType,
            CardVariant cardVariant) {

        String type =
                cardType == CardType.DEBIT
                        ? "debit"
                        : "credit";

        String variant =
                cardVariant == CardVariant.VIRTUAL
                        ? "virtual"
                        : "physical";

        return new DuplicateResourceException(
                "You already have a "
                        + variant
                        + " "
                        + type
                        + " card"
        );
    }

    // ==========================================
    // CHECK EXPIRY
    // ==========================================

    private boolean isExpired(Card card) {

        if (card.getExpiryDate() == null) {
            return false;
        }

        return card.getExpiryDate()
                .isBefore(LocalDate.now());
    }

    // ==========================================
    // FREEZE CARD
    // ==========================================

    @Transactional
    public CardResponse freezeCard(
            String email,
            Long cardId) {

        Card card =
                getUserCard(
                        email,
                        cardId
                );

        // --------------------------------------
        // AUTO EXPIRE
        // --------------------------------------

        if (isExpired(card)) {

            card.setStatus(
                    CardStatus.EXPIRED
            );

            cardRepository.save(card);

            throw new RuntimeException(
                    "Expired card cannot be frozen"
            );
        }

        // --------------------------------------
        // PENDING
        // --------------------------------------

        if (card.getStatus() == CardStatus.PENDING) {

            throw new RuntimeException(
                    "Pending card cannot be frozen"
            );
        }

        // --------------------------------------
        // BLOCKED
        // --------------------------------------

        if (card.getStatus() == CardStatus.BLOCKED) {

            throw new RuntimeException(
                    "Blocked card cannot be frozen"
            );
        }

        // --------------------------------------
        // ALREADY FROZEN
        // --------------------------------------

        if (card.getStatus() == CardStatus.FROZEN) {

            throw new RuntimeException(
                    "Card is already frozen"
            );
        }

        // --------------------------------------
        // FREEZE
        // --------------------------------------

        card.setStatus(
                CardStatus.FROZEN
        );

        Card savedCard =
                cardRepository.save(card);

        return new CardResponse(
        savedCard,
        getMonthlyUsed(savedCard)
);
    }

    // ==========================================
    // UNFREEZE CARD
    // ==========================================

    @Transactional
    public CardResponse unfreezeCard(
            String email,
            Long cardId) {

        Card card =
                getUserCard(
                        email,
                        cardId
                );

        // --------------------------------------
        // EXPIRED
        // --------------------------------------

        if (isExpired(card)) {

            card.setStatus(
                    CardStatus.EXPIRED
            );

            cardRepository.save(card);

            throw new RuntimeException(
                    "Expired card cannot be unfrozen"
            );
        }

        // --------------------------------------
        // ONLY FROZEN CARD CAN BE UNFROZEN
        // --------------------------------------

        if (card.getStatus() != CardStatus.FROZEN) {

            throw new RuntimeException(
                    "Card is not frozen"
            );
        }

        // --------------------------------------
        // UNFREEZE
        // --------------------------------------

        card.setStatus(
                CardStatus.ACTIVE
        );

        Card savedCard =
                cardRepository.save(card);

        return new CardResponse(
        savedCard,
        getMonthlyUsed(savedCard)
);
    }

    // ==========================================
    // BLOCK CARD
    // ==========================================

    @Transactional
    public Map<String, String> blockCard(
            Long cardId,
            String email) {

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );

        BankAccount bankAccount =
                bankAccountRepository
                        .findByUserAndPrimaryAccount(
                                user,
                                true
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Primary bank account not found"
                                )
                        );

        Card card =
                cardRepository
                        .findByIdAndBankAccount(
                                cardId,
                                bankAccount
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Card not found"
                                )
                        );

        // --------------------------------------
        // ALREADY BLOCKED
        // --------------------------------------

        if (card.getStatus() == CardStatus.BLOCKED) {

            throw new RuntimeException(
                    "Card is already blocked"
            );
        }

        // --------------------------------------
        // EXPIRED CARD
        // --------------------------------------

        if (isExpired(card)) {

            card.setStatus(
                    CardStatus.EXPIRED
            );

            cardRepository.save(card);

            throw new RuntimeException(
                    "Expired card cannot be blocked"
            );
        }

        // --------------------------------------
        // BLOCK
        // --------------------------------------

        card.setStatus(
                CardStatus.BLOCKED
        );

        cardRepository.save(card);

        return Map.of(
                "message",
                "Card blocked successfully",

                "cardId",
                String.valueOf(cardId),

                "status",
                "BLOCKED"
        );
    }

    // ==========================================
    // DELETE CARD
    // ==========================================

    @Transactional
    public void deleteCard(
            String email,
            Long cardId) {

        Card card =
                getUserCard(
                        email,
                        cardId
                );

        cardRepository.delete(card);
    }

    // ==========================================
    // UPDATE MONTHLY LIMIT
    // ==========================================

    @Transactional
    public CardResponse updateMonthlyLimit(
            String email,
            Long cardId,
            BigDecimal monthlyLimit) {

        if (monthlyLimit == null) {

            throw new RuntimeException(
                    "Monthly limit is required"
            );
        }

        if (monthlyLimit.compareTo(
                BigDecimal.ZERO
        ) <= 0) {

            throw new RuntimeException(
                    "Monthly limit must be greater than zero"
            );
        }

        Card card =
                getUserCard(
                        email,
                        cardId
                );

        validateEditableCard(card);

        card.setMonthlyLimit(
                monthlyLimit
        );

        Card savedCard =
                cardRepository.save(card);

        return new CardResponse(
        savedCard,
        getMonthlyUsed(savedCard)
);
    }

    // ==========================================
    // ONLINE PAYMENT
    // ==========================================

    @Transactional
    public CardResponse updateOnlinePayment(
            String email,
            Long cardId,
            boolean enabled) {

        Card card =
                getUserCard(
                        email,
                        cardId
                );

        validateEditableCard(card);

        card.setOnlineEnabled(
                enabled
        );

        Card savedCard =
                cardRepository.save(card);

        return new CardResponse(
        savedCard,
        getMonthlyUsed(savedCard)
);
    }

    // ==========================================
    // CONTACTLESS
    // ==========================================

    @Transactional
    public CardResponse updateContactless(
            String email,
            Long cardId,
            boolean enabled) {

        Card card =
                getUserCard(
                        email,
                        cardId
                );

        validateEditableCard(card);

        card.setContactlessEnabled(
                enabled
        );

        Card savedCard =
                cardRepository.save(card);

        return new CardResponse(
        savedCard,
        getMonthlyUsed(savedCard)
);
    }

    // ==========================================
    // INTERNATIONAL
    // ==========================================

    @Transactional
    public CardResponse updateInternational(
            String email,
            Long cardId,
            boolean enabled) {

        Card card =
                getUserCard(
                        email,
                        cardId
                );

        validateEditableCard(card);

        card.setInternationalEnabled(
                enabled
        );

        Card savedCard =
                cardRepository.save(card);

        return new CardResponse(
        savedCard,
        getMonthlyUsed(savedCard)
);
    }

    // ==========================================
    // ATM
    // ==========================================

    @Transactional
    public CardResponse updateAtm(
            String email,
            Long cardId,
            boolean enabled) {

        Card card =
                getUserCard(
                        email,
                        cardId
                );

        validateEditableCard(card);

        card.setAtmEnabled(
                enabled
        );

        Card savedCard =
                cardRepository.save(card);

       return new CardResponse(
        savedCard,
        getMonthlyUsed(savedCard)
);
    }

    // ==========================================
    // POS PAYMENTS
    // ==========================================

    @Transactional
    public CardResponse updatePos(
            String email,
            Long cardId,
            boolean enabled) {

        Card card =
                getUserCard(
                        email,
                        cardId
                );

        validateEditableCard(card);

        card.setPosEnabled(
                enabled
        );

        Card savedCard =
                cardRepository.save(card);

      return new CardResponse(
        savedCard,
        getMonthlyUsed(savedCard)
);
    }

    // ==========================================
    // SET CARD PIN
    // ==========================================

    @Transactional
    public CardResponse setCardPin(
            String email,
            Long cardId,
            SetCardPinRequest request) {

        if (request == null) {

            throw new RuntimeException(
                    "PIN request is required"
            );
        }

        String pin =
                request.getPin();

        String confirmPin =
                request.getConfirmPin();

        // --------------------------------------
        // VALIDATE PIN
        // --------------------------------------

        validatePinFormat(pin);

        // --------------------------------------
        // CONFIRM PIN
        // --------------------------------------

        if (!pin.equals(confirmPin)) {

            throw new RuntimeException(
                    "PIN and confirm PIN do not match"
            );
        }

        // --------------------------------------
        // GET CARD
        // --------------------------------------

        Card card =
                getUserCard(
                        email,
                        cardId
                );

        validatePinCard(card);

        // --------------------------------------
        // PIN ALREADY SET
        // --------------------------------------

        if (card.isPinSet()) {

            throw new RuntimeException(
                    "Card PIN is already set. Use Change PIN."
            );
        }

        // --------------------------------------
        // HASH PIN
        // --------------------------------------

        String pinHash =
                passwordEncoder.encode(pin);

        card.setPinHash(
                pinHash
        );

        card.setPinSet(
                true
        );

        // --------------------------------------
        // RESET FAILED ATTEMPTS
        // --------------------------------------

        card.setPinFailedAttempts(
                0
        );

        card.setPinLockedUntil(
                null
        );

        // --------------------------------------
        // SAVE
        // --------------------------------------

        Card savedCard =
                cardRepository.save(card);

       return new CardResponse(
        savedCard,
        getMonthlyUsed(savedCard)
);
    }

    // ==========================================
    // CHANGE CARD PIN
    // ==========================================

    @Transactional(noRollbackFor = RuntimeException.class)
    public CardResponse changeCardPin(
            String email,
            Long cardId,
            ChangeCardPinRequest request) {

        if (request == null) {

            throw new RuntimeException(
                    "PIN request is required"
            );
        }

        String currentPin =
                request.getCurrentPin();

        String newPin =
                request.getNewPin();

        String confirmNewPin =
                request.getConfirmNewPin();

        // --------------------------------------
        // VALIDATE PIN VALUES
        // --------------------------------------

        validatePinFormat(
                currentPin
        );

        validatePinFormat(
                newPin
        );

        validatePinFormat(
                confirmNewPin
        );

        // --------------------------------------
        // CONFIRM NEW PIN
        // --------------------------------------

        if (!newPin.equals(confirmNewPin)) {

            throw new RuntimeException(
                    "New PIN and confirm PIN do not match"
            );
        }

        // --------------------------------------
        // NEW PIN MUST DIFFER
        // --------------------------------------

        if (currentPin.equals(newPin)) {

            throw new RuntimeException(
                    "New PIN must be different from current PIN"
            );
        }

        // --------------------------------------
        // GET CARD
        // --------------------------------------

        Card card =
                getUserCard(
                        email,
                        cardId
                );

        validatePinCard(card);

        // --------------------------------------
        // PIN MUST EXIST
        // --------------------------------------

        if (!card.isPinSet()
                || card.getPinHash() == null) {

            throw new RuntimeException(
                    "Card PIN is not set. Use Set PIN first."
            );
        }

        // --------------------------------------
        // CHECK PIN LOCK
        // --------------------------------------

        checkPinLock(card);

        // --------------------------------------
        // VERIFY CURRENT PIN
        // --------------------------------------

        boolean currentPinCorrect =
                passwordEncoder.matches(
                        currentPin,
                        card.getPinHash()
                );

        if (!currentPinCorrect) {

            boolean lockedNow =
                    registerFailedPinAttempt(card);

            cardRepository.save(card);

            if (lockedNow) {

                throw new RuntimeException(
                        "Too many incorrect PIN attempts. PIN is locked for 15 minutes."
                );
            }

            throw new RuntimeException(
                    "Current PIN is incorrect"
            );
        }

        // --------------------------------------
        // CURRENT PIN CORRECT
        // --------------------------------------

        card.setPinHash(
                passwordEncoder.encode(newPin)
        );

        card.setPinFailedAttempts(
                0
        );

        card.setPinLockedUntil(
                null
        );

        card.setPinSet(
                true
        );

        Card savedCard =
                cardRepository.save(card);

        return new CardResponse(
        savedCard,
        getMonthlyUsed(savedCard)
);
    }

    // ==========================================
    // FORGOT CARD PIN
    // ==========================================

    @Transactional
    public CardResponse forgotCardPin(
            String email,
            Long cardId,
            ForgotCardPinRequest request) {

        // --------------------------------------
        // REQUEST VALIDATION
        // --------------------------------------

        if (request == null) {

            throw new RuntimeException(
                    "PIN reset request is required"
            );
        }

        String accountPassword =
                request.getAccountPassword();

        String newPin =
                request.getNewPin();

        String confirmPin =
                request.getConfirmPin();

        // --------------------------------------
        // ACCOUNT PASSWORD REQUIRED
        // --------------------------------------

        if (accountPassword == null
                || accountPassword.isBlank()) {

            throw new RuntimeException(
                    "Account password is required"
            );
        }

        // --------------------------------------
        // VALIDATE NEW PIN
        // --------------------------------------

        validatePinFormat(
                newPin
        );

        validatePinFormat(
                confirmPin
        );

        // --------------------------------------
        // CONFIRM NEW PIN
        // --------------------------------------

        if (!newPin.equals(confirmPin)) {

            throw new RuntimeException(
                    "New PIN and confirm PIN do not match"
            );
        }

        // --------------------------------------
        // GET USER
        // --------------------------------------

        User user =
                getUserByEmail(email);

        // --------------------------------------
        // VERIFY ACCOUNT PASSWORD
        // --------------------------------------

        if (!passwordEncoder.matches(
                accountPassword,
                user.getPassword()
        )) {

            throw new RuntimeException(
                    "Account password is incorrect"
            );
        }

        // --------------------------------------
        // GET CARD
        // --------------------------------------

        Card card =
                getUserCard(
                        email,
                        cardId
                );

        // --------------------------------------
        // VALIDATE CARD
        // --------------------------------------

        validatePinCard(card);

        // --------------------------------------
        // HASH NEW PIN
        // --------------------------------------

        card.setPinHash(
                passwordEncoder.encode(newPin)
        );

        card.setPinSet(
                true
        );

        // --------------------------------------
        // RESET FAILED ATTEMPTS
        // --------------------------------------

        card.setPinFailedAttempts(
                0
        );

        card.setPinLockedUntil(
                null
        );

        // --------------------------------------
        // SAVE
        // --------------------------------------

        Card savedCard =
                cardRepository.save(card);

        return new CardResponse(
        savedCard,
        getMonthlyUsed(savedCard)
);
    }

    // ==========================================
    // VALIDATE PIN FORMAT
    // ==========================================

    private void validatePinFormat(
            String pin) {

        if (pin == null) {

            throw new RuntimeException(
                    "PIN is required"
            );
        }

        // Exactly 4 digits
        //
        // 1234 -> valid
        // 0000 -> valid
        // 123  -> invalid
        // 12345 -> invalid
        // 12a4 -> invalid

        if (!pin.matches(
                "\\d{4}"
        )) {

            throw new RuntimeException(
                    "PIN must contain exactly 4 digits"
            );
        }
    }

    // ==========================================
    // VALIDATE CARD FOR PIN OPERATIONS
    // ==========================================

    private void validatePinCard(
            Card card) {

        // --------------------------------------
        // EXPIRED
        // --------------------------------------

        if (isExpired(card)) {

            card.setStatus(
                    CardStatus.EXPIRED
            );

            cardRepository.save(card);

            throw new RuntimeException(
                    "Expired card cannot use PIN"
            );
        }

        // --------------------------------------
        // BLOCKED
        // --------------------------------------

        if (card.getStatus()
                == CardStatus.BLOCKED) {

            throw new RuntimeException(
                    "Blocked card cannot use PIN"
            );
        }

        // --------------------------------------
        // PENDING
        // --------------------------------------

        if (card.getStatus()
                == CardStatus.PENDING) {

            throw new RuntimeException(
                    "Pending card cannot use PIN"
            );
        }
    }

    // ==========================================
    // CHECK PIN LOCK
    // ==========================================

    private void checkPinLock(
            Card card) {

        LocalDateTime lockedUntil =
                card.getPinLockedUntil();

        if (lockedUntil == null) {
            return;
        }

        // --------------------------------------
        // LOCK STILL ACTIVE
        // --------------------------------------

        if (LocalDateTime.now()
                .isBefore(lockedUntil)) {

            throw new RuntimeException(
                    "PIN is temporarily locked. Please try again later."
            );
        }

        // --------------------------------------
        // LOCK EXPIRED
        // --------------------------------------

        card.setPinLockedUntil(
                null
        );

        card.setPinFailedAttempts(
                0
        );

        cardRepository.save(card);
    }

    // ==========================================
    // REGISTER FAILED PIN ATTEMPT
    // ==========================================

    private boolean registerFailedPinAttempt(
            Card card) {

        int attempts =
                card.getPinFailedAttempts() + 1;

        card.setPinFailedAttempts(
                attempts
        );

        // --------------------------------------
        // 5 FAILED ATTEMPTS
        // --------------------------------------

        if (attempts >= 5) {

            card.setPinLockedUntil(
                    LocalDateTime.now()
                            .plusMinutes(15)
            );

            card.setPinFailedAttempts(
                    0
            );

            return true;
        }

        return false;
    }

    // ==========================================
    // VALIDATE EDITABLE CARD
    // ==========================================

    private void validateEditableCard(
            Card card) {

        // --------------------------------------
        // CHECK EXPIRY
        // --------------------------------------

        if (isExpired(card)) {

            card.setStatus(
                    CardStatus.EXPIRED
            );

            cardRepository.save(card);

            throw new RuntimeException(
                    "Expired card cannot be updated"
            );
        }

        // --------------------------------------
        // BLOCKED
        // --------------------------------------

        if (card.getStatus()
                == CardStatus.BLOCKED) {

            throw new RuntimeException(
                    "Blocked card cannot be updated"
            );
        }

        // --------------------------------------
        // PENDING
        // --------------------------------------

        if (card.getStatus()
                == CardStatus.PENDING) {

            throw new RuntimeException(
                    "Pending card cannot be updated"
            );
        }
    }

    // ==========================================
    // COMMON CARD CREATION
    // ==========================================

    private Card createBaseCard(
            User user,
            BankAccount bankAccount,
            CardType cardType,
            CardVariant variant) {

        Card card =
                new Card();

        // --------------------------------------
        // BANK ACCOUNT
        // --------------------------------------

        card.setBankAccount(
                bankAccount
        );

        // --------------------------------------
        // CARD TYPE
        // --------------------------------------

        card.setCardType(
                cardType
        );

        // --------------------------------------
        // CARD VARIANT
        // --------------------------------------

        card.setCardVariant(
                variant
        );

        // --------------------------------------
        // CARD NUMBER
        // --------------------------------------

        card.setCardNumber(
                generateUniqueCardNumber()
        );

        // --------------------------------------
        // CARD HOLDER
        // --------------------------------------

        card.setCardHolder(
                user.getFullName()
        );

        // --------------------------------------
        // EXPIRY
        // --------------------------------------

        card.setExpiryDate(
                LocalDate.now()
                        .plusYears(5)
        );

        // --------------------------------------
        // CVV
        // --------------------------------------

        card.setCvv(
                generateCVV()
        );

        // --------------------------------------
        // DEFAULT FEATURES
        // --------------------------------------

        card.setOnlineEnabled(
                true
        );

        card.setContactlessEnabled(
                true
        );

        card.setInternationalEnabled(
                false
        );

        card.setAtmEnabled(
                true
        );

        card.setPosEnabled(
                true
        );

        // --------------------------------------
        // PIN DEFAULT
        // --------------------------------------
        //
        // PIN is NOT generated here.
        // User will set 4-digit PIN later.
        // --------------------------------------

        card.setPinHash(
                null
        );

        card.setPinSet(
                false
        );

        card.setPinFailedAttempts(
                0
        );

        card.setPinLockedUntil(
                null
        );

        return card;
    }

    // ==========================================
    // GENERATE UNIQUE CARD NUMBER
    // ==========================================

    private String generateUniqueCardNumber() {

        String cardNumber;

        do {

            StringBuilder number =
                    new StringBuilder();

            for (int i = 0; i < 16; i++) {

                number.append(
                        ThreadLocalRandom.current()
                                .nextInt(0, 10)
                );
            }

            cardNumber =
                    number.toString();

        } while (
                cardRepository
                        .findByCardNumber(
                                cardNumber
                        )
                        .isPresent()
        );

        return cardNumber;
    }

    // ==========================================
    // GENERATE CVV
    // ==========================================

    private String generateCVV() {

        return String.valueOf(
                ThreadLocalRandom.current()
                        .nextInt(100, 1000)
        );
    }
}
