package com.example.CJL.dtos;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String email;
    private String senha;
}