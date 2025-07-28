package com.example.CJL.services;

import com.example.CJL.dtos.response.ViaCepResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ViaCepService {
    private final String URL = "https://viacep.com.br/ws/{cep}/json/";

    public ViaCepResponse buscarEnderecoPorCep(String cep){
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(URL, ViaCepResponse.class, cep);
    }
}