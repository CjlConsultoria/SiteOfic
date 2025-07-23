package com.example.CJL.controllers;

import com.example.CJL.dtos.*;
import com.example.CJL.dtos.enums.RoleName;
import com.example.CJL.entities.Empresa;
import com.example.CJL.entities.Role;
import com.example.CJL.entities.User;
import com.example.CJL.repositories.EmpresaRepository;
import com.example.CJL.repositories.RoleRepository;
import com.example.CJL.repositories.UserRepository;
import com.example.CJL.security.JwtUtil;
import com.example.CJL.services.DadosUserService;
import com.example.CJL.services.LoginService;
import com.example.CJL.services.RegistroService;
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
    private EmpresaRepository empresaRepository;

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

    @Autowired
    private DadosUserService dadosUserService;

    @Autowired
    private RegistroService registroService;


    @Operation(summary = "Registrar novo usuário", description = "Cria um novo usuário com os dados fornecidos, incluindo endereço via CEP.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário registrado com sucesso"),
            @ApiResponse(responseCode = "400", description = "E-mail já utilizado"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegistroCompletoDTO registro) {
        Map<String, String> result = registroService.registrarUsuario(registro);

        if ("Email já utilizado".equals(result.get("message"))) {
            return ResponseEntity.badRequest().body(result);
        }

        return ResponseEntity.ok(result);
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
    public ResponseEntity<DadosUserResponseDTO> getLoggerUser(@AuthenticationPrincipal UserDetails userDetails) {
        var dto = dadosUserService.getDadosUsuario(userDetails);
        return ResponseEntity.ok(dto);
    }
}