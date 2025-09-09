package com.example.CJL.services;

import com.example.CJL.dtos.response.DadosUserResponseDTO;
import com.example.CJL.dtos.request.UserRequestDTO;
import com.example.CJL.entities.User;
import com.example.CJL.entities.Role;
import com.example.CJL.dtos.enums.RoleName;
import com.example.CJL.repositories.UserRepository;
import com.example.CJL.repositories.RoleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    // ===========================
    // Atualizar usuário
    // ===========================
    public DadosUserResponseDTO atualizarUsuario(Long id, UserRequestDTO dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        // Recupera email do usuário logado
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String emailLogado = auth != null ? auth.getName() : null;

        // Atualizar campos básicos
        if (dto.getNome() != null) user.setNome(dto.getNome());
        if (dto.getSobrenome() != null) user.setSobrenome(dto.getSobrenome());
        if (dto.getApelido() != null) user.setApelido(dto.getApelido());
        if (dto.getEmail() != null) user.setEmail(dto.getEmail());
        if (dto.getGenero() != null) user.setGenero(dto.getGenero());
        if (dto.getCidade() != null) user.setCidade(dto.getCidade());
        if (dto.getEstado() != null) user.setEstado(dto.getEstado());
        if (dto.getCep() != null) user.setCep(dto.getCep());
        if (dto.getTelefone() != null) user.setTelefone(dto.getTelefone());
        if (dto.getRua() != null) user.setLogradouro(dto.getRua());
        if (dto.getNumeroResidencia() != null) user.setNumeroResidencia(dto.getNumeroResidencia());
        if (dto.getBairro() != null) user.setBairro(dto.getBairro());
        if (dto.getCpf() != null) user.setCpf(dto.getCpf());

        // Atualizar roles somente se não for o usuário logado
        if (!user.getEmail().equals(emailLogado) && dto.getRoles() != null) {
            Set<Role> novasRoles = new HashSet<>();
            for (String roleStr : dto.getRoles()) {
                try {
                    RoleName roleEnum = RoleName.valueOf(roleStr);
                    Role role = roleRepository.findByNome(roleEnum)
                            .orElseThrow(() -> new RuntimeException("Role não encontrada: " + roleStr));
                    novasRoles.add(role);
                } catch (IllegalArgumentException e) {
                    throw new RuntimeException("Role inválida: " + roleStr);
                }
            }
            user.setRoles(novasRoles);
        }

        userRepository.save(user); // salva alterações no banco
        return toDTO(user);
    }

    // ===========================
    // Deletar usuário
    // ===========================
    public void deletarUsuario(Long id) {
        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException("Usuário não encontrado");
        }
        userRepository.deleteById(id);
    }

    // ===========================
    // Converter usuário para DTO
    // ===========================
    public DadosUserResponseDTO toDTO(User user) {
        return DadosUserResponseDTO.builder()
                .id(user.getId())
                .nome(user.getNome())
                .sobrenome(user.getSobrenome())
                .apelido(user.getApelido())
                .email(user.getEmail())
                .genero(user.getGenero())
                .cidade(user.getCidade())
                .estado(user.getEstado())
                .cep(user.getCep())
                .logradouro(user.getLogradouro())
                .numero(user.getNumeroResidencia())
                .bairro(user.getBairro())
                .cpf(user.getCpf())
                .telefone(user.getTelefone())
                .cnpj(user.getEmpresa() != null ? user.getEmpresa().getCnpj() : null)
                .empresaId(user.getEmpresa() != null ? user.getEmpresa().getId() : null)
                .empresaNome(user.getEmpresa() != null ? user.getEmpresa().getNome() : null)
                .roles(user.getRoles().stream()
                        .map(r -> r.getNome().name()) // enum -> string
                        .toList())
                .build();
    }
}
