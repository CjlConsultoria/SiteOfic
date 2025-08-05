package com.example.CJL.services;

import com.example.CJL.entities.User;
import com.example.CJL.entities.VerificationToken;
import com.example.CJL.repositories.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class VerificationService {

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private JavaMailSender mailSender;


    @Value("${spring.mail.from}")
    private String from;

    @Value("${server.url}")
    private String serverUrl;


    public void enviarEmailConfirmacao(User user){
        String token = UUID.randomUUID().toString();

        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationToken.setExpiryDate(LocalDateTime.now().plusHours(24));
        tokenRepository.save(verificationToken);

        String link = serverUrl + "/convivium/api/auth/confirm?token=" + token;

        String assunto = "Confirme seu cadastro";
        String corpo = "Olá " + user.getNome() + ",\n\nClique no link para confirmar seu cadastro:\n" + link;

        SimpleMailMessage mensagem = new SimpleMailMessage();
        mensagem.setFrom(from);
        mensagem.setTo(user.getEmail());
        mensagem.setSubject(assunto);
        mensagem.setText(corpo);

        mailSender.send(mensagem);

    }
}
