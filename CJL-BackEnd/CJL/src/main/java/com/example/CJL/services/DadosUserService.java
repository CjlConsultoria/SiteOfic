package com.example.CJL.services;

import com.example.CJL.dtos.response.DadosUserResponseDTO;
import com.example.CJL.entities.Empresa;
import com.example.CJL.entities.Role;
import com.example.CJL.entities.User;
import com.example.CJL.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DadosUserService {

    private final UserRepository userRepository;

    /**
     * Retorna os dados do usuário, incluindo roles corretas para o frontend
     */
    public DadosUserResponseDTO getDadosUsuario(UserDetails userDetails) {
        String email = userDetails.getUsername();

        User dadosUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        // Mapeia roles para strings exatas "ROLE_USER" ou "ROLE_ADMIN"
        List<String> roles = dadosUser.getRoles().stream()
                .map(Role::getNome)        // se Nome é enum, pega name()
                .map(Enum::name)
                .collect(Collectors.toList());

        DadosUserResponseDTO.DadosUserResponseDTOBuilder builder = DadosUserResponseDTO.builder()
                .nome(dadosUser.getNome())
                .sobrenome(dadosUser.getSobrenome())
                .apelido(dadosUser.getApelido())
                .email(dadosUser.getEmail())
                .genero(dadosUser.getGenero())
                .cidade(dadosUser.getCidade())
                .estado(dadosUser.getEstado())
                .cep(dadosUser.getCep())
                .logradouro(dadosUser.getLogradouro())
                .complemento(dadosUser.getComplemento())
                .numero(dadosUser.getNumeroResidencia())
                .bairro(dadosUser.getBairro())
                .telefone(dadosUser.getTelefone())
                .roles(roles);

        // Se for PJ, adiciona informações da empresa
        if (dadosUser.isPj()) {
            Empresa empresa = dadosUser.getEmpresa();
            builder.cnpj(empresa != null ? empresa.getCnpj() : null);
            builder.empresaId(empresa != null ? empresa.getId() : null);
            builder.empresaNome(empresa != null ? empresa.getNome() : null);
        } else {
            builder.cpf(dadosUser.getCpf());
        }

        return builder.build();
    }

    // ===========================
    // Atualizar telefone do usuário
    // ===========================
    public void atualizarTelefone(Long id, String telefone) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ID do usuário não encontrado"));
        user.setTelefone(telefone);
        userRepository.save(user);
    }

    // ===========================
    // Retornar roles como GrantedAuthority (para UserDetailsImpl / JWT)
    // ===========================
    public List<GrantedAuthority> getAuthorities(User user) {
        return user.getRoles().stream()
                .map(role -> (GrantedAuthority) () -> role.getNome().name()) // garante ROLE_ADMIN ou ROLE_USER
                .collect(Collectors.toList());
    }
}
