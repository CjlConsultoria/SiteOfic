package com.example.CJL.services;

import com.example.CJL.entities.User;
import com.example.CJL.exception.ApiException;
import com.example.CJL.repositories.UserRepository;
import com.example.CJL.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String LoginAuthentication(String email, String senha) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException.NotFoundException("Usuário não encontrado"));

        if (!bCryptPasswordEncoder.matches(senha, user.getSenha())) {
            throw new ApiException.UnauthorizedException("Usuário ou senha inválidos");
        }

        return jwtUtil.generateToken(email);
    }
}