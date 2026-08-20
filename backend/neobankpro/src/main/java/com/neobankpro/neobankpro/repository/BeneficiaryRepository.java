package com.neobankpro.neobankpro.repository;

import com.neobankpro.neobankpro.entity.Beneficiary;
import com.neobankpro.neobankpro.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BeneficiaryRepository
        extends JpaRepository<Beneficiary, Long> {

    List<Beneficiary> findByUserOrderByCreatedAtDesc(User user);

    Beneficiary findByIdAndUser(Long id, User user);
}