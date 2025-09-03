package com.example.CJL.dtos.request;

import lombok.Data;

@Data
public class UserRequestDTO {
    private String nome;
    private String sobrenome;
    private String apelido;
    private String telefone;
    private String cpf;
    private boolean pj;
    private int diaNascimento;
    private int mesNascimento;
    private int anoNascimento;
    private String genero;
    private String cidade;
    private String estado;
    private String cep;
    private String rua;
    private String bairro;
    private String numeroResidencia;
    private String complemento;
    private String email;
    private String senha;

}