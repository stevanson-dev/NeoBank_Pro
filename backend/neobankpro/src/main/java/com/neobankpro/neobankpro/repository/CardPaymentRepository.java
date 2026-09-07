package com.neobankpro.neobankpro.repository;

import com.neobankpro.neobankpro.entity.Card;
import com.neobankpro.neobankpro.entity.CardPayment;
import com.neobankpro.neobankpro.entity.CardPaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface CardPaymentRepository
        extends JpaRepository<CardPayment, Long> {

    List<CardPayment> findByCardOrderByCreatedAtDesc(Card card);

    @Query("""
        SELECT COALESCE(SUM(cp.amount), 0)
        FROM CardPayment cp
        WHERE cp.card = :card
        AND cp.status = :status
        AND cp.createdAt >= :start
        AND cp.createdAt < :end
    """)
    BigDecimal getTotalAmount(
            @Param("card") Card card,
            @Param("status") CardPaymentStatus status,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
}