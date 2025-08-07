package com.example.CJL.services;

import com.example.CJL.dtos.response.DadosUserResponseDTO;
import com.example.CJL.entities.Empresa;
import com.example.CJL.exception.ApiException;
import com.example.CJL.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DadosUserService {

    private final UserRepository userRepository;

    public DadosUserResponseDTO getDadosUsuario(UserDetails userDetails) {
        String email = userDetails.getUsername();

        var optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new ApiException.NotFoundException("Usuário não encontrado");
        }

        var dadosUser = optionalUser.get();
        DadosUserResponseDTO.DadosUserResponseDTOBuilder builder = DadosUserResponseDTO.builder()
                .nome(dadosUser.getNome())
                .sobrenome(dadosUser.getSobrenome())
                .cpf(dadosUser.getCpf())
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
                .roles(dadosUser.getRoles().stream()
                        .map(role -> role.getNome().name())
                        .toList());

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

}
