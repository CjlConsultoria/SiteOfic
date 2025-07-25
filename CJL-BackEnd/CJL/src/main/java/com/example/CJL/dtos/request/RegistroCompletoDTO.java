package com.example.CJL.dtos.request;

import lombok.Data;

@Data
public class RegistroCompletoDTO {
    private UserRequestDTO user;
    private EmpresaRequestDTO empresa;
}
