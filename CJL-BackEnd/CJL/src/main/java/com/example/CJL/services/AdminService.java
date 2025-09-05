package com.example.CJL.services;

import com.example.CJL.dtos.response.DadosUserResponseDTO;
import com.example.CJL.dtos.request.UserRequestDTO;
import com.example.CJL.entities.User;
import com.example.CJL.entities.Role;
import com.example.CJL.repositories.UserRepository;
import com.example.CJL.repositories.RoleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

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
        user.setCpf(dto.getCpf()); // CPF agora é atualizado corretamente

        // Atualizar roles
        if (dto.getRoleIds() != null && !dto.getRoleIds().isEmpty()) {
            Set<Role> novasRoles = new HashSet<>();
            for (Long roleId : dto.getRoleIds()) {
                Role role = roleRepository.findById(roleId)
                        .orElseThrow(() -> new EntityNotFoundException("Role não encontrada: " + roleId));
                novasRoles.add(role);
            }
            user.setRoles(novasRoles);
        }

        userRepository.save(user);
        return toDTO(user);
    }

    public void deletarUsuario(Long id) {
        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException("Usuário não encontrado");
        }
        userRepository.deleteById(id);
    }

    private DadosUserResponseDTO toDTO(User user) {
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
                .numero(user.getNumeroResidencia())
                .bairro(user.getBairro())
                .cpf(user.getCpf())
                .telefone(user.getTelefone())
                .cnpj(user.getEmpresa() != null ? user.getEmpresa().getCnpj() : null)
                .empresaId(user.getEmpresa() != null ? user.getEmpresa().getId() : null)
                .empresaNome(user.getEmpresa() != null ? user.getEmpresa().getNome() : null)
                .roles(user.getRoles().stream()
                        .map(role -> role.getNome().name())
                        .toList())
                .build();
    }
}
