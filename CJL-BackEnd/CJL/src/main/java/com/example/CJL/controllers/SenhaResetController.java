package com.example.CJL.controllers;

import com.example.CJL.dtos.request.NovaSenhaRequestDTO;
import com.example.CJL.dtos.request.SenhaResetRequestDTO;
import com.example.CJL.services.SenhaResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/auth")
public class SenhaResetController {

    @Autowired
    private SenhaResetService senhaResetService;

    @PostMapping("/solicitar-redefinicao")
    public ResponseEntity<String> solicitarRedefinicao(@RequestBody SenhaResetRequestDTO request) {
        senhaResetService.solicitarRedefinicaoSenha(request.email);
        return ResponseEntity.ok("Link de redefinição gerado (simulado).");
    }

    @PostMapping("/redefinir-senha")
    public ResponseEntity<String> redefinirSenha(@RequestBody NovaSenhaRequestDTO request) {
        senhaResetService.redefinirSenha(request.token, request.novaSenha);
        return ResponseEntity.ok("Senha redefinida com sucesso.");
    }
}