package com.example.CJL.services;

import com.example.CJL.entities.SenhaResetToken;
import com.example.CJL.entities.User;
import com.example.CJL.repositories.SenhaResetRepository;
import com.example.CJL.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class SenhaResetService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SenhaResetRepository tokenRepository;

    @Autowired
    private EmailService emailService;

    @Value("${url.front}")
    private String urlFront;


    public void solicitarRedefinicaoSenha(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        String token = UUID.randomUUID().toString();

        SenhaResetToken resetToken = new SenhaResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(30));

        tokenRepository.save(resetToken);

        String link = urlFront + "/resetar-senha?token=" + token;
        System.out.println("Link de redefinição: " + link);

        emailService.enviarEmailRedefinicaoSenha(user.getEmail(),user.getNome(), link);
    }

    public void redefinirSenha(String token, String novaSenha) {
        SenhaResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token inválido"));

        if (resetToken.isExpired()) {
            throw new RuntimeException("Token expirado");
        }

        User user = resetToken.getUser();
        user.setSenha(passwordEncoder.encode(novaSenha));
        userRepository.save(user);

        tokenRepository.delete(resetToken);
    }
}
