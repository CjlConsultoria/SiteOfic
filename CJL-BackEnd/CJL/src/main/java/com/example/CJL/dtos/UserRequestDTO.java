package com.example.CJL.dtos;

import lombok.Data;

@Data
public class UserRequestDTO {
    private String nome;
    private int diaNascimento;
    private int mesNascimento;
    private int anoNascimento;
    private String genero;
    private String cep;
    private String numeroResidencia;
    private String email;
    private String senha;
}