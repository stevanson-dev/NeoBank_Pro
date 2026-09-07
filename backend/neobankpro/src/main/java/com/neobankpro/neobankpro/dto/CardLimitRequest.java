package com.neobankpro.neobankpro.dto;

import java.math.BigDecimal;

public class CardLimitRequest {

    private BigDecimal monthlyLimit;

    public CardLimitRequest() {
    }

    public BigDecimal getMonthlyLimit() {
        return monthlyLimit;
    }

    public void setMonthlyLimit(BigDecimal monthlyLimit) {
        this.monthlyLimit = monthlyLimit;
    }
}