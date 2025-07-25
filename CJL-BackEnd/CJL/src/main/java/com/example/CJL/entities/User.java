package com.example.CJL.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "tb_users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String sobrenome;
    private String apelido;
    private String cargo;
    private String telefone;
    @Column(unique = true)
    private String cpf;
    @Column(unique = true)
    private String cnpj;
    private boolean pj;
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
    private String complemento;
    private String bairro;
    private String cidade;
    private String estado;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "tb_user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )

    @ManyToOne
    @JoinColumn(name = "empresa_id")
    private Empresa empresa;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "tb_user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

}