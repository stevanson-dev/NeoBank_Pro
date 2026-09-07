package com.neobankpro.neobankpro.service;

import com.neobankpro.neobankpro.repository.TransactionRepository;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class TransactionIdGenerator {

    private static final String CHARACTERS =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    private static final int CODE_LENGTH = 7;

    private final SecureRandom random = new SecureRandom();

    private final TransactionRepository transactionRepository;

    public TransactionIdGenerator(
            TransactionRepository transactionRepository) {

        this.transactionRepository = transactionRepository;
    }

    public String generate(String type) {

        String prefix = getPrefix(type);

        String transactionId;

        do {

            StringBuilder code =
                    new StringBuilder(CODE_LENGTH);

            for (int i = 0; i < CODE_LENGTH; i++) {

                int index =
                        random.nextInt(
                                CHARACTERS.length()
                        );

                code.append(
                        CHARACTERS.charAt(index)
                );
            }

            transactionId =
                    prefix + "-" + code;

        } while (
                transactionRepository
                        .existsByTransactionId(transactionId)
        );

        return transactionId;
    }

    private String getPrefix(String type) {

        return switch (type.toUpperCase()) {

            case "TRANSFER" ->
                    "TRF";

            case "DEPOSIT" ->
                    "DEP";

            case "WITHDRAW",
                 "WITHDRAWAL" ->
                    "WDL";

            case "BILL_PAYMENT" ->
                    "BIL";

            case "QR_PAYMENT" ->
                    "QR";

            case "CARD_PAYMENT" ->
                    "CRD";

            default ->
                    "TXN";
        };
    }
}