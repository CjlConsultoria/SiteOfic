package com.example.CJL.services;

import com.example.CJL.dtos.EmpresaRequestDTO;
import com.example.CJL.dtos.RegistroCompletoDTO;
import com.example.CJL.dtos.UserRequestDTO;
import com.example.CJL.dtos.enums.RoleName;
import com.example.CJL.entities.Empresa;
import com.example.CJL.entities.Role;
import com.example.CJL.entities.User;
import com.example.CJL.repositories.EmpresaRepository;
import com.example.CJL.repositories.RoleRepository;
import com.example.CJL.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class RegistroService {

    private final UserRepository userRepository;
    private final EmpresaRepository empresaRepository;
    private final RoleRepository roleRepository;
    private final ViaCepService viaCepService;
    private final PasswordEncoder passwordEncoder;

    public Map<String, String> registrarUsuario(RegistroCompletoDTO registro) {

        UserRequestDTO dto = registro.getUser();
        String email = dto.getEmail();
        EmpresaRequestDTO empresaDto = registro.getEmpresa();

        if (userRepository.existsByEmail(dto.getEmail())) {
            return Map.of("message", "Email já utilizado");
        }

        User user = new User();
        user.setNome(dto.getNome());
        user.setSobrenome(dto.getSobrenome());
        user.setApelido(dto.getApelido());
        user.setCargo(dto.getCargo());
        user.setTelefone(dto.getTelefone());
        user.setPj(dto.isPj());

        if (dto.isPj()) {
            Empresa empresa = empresaRepository.findByCnpj(empresaDto.getCnpj())
                    .orElseGet(() -> {
                        Empresa nova = new Empresa();
                        nova.setCnpj(empresaDto.getCnpj());
                        nova.setNome(empresaDto.getNome());
                        return empresaRepository.save(nova);
                    });
            user.setEmpresa(empresa);
        } else {
            user.setEmpresa(null);
        }

        user.setCpf(dto.getCpf());
        user.setDiaNascimento(dto.getDiaNascimento());
        user.setMesNascimento(dto.getMesNascimento());
        user.setAnoNascimento(dto.getAnoNascimento());
        user.setGenero(dto.getGenero());
        user.setCep(dto.getCep());
        user.setNumeroResidencia(dto.getNumeroResidencia());
        user.setComplemento(dto.getComplemento());
        user.setEmail(dto.getEmail());
        user.setSenha(passwordEncoder.encode(dto.getSenha()));

        var endereco = viaCepService.buscarEnderecoPorCep(dto.getCep());
        user.setLogradouro(endereco.getLogradouro());
        user.setBairro(endereco.getBairro());
        user.setCidade(endereco.getLocalidade());
        user.setEstado(endereco.getUf());

        Role defaultRole = roleRepository.findByNome(RoleName.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Role não encontrada"));
        user.getRoles().add(defaultRole);

        userRepository.save(user);

        return Map.of("message", "Usuário registrado com sucesso");
    }
}