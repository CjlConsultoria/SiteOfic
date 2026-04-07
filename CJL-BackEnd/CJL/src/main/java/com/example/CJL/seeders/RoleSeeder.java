package com.example.CJL.seeders;

import com.example.CJL.dtos.enums.RoleName;
import com.example.CJL.entities.Role;
import com.example.CJL.entities.User;
import com.example.CJL.repositories.RoleRepository;
import com.example.CJL.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


@Component
public class RoleSeeder implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.count() == 0) {
            Role userRole = new Role();
            userRole.setNome(RoleName.ROLE_USER);
            roleRepository.save(userRole);

            Role adminRole = new Role();
            adminRole.setNome(RoleName.ROLE_ADMIN);
            roleRepository.save(adminRole);
        }

        // Create admin user if it doesn't exist
        if (!userRepository.existsByEmail("admin@cjlconsultoria.com")) {
            Role adminRole = roleRepository.findByNome(RoleName.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Role ADMIN não encontrada"));

            User admin = new User();
            admin.setEmail("admin@cjlconsultoria.com");
            admin.setSenha(passwordEncoder.encode("Cjl@2026"));
            admin.setNome("Admin");
            admin.setSobrenome("CJL");
            admin.getRoles().add(adminRole);

            userRepository.save(admin);
        }
    }
}

