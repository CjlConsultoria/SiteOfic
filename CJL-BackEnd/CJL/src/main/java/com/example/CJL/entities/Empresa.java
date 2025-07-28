package com.example.CJL.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tb_empresas")
@Data
public class Empresa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String cnpj;
}
