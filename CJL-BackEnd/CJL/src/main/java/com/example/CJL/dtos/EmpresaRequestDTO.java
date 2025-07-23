package com.example.CJL.dtos;

import jakarta.persistence.Id;
import lombok.Data;

@Data
public class EmpresaRequestDTO {
    private String nome;
    private String cnpj;
}