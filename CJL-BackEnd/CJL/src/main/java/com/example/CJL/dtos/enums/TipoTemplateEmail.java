package com.example.CJL.dtos.enums;

public enum TipoTemplateEmail {
    ESQUECEU_SENHA("Recuperação de Senha", "esqueceu-senha"),
    BEM_VINDO("Bem-vindo", "bem-vindo"),
    CONFIRMACAO_CADASTRO("Confirmação de Cadastro", "confirmacao-cadastro");

    private final String titulo;
    private final String templateNome;

    TipoTemplateEmail(String titulo, String templateNome) {
        this.titulo = titulo;
        this.templateNome = templateNome;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getTemplateNome() {
        return templateNome;
    }
}

