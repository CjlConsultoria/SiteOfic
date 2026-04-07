package com.example.CJL.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "tb_waitlist")
public class WaitlistEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(unique = true)
    private String email;

    private String telefone;

    private String empresa;

    private String cnpj;

    private String cargo;

    private String segmento;

    private int quantidadeClientes;

    @Column(columnDefinition = "TEXT")
    private String mensagem;

    private boolean pessoaJuridica;

    private LocalDateTime criadoEm;

    private String status;

    @PrePersist
    public void prePersist() {
        this.criadoEm = LocalDateTime.now();
        if (this.status == null) {
            this.status = "PENDENTE";
        }
    }
}
