package com.example.CJL.dtos;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class UserRequestDTO {
    private String nome;
    private String sobrenome;
    private String apelido;
<<<<<<< HEAD
=======
    private String cpf;
    private String cnpj;
    private boolean pj;
>>>>>>> 9536e66505dbe8f278e3f92786643be36e87df25
    private int diaNascimento;
    private int mesNascimento;
    private int anoNascimento;
    private String genero;
    private String cep;
    private String numeroResidencia;
    private String email;
    private String senha;
}