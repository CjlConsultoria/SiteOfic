package com.example.CJL.repositories;

import com.example.CJL.dtos.enums.RoleName;
import com.example.CJL.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByNome(RoleName nome);
}
