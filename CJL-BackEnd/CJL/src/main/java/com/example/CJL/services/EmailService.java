package com.example.CJL.services;

import com.example.CJL.entities.User;
import com.example.CJL.entities.VerificationToken;
import com.example.CJL.repositories.VerificationTokenRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class EmailService {

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private JavaMailSender mailSender;


    @Value("${spring.mail.from}")
    private String from;

    @Value("${server.url}")
    private String serverUrl;


    public void enviarEmailConfirmacao(User user) {
        try {
            String token = UUID.randomUUID().toString();

            VerificationToken verificationToken = new VerificationToken();
            verificationToken.setToken(token);
            verificationToken.setUser(user);
            verificationToken.setExpiryDate(LocalDateTime.now().plusHours(24));
            tokenRepository.save(verificationToken);

            String link = serverUrl + "/api/auth/confirm?token=" + token;

            String assunto = "Confirme seu cadastro";
            String corpo = "Olá " + user.getNome() + ",\n\nClique no link para confirmar seu cadastro:\n" + link;

            SimpleMailMessage mensagem = new SimpleMailMessage();
            mensagem.setFrom(from);
            mensagem.setTo(user.getEmail());
            mensagem.setSubject(assunto);
            mensagem.setText(corpo);

            mailSender.send(mensagem);
            System.out.println("E-mail enviado para: " + user.getEmail());

        } catch (Exception e) {
            System.err.println("Erro ao enviar e-mail para: " + user.getEmail());
            e.printStackTrace();
        }
    }

    public void enviarEmailRedefinicaoSenha(String destino, String linkReset) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(destino);
            helper.setFrom(from);
            helper.setSubject("Redefinição de senha - CJL Consultoria");

            String corpo = "<p>Olá,</p>"
                    + "<p>Recebemos uma solicitação de redefinição de senha.</p>"
                    + "<p>Clique no link abaixo para redefinir sua senha:</p>"
                    + "<p><a href=\"" + linkReset + "\">Redefinir senha</a></p>"
                    + "<p>Se você não solicitou isso, ignore este e-mail.</p>";

            helper.setText(corpo, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Falha ao enviar e-mail: " + e.getMessage());
        }
    }

}
