package com.example.CJL.dtos;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class UserRequestDTO {
    private String nome;
    private String sobrenome;
    private String apelido;
    private String cpf;
    private String cnpj;
    private boolean pj;
    private int diaNascimento;
    private int mesNascimento;
    private int anoNascimento;
    private String genero;
    private String cep;
    private String numeroResidencia;
    private String email;
    private String senha;
}