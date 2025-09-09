package com.example.CJL.services;

import com.example.CJL.entities.User;
import com.example.CJL.repositories.UserRepository;
import com.example.CJL.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String LoginAuthentication(String email, String senha) {
        // Buscar usuário pelo email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        // Verificar senha
        if (!bCryptPasswordEncoder.matches(senha, user.getSenha())) {
            throw new UsernameNotFoundException("Usuário ou senha inválidos");
        }

        // Converter roles do usuário para lista de Strings
        List<String> rolesAsString = user.getRoles()
                .stream()
                .map(role -> role.getNome().name()) // role.getNome() retorna RoleName enum; .name() converte para String
                .toList();

        // Gerar token com email + roles
        return jwtUtil.generateToken(email, rolesAsString);
    }
}
