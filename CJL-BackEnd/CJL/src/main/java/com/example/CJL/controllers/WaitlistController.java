package com.example.CJL.controllers;

import com.example.CJL.dtos.WaitlistRequestDTO;
import com.example.CJL.entities.WaitlistEntry;
import com.example.CJL.repositories.WaitlistRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/waitlist")
@Tag(name = "Waitlist", description = "Endpoints para gerenciamento da lista de espera")
public class WaitlistController {

    @Autowired
    private WaitlistRepository waitlistRepository;

    @Operation(summary = "Inscrever na lista de espera", description = "Cria uma nova entrada na lista de espera (público)")
    @PostMapping
    public ResponseEntity<?> create(@RequestBody WaitlistRequestDTO dto) {
        if (waitlistRepository.findByEmail(dto.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email já cadastrado na lista de espera"));
        }

        WaitlistEntry entry = new WaitlistEntry();
        entry.setNome(dto.getNome());
        entry.setEmail(dto.getEmail());
        entry.setTelefone(dto.getTelefone());
        entry.setEmpresa(dto.getEmpresa());
        entry.setCnpj(dto.getCnpj());
        entry.setCargo(dto.getCargo());
        entry.setSegmento(dto.getSegmento());
        entry.setQuantidadeClientes(dto.getQuantidadeClientes());
        entry.setMensagem(dto.getMensagem());
        entry.setPessoaJuridica(dto.isPessoaJuridica());

        waitlistRepository.save(entry);

        return ResponseEntity.ok(Map.of("message", "Inscrição realizada com sucesso"));
    }

    @Operation(summary = "Listar inscritos", description = "Retorna todos os inscritos ordenados por data de criação (requer autenticação)")
    @GetMapping
    public ResponseEntity<List<WaitlistEntry>> listAll() {
        List<WaitlistEntry> entries = waitlistRepository.findAll(Sort.by(Sort.Direction.DESC, "criadoEm"));
        return ResponseEntity.ok(entries);
    }

    @Operation(summary = "Atualizar status", description = "Atualiza o status de uma entrada na lista de espera (requer autenticação)")
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return waitlistRepository.findById(id)
                .map(entry -> {
                    entry.setStatus(body.get("status"));
                    waitlistRepository.save(entry);
                    return ResponseEntity.ok(Map.of("message", "Status atualizado com sucesso"));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Contagem de inscritos", description = "Retorna a quantidade total de inscritos na lista de espera (público)")
    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> count() {
        long total = waitlistRepository.count();
        return ResponseEntity.ok(Map.of("total", total));
    }

    @Operation(summary = "Remover inscrito", description = "Remove uma entrada da lista de espera (requer autenticação)")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!waitlistRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        waitlistRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Entrada removida com sucesso"));
    }
}
