package com.example.CJL.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DadosUserResponseDTO {
    private String nome;
    private String sobrenome;
    private String apelido;
    private String email;
    private String genero;
    private String cidade;
    private String estado;
    private String cep;
    private String logradouro;
    private String complemento;
    private String numero;
    private String bairro;
    private String cpf;


    private String cnpj;
    private Long empresaId;
    private String empresaNome;

    private List<String> roles;
}
