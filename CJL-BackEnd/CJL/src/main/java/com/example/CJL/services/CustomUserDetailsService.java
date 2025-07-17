package com.example.CJL.services;

import com.example.CJL.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        com.example.CJL.entities.User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        var authorities = new java.util.ArrayList<>(user.getRoles()).stream()
                .map(role -> new SimpleGrantedAuthority(role.getNome()))
                .collect(Collectors.toList());

        return User.builder()
                .username(user.getEmail())
                .password(user.getSenha())
                .authorities(authorities)
                .build();
    }
}
