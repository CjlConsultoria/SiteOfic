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

        // Atualizar campos básicos
        user.setNome(dto.getNome());
        user.setSobrenome(dto.getSobrenome());
        user.setApelido(dto.getApelido());
        user.setEmail(dto.getEmail());
        user.setGenero(dto.getGenero());
        user.setCidade(dto.getCidade());
        user.setEstado(dto.getEstado());
        user.setCep(dto.getCep());
        user.setTelefone(dto.getTelefone());
        user.setLogradouro(dto.getRua());
        user.setNumeroResidencia(dto.getNumeroResidencia());
        user.setBairro(dto.getBairro());
        user.setCpf(dto.getCpf());

        // Atualizar roles recebendo lista de strings do frontend
        if (dto.getRoles() != null && !dto.getRoles().isEmpty()) {
            Set<Role> novasRoles = new HashSet<>();
            for (String roleStr : dto.getRoles()) {
                RoleName roleEnum;
                try {
                    roleEnum = RoleName.valueOf(roleStr); // converte string para enum
                } catch (IllegalArgumentException e) {
                    throw new RuntimeException("Role inválida: " + roleStr);
                }

                Role role = roleRepository.findByNome(roleEnum)
                        .orElseThrow(() -> new RuntimeException("Role não encontrada: " + roleStr));

                novasRoles.add(role);
            }
            user.setRoles(novasRoles);
        }

        userRepository.save(user);
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
    public DadosUserResponseDTO toDTO(User user) { // <-- TORNEI PÚBLICO
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
