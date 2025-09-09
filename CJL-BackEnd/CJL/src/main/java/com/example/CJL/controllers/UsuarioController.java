package com.example.CJL.controllers;

import com.example.CJL.dtos.response.DadosUserResponseDTO;
import com.example.CJL.dtos.request.UserRequestDTO;
import com.example.CJL.entities.User;
import com.example.CJL.repositories.UserRepository;
import com.example.CJL.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminService adminService;

    // ===========================
    // Listar todos os usuários
    // ===========================
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<DadosUserResponseDTO> listarTodos() {
        return userRepository.findAll().stream()
                .map(adminService::toDTO)
                .toList();
    }

    // ===========================
    // Atualizar usuário (admin)
    // ===========================
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DadosUserResponseDTO> atualizarUsuario(
            @PathVariable Long id,
            @RequestBody UserRequestDTO dto) {

        try {
            DadosUserResponseDTO atualizado = adminService.atualizarUsuario(id, dto);
            return ResponseEntity.ok(atualizado);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // ===========================
    // Deletar usuário (admin)
    // ===========================
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> deletarUsuario(@PathVariable Long id) {
        try {
            adminService.deletarUsuario(id);
            return ResponseEntity.ok(Map.of("message", "Usuário removido com sucesso"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // ===========================
    // Atualizar telefone (admin ou próprio usuário)
    // ===========================
    @PutMapping("/{id}/telefone")
    @PreAuthorize("hasRole('ADMIN') or #id == principal.id")
    public ResponseEntity<DadosUserResponseDTO> atualizarTelefone(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        try {
            String novoTelefone = body.get("telefone");
            if (novoTelefone == null || novoTelefone.isBlank()) {
                return ResponseEntity.badRequest().build();
            }

            User user = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            user.setTelefone(novoTelefone);
            userRepository.save(user);

            return ResponseEntity.ok(adminService.toDTO(user));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
