package com.example.CJL.dtos.enums;

public enum RoleName {
    ROLE_ADMIN,
    ROLE_USER,
    ROLE_MANAGER;

    public static RoleName getByNome(String nome) {
        for (RoleName role : values()) {
            if (role.name().equalsIgnoreCase(nome)) {
                return role;
            }
        }
        throw new IllegalArgumentException("Role inválida: " + nome);
    }
}
