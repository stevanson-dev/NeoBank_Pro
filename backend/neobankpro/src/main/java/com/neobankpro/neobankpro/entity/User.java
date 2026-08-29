package com.neobankpro.neobankpro.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // USER DETAILS
    // ==========================================

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String mobile;

    @Column(nullable = false)
    private String password;

    @Column(nullable = true)
    private String address;

    // ==========================================
    // TRANSACTION PIN
    // ==========================================

    @Column(name = "transaction_pin")
    private String transactionPin;

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public User() {
    }

    public User(
            String fullName,
            String email,
            String mobile,
            String password) {

        this.fullName = fullName;
        this.email = email;
        this.mobile = mobile;
        this.password = password;
    }

    // ==========================================
    // ID
    // ==========================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // ==========================================
    // FULL NAME
    // ==========================================

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    // ==========================================
    // EMAIL
    // ==========================================

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // ==========================================
    // MOBILE
    // ==========================================

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    // ==========================================
    // PASSWORD
    // ==========================================

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // ==========================================
    // ADDRESS
    // ==========================================

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    // ==========================================
    // TRANSACTION PIN
    // ==========================================

    public String getTransactionPin() {
        return transactionPin;
    }

    public void setTransactionPin(String transactionPin) {
        this.transactionPin = transactionPin;
    }
}