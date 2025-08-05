package com.example.CJL.controllers;

import com.example.CJL.entities.User;
import com.example.CJL.entities.VerificationToken;
import com.example.CJL.repositories.UserRepository;
import com.example.CJL.repositories.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class VerificationController {

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/confirm")
    public ResponseEntity<String> confirmarEmail(@RequestParam("token") String token) {
        Optional<VerificationToken> optionalToken = tokenRepository.findByToken(token);

        if (optionalToken.isEmpty()) {
            return ResponseEntity.badRequest().body("Token inválido.");
        }

        VerificationToken verificationToken = optionalToken.get();

        if (verificationToken.isExpired()) {
            return ResponseEntity.badRequest().body("Token expirado.");
        }

        User user = verificationToken.getUser();
        user.setEnabled(true);
        userRepository.save(user);

        tokenRepository.delete(verificationToken);

        return ResponseEntity.ok("E-mail confirmado com sucesso!");
    }
}
