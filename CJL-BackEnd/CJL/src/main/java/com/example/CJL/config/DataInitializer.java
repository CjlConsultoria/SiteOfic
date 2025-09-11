package com.example.CJL.config;

import com.example.CJL.entities.Role;
import com.example.CJL.entities.User;
import com.example.CJL.repositories.RoleRepository;
import com.example.CJL.repositories.UserRepository;
import com.example.CJL.dtos.enums.RoleName;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner init(UserRepository userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder) {
        return args -> {

            // ==============================
            // Criar roles se não existirem
            // ==============================
            if (roleRepository.count() == 0) {
                Role userRole = new Role();
                userRole.setNome(RoleName.ROLE_USER);
                roleRepository.save(userRole);

                Role adminRole = new Role();
                adminRole.setNome(RoleName.ROLE_ADMIN);
                roleRepository.save(adminRole);
            }

            // ==============================
            // Criar usuários de teste se não existirem
            // ==============================
            if (userRepository.count() == 0) {

                Role roleUser = roleRepository.findByNome(RoleName.ROLE_USER).get();
                Role roleAdmin = roleRepository.findByNome(RoleName.ROLE_ADMIN).get();

                User u1 = new User();
                u1.setNome("Maria");
                u1.setSobrenome("Eduarda");
                u1.setEmail("maria@teste.com");
                u1.setSenha(passwordEncoder.encode("A1"));
                u1.setCpf("12345678901");
                u1.setTelefone("11999990001");
                u1.setRoles(Set.of(roleUser, roleAdmin));
                userRepository.save(u1);

                User u2 = new User();
                u2.setNome("Carlos");
                u2.setSobrenome("Daniel");
                u2.setEmail("carlos@teste.com");
                u2.setSenha(passwordEncoder.encode("A1"));
                u2.setCpf("23456789012");
                u2.setTelefone("11999990002");
                u2.setRoles(Set.of(roleUser));
                userRepository.save(u2);

                User u3 = new User();
                u3.setNome("Ana");
                u3.setSobrenome("Silva");
                u3.setEmail("ana@teste.com");
                u3.setSenha(passwordEncoder.encode("A1"));
                u3.setCpf("34567890123");
                u3.setTelefone("11999990003");
                u3.setRoles(Set.of(roleUser));
                userRepository.save(u3);

                User u4 = new User();
                u4.setNome("Pedro");
                u4.setSobrenome("Oliveira");
                u4.setEmail("pedro@teste.com");
                u4.setSenha(passwordEncoder.encode("A1"));
                u4.setCpf("45678901234");
                u4.setTelefone("11999990004");
                u4.setRoles(Set.of(roleUser));
                userRepository.save(u4);

                User u5 = new User();
                u5.setNome("Julia");
                u5.setSobrenome("Costa");
                u5.setEmail("julia@teste.com");
                u5.setSenha(passwordEncoder.encode("A1"));
                u5.setCpf("56789012345");
                u5.setTelefone("11999990005");
                u5.setRoles(Set.of(roleUser));
                userRepository.save(u5);

                System.out.println("[DEBUG] 5 usuários de teste criados com CPF e telefone!");
            }
        };
    }
}
