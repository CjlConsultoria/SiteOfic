package com.example.CJL.dtos;

import lombok.Data;

@Data
public class WaitlistRequestDTO {
    private String nome;
    private String email;
    private String telefone;
    private String empresa;
    private String cnpj;
    private String cargo;
    private String segmento;
    private int quantidadeClientes;
    private String mensagem;
    private boolean pessoaJuridica;
}
