package com.example.CJL.controllers;

import com.example.CJL.dtos.JwtResponseDTO;
import com.example.CJL.dtos.LoginRequestDTO;
import com.example.CJL.dtos.UserRequestDTO;
import com.example.CJL.dtos.enums.RoleName;
import com.example.CJL.entities.Role;
import com.example.CJL.entities.User;
import com.example.CJL.repositories.RoleRepository;
import com.example.CJL.repositories.UserRepository;
import com.example.CJL.security.JwtUtil;
import com.example.CJL.services.LoginService;
import com.example.CJL.services.ViaCepService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")
@Tag(name = "Autenticação", description = "Endpoints de registro de usuários, login e geração de token JWT")
public class AuthController {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ViaCepService viaCepService;

    @Autowired
    private LoginService loginService;


    @Operation(summary = "Registrar novo usuário", description = "Cria um novo usuário com os dados fornecidos, incluindo endereço via CEP.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário registrado com sucesso"),
            @ApiResponse(responseCode = "400", description = "E-mail já utilizado"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody UserRequestDTO dto){
        if (userRepository.existsByEmail(dto.getEmail())){
            Map<String, String> errorResponse = Map.of("message", "Email já utilizado");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        if (dto.isPj()) {
            if (dto.getCnpj() != null && userRepository.existsByCnpj(dto.getCnpj())) {
                return ResponseEntity.badRequest().body(Map.of("message", "CNPJ já utilizado"));
            }
        } else {
            if (dto.getCpf() != null && userRepository.existsByCpf(dto.getCpf())) {
                return ResponseEntity.badRequest().body(Map.of("message", "CPF já utilizado"));
            }
        }

        User user = new User();
        user.setNome(dto.getNome());
        user.setSobrenome(dto.getSobrenome());
        user.setApelido(dto.getApelido());

        user.setPj(dto.isPj());

        if (dto.isPj()){
            user.setCnpj(dto.getCnpj());
            user.setCpf(null);
        } else {
            user.setCpf(dto.getCpf());
            user.setCnpj(null);
        }
        user.setDiaNascimento(dto.getDiaNascimento());
        user.setMesNascimento(dto.getMesNascimento());
        user.setAnoNascimento(dto.getAnoNascimento());
        user.setGenero(dto.getGenero());
        user.setCep(dto.getCep());
        user.setNumeroResidencia(dto.getNumeroResidencia());
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

        Map<String, String> response = Map.of("message", "Usuário registrado com sucesso");
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Realizar login",
            description = "Autentica o usuário e retorna um token JWT para uso em endpoints protegidos"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login bem-sucedido, token JWT retornado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = JwtResponseDTO.class,
                                    example = "{\"token\": \"eyJhbGciOiJIUzI1NiIsInR...\"}"))),
            @ApiResponse(responseCode = "401", description = "Credenciais inválidas",
                    content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor",
                    content = @Content(schema = @Schema(hidden = true)))
    })

    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody LoginRequestDTO dto){
        try {
            String token = loginService.LoginAuthentication(dto.getEmail(), dto.getSenha());
            return ResponseEntity.ok(new JwtResponseDTO(token));
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
        }
    }

    @Operation(
            summary = "Obter dados do usuário autenticado",
            description = "Retorna os dados do usuário logado com base no token JWT fornecido no header Authorization"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados do usuário retornados com sucesso",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(example = """
                {
                  "nome": "Henrique",
                  "email": "henrique@email.com",
                  "genero": "Masculino",
                  "cidade": "São Paulo",
                  "estado": "SP",
                  "cep": "01001-000"
                }
            """))),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado",
                    content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "401", description = "Token JWT ausente ou inválido",
                    content = @Content(schema = @Schema(hidden = true)))
    })

    @GetMapping("/dados")
    public ResponseEntity<?> getLoggerUser(@AuthenticationPrincipal UserDetails userDetails){
        String email = userDetails.getUsername();

        var user = userRepository.findByEmail(email);
        if (user.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }

        var dadosUser = user.get();
        Map<String, Object> response = new HashMap<>();
        response.put("nome", dadosUser.getNome());
        response.put("sobrenome", dadosUser.getSobrenome());
        if (dadosUser.getApelido()!= null && !dadosUser.getApelido().isBlank()){
            response.put("apelido",dadosUser.getApelido());
        }
        response.put("email",dadosUser.getEmail());
        response.put("genero",dadosUser.getGenero());
        response.put("cidade",dadosUser.getCidade());
        response.put("estado",dadosUser.getEstado());
        response.put("cep",dadosUser.getCep());

        if (dadosUser.isPj()){
            response.put("cnpj", dadosUser.getCnpj());
        } else {
            response.put("cpf", dadosUser.getCpf());
        }

        response.put("roles", dadosUser.getRoles().stream()
                .map(Role::getNome)
                .toList());

        return ResponseEntity.ok(response);
    }
}