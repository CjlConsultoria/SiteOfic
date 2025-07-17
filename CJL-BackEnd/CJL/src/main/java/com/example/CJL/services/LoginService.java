package com.example.CJL.services;

import ch.qos.logback.core.joran.conditional.IfAction;
import com.example.CJL.entities.User;
import com.example.CJL.repositories.UserRepository;
import com.example.CJL.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String LoginAuthentication(String email, String senha){
           User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
        if (user.getEmail().isEmpty()){
            return ("Usuário não encontrado");
        }

        if (bCryptPasswordEncoder.matches(senha, user.getSenha())){
            return jwtUtil.generateToken(email);

        } else {
            return "Usuário ou senha inválidos";
        }
    }
}
