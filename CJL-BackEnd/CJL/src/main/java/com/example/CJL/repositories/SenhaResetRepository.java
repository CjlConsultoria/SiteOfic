package com.example.CJL.repositories;

import com.example.CJL.entities.SenhaResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SenhaResetRepository extends JpaRepository<SenhaResetToken, Long> {
    Optional<SenhaResetToken> findByToken(String token);
}
