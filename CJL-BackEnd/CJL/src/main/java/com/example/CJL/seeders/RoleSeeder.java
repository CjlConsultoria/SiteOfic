package com.example.CJL.seeders;

import com.example.CJL.dtos.enums.RoleName;
import com.example.CJL.entities.Role;
import com.example.CJL.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class RoleSeeder implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

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
    }
}