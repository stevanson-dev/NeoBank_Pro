package com.neobankpro.neobankpro.repository;

import com.neobankpro.neobankpro.entity.BankAccount;
import com.neobankpro.neobankpro.entity.Card;
import com.neobankpro.neobankpro.entity.CardStatus;
import com.neobankpro.neobankpro.entity.CardType;
import com.neobankpro.neobankpro.entity.CardVariant;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {

    // ==========================================
    // GET ALL CARDS FOR BANK ACCOUNT
    // ==========================================

    List<Card> findByBankAccount(
            BankAccount bankAccount
    );

    // ==========================================
    // FIND BY CARD NUMBER
    // ==========================================

    Optional<Card> findByCardNumber(
            String cardNumber
    );

    // ==========================================
    // FIND CARD BY ID + BANK ACCOUNT
    // ==========================================

    Optional<Card> findByIdAndBankAccount(
            Long id,
            BankAccount bankAccount
    );

    // ==========================================
    // FIND ALL CARDS IN SPECIFIC CARD SLOT
    // ==========================================
    //
    // Same slot can have multiple historical cards:
    //
    // Old Card  -> BLOCKED
    // New Card  -> ACTIVE
    //
    // Example:
    // DEBIT + VIRTUAL
    //
    // ==========================================

    List<Card> findByBankAccountAndCardTypeAndCardVariant(
            BankAccount bankAccount,
            CardType cardType,
            CardVariant cardVariant
    );

    // ==========================================
    // FIND ACTIVE / FROZEN / PENDING CARDS
    // IN SPECIFIC CARD SLOT
    // ==========================================
    //
    // These statuses mean an active card already
    // exists and replacement should NOT be allowed.
    //
    // ==========================================

    List<Card>
    findByBankAccountAndCardTypeAndCardVariantAndStatusIn(
            BankAccount bankAccount,
            CardType cardType,
            CardVariant cardVariant,
            List<CardStatus> statuses
    );
}