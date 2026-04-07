package com.example.CJL.repositories;

import com.example.CJL.entities.WaitlistEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WaitlistRepository extends JpaRepository<WaitlistEntry, Long> {
    Optional<WaitlistEntry> findByEmail(String email);
}
