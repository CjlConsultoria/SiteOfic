package com.example.CJL.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "tb_users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    @Column(unique = true)
    private String email;
    private String senha;
    private int diaNascimento;
    private int mesNascimento;
    private int anoNascimento;
    private String genero;

    private String cep;
    private String logradouro;
    private String numeroResidencia;
    private String bairro;
    private String cidade;
    private String estado;
}