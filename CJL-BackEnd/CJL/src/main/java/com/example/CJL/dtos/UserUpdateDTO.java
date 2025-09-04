package com.example.CJL.dtos;

import lombok.Data;
import java.util.Set;

@Data
public class UserUpdateDTO {
    private String nome;
    private String email;
    private Set<Long> roleIds;
    private Set<String> permissoes;
}
