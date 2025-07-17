package com.example.CJL.services;

import com.example.CJL.entities.User;
import com.example.CJL.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Buscar usuário no banco
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário com e-mail " + email + " não encontrado."));



        // Validar se possui roles
        if (user.getRoles() == null || user.getRoles().isEmpty()) {
            throw new InsufficientAuthenticationException("Usuário não possui permissões (roles) atribuídas.");
        }

        // Mapear as roles para authorities
        List<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getNome().name()))
                .collect(Collectors.toList());

        // Retornar o UserDetails com as authorities
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getSenha(),
                authorities
        );
    }
}
