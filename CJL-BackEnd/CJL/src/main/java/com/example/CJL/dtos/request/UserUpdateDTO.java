package com.example.CJL.dtos;

import lombok.Data;
import java.time.LocalDate;
import java.util.Set;

@Data
public class UserUpdateDTO {
    // ===========================
    // Informações pessoais
    // ===========================
    private String nome;
    private String sobrenome;
    private String apelido;
    private String cpf;
    private String cnpj; // Apenas para PJ
    private String nomeEmpresa; // Apenas para PJ
    private LocalDate dataNascimento;
    private String genero;
    private Boolean ehPessoaJuridica;

    // ===========================
    // Contato
    // ===========================
    private String email;
    private String telefone;
    private String senha;

    // ===========================
    // Endereço
    // ===========================
    private String cep;
    private String logradouro;
    private String complemento;
    private String numero;
    private String bairro;
    private String cidade;
    private String estado;

    // ===========================
    // Roles e permissões
    // ===========================
    private Set<Long> roleIds;        // IDs das roles (ex.: ROLE_ADMIN, ROLE_USER)
    private Set<String> permissoes;   // Permissões adicionais (ex.: GERENCIAR_USUARIOS)
}
