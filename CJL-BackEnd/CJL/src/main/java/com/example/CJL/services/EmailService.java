package com.example.CJL.services;

import com.example.CJL.entities.User;
import com.example.CJL.entities.VerificationToken;
import com.example.CJL.repositories.VerificationTokenRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Service
public class EmailService {

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Value("${spring.mail.from}")
    private String from;

    @Value("${server.url}")
    private String serverUrl;


    private void enviarEmail(String destino, String assunto, String template, Map<String, Object> variaveis) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            Context context = new Context();
            context.setVariables(variaveis);

            String html = templateEngine.process(template, context);

            helper.setTo(destino);
            helper.setFrom(from);
            helper.setSubject(assunto);
            helper.setText(html, true);

            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Falha ao enviar e-mail: " + e.getMessage(), e);
        }
    }
    public void enviarEmailConfirmacao(User user) {
        String token = UUID.randomUUID().toString();

        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationToken.setExpiryDate(LocalDateTime.now().plusHours(24));
        tokenRepository.save(verificationToken);

        String link = serverUrl + "/api/auth/confirm?token=" + token;

        enviarEmail(
                user.getEmail(),
                "Confirme seu cadastro - CJL",
                "confirmacao-cadastro",
                Map.of("usuario", user, "link", link)
        );
    }

    public void enviarEmailRedefinicaoSenha(String destino, String nome, String linkReset) {
        enviarEmail(
                destino,
                "Redefinição de senha - CJL Consultoria",
                "redefinicao-senha",
                Map.of("nome", nome, "link", linkReset)
        );
    }

    public void enviarEmailComTemplate(String destino, String assunto, String template, Map<String, Object> variaveis) {
        enviarEmail(destino, assunto, template, variaveis);
    }
}