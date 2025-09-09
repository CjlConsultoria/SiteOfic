package com.example.CJL.security;

import com.example.CJL.entities.Role;
import com.example.CJL.dtos.enums.RoleName;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Implementação do UserDetails para integração com Spring Security.
 * Converte roles do tipo Role (com enum RoleName) em GrantedAuthority.
 */
@AllArgsConstructor
public class UserDetailsImpl implements UserDetails {

    private final String email;
    private final String senha;
    private final Set<Role> roles;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Converte cada Role para GrantedAuthority usando o nome do enum RoleName
        return roles.stream()
                .map(role -> {
                    RoleName roleEnum = role.getNome();
                    // Caso roleEnum seja nulo, fallback para ROLE_USER
                    if (roleEnum == null) {
                        roleEnum = RoleName.ROLE_USER;
                    }
                    return new SimpleGrantedAuthority(roleEnum.name());
                })
                .collect(Collectors.toSet());
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        // Sempre válido, pode implementar lógica se quiser
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // Sempre desbloqueado, pode implementar lógica se quiser
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // Sempre válido, pode implementar lógica se quiser
        return true;
    }

    @Override
    public boolean isEnabled() {
        // Sempre habilitado, pode implementar lógica se quiser
        return true;
    }
}
