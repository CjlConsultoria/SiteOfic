package com.example.CJL.controllers;

import com.example.CJL.dtos.response.DadosUserResponseDTO;
import com.example.CJL.dtos.request.UserRequestDTO;
import com.example.CJL.entities.User;
import com.example.CJL.repositories.UserRepository;
import com.example.CJL.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminService adminService;

    @GetMapping
    public List<DadosUserResponseDTO> listarTodos() {
        return userRepository.findAll().stream()
                .map(this::fromEntity)
                .toList();
    }

    private DadosUserResponseDTO fromEntity(User user) {
        return DadosUserResponseDTO.builder()
                .id(user.getId()) // ✅ agora o id vai para o front
                .nome(user.getNome())
                .sobrenome(user.getSobrenome())
                .apelido(user.getApelido())
                .email(user.getEmail())
                .genero(user.getGenero())
                .cidade(user.getCidade())
                .estado(user.getEstado())
                .cep(user.getCep())
                .logradouro(user.getLogradouro())
                .telefone(user.getTelefone())
                .bairro(user.getBairro())
                .cpf(user.getCpf())
                .cnpj(user.getEmpresa() != null ? user.getEmpresa().getCnpj() : null)
                .empresaId(user.getEmpresa() != null ? user.getEmpresa().getId() : null)
                .empresaNome(user.getEmpresa() != null ? user.getEmpresa().getNome() : null)
                .roles(user.getRoles().stream()
                        .map(role -> role.getNome().name())
                        .toList())
                .build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<DadosUserResponseDTO> atualizarUsuario(
            @PathVariable Long id,
            @RequestBody UserRequestDTO dto) {

        DadosUserResponseDTO atualizado = adminService.atualizarUsuario(id, dto);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletarUsuario(@PathVariable Long id) {
        adminService.deletarUsuario(id);
        return ResponseEntity.ok(Map.of("message", "Usuário removido com sucesso"));
    }

    @PutMapping("/{id}/telefone")
    public ResponseEntity<DadosUserResponseDTO> atualizarTelefone(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        String novoTelefone = body.get("telefone");

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        user.setTelefone(novoTelefone);
        userRepository.save(user);

        return ResponseEntity.ok(fromEntity(user));
    }

}
