package com.example.CJL.controllers;

import com.example.CJL.entities.User;
import com.example.CJL.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/usuarios")
public class UsuarioController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> listarTodos(){return userRepository.findAll();
    }
}
