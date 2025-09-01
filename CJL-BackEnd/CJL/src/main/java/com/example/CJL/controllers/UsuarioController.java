package com.example.CJL.controllers;

import com.example.CJL.dtos.request.TelefoneUpdateRequestDTO;
import com.example.CJL.dtos.response.DadosUserResponseDTO;
import com.example.CJL.dtos.request.UserRequestDTO;
import com.example.CJL.entities.User;
import com.example.CJL.repositories.UserRepository;
import com.example.CJL.services.AdminService;
import com.example.CJL.services.DadosUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DadosUserService dadosUserService;

    @Autowired
    private AdminService adminService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<DadosUserResponseDTO> listarTodos() {
        return userRepository.findAll().stream()
                .map(this::fromEntity)
                .toList();
    }

    private DadosUserResponseDTO fromEntity(User user) {
        return DadosUserResponseDTO.builder()
                .nome(user.getNome())
                .sobrenome(user.getSobrenome())
                .apelido(user.getApelido())
                .email(user.getEmail())
                .genero(user.getGenero())
                .cidade(user.getCidade())
                .estado(user.getEstado())
                .cep(user.getCep())
                .logradouro(user.getLogradouro())
                .numero(user.getTelefone())
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
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DadosUserResponseDTO> atualizarUsuario(
            @PathVariable Long id,
            @RequestBody UserRequestDTO dto) {

        DadosUserResponseDTO atualizado = adminService.atualizarUsuario(id, dto);
        return ResponseEntity.ok(atualizado);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> deletarUsuario(@PathVariable Long id) {
        adminService.deletarUsuario(id);
        return ResponseEntity.ok(Map.of("message", "Usuário removido com sucesso"));
    }


    @PutMapping("/atualizar-telefone")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<DadosUserResponseDTO> atualizarTelefone(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody TelefoneUpdateRequestDTO dto) {
        var usuarioAtualizado = dadosUserService.atualizarTelefone(userDetails, dto.getTelefone());
        return ResponseEntity.ok(usuarioAtualizado);
    }
}
