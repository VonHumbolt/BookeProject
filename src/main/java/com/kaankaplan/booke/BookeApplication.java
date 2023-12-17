package com.kaankaplan.booke;

import com.kaankaplan.booke.business.abstracts.RoleService;
import com.kaankaplan.booke.business.concretes.RoleServiceImpl;
import com.kaankaplan.booke.modals.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@SpringBootApplication
@RequiredArgsConstructor
public class BookeApplication implements CommandLineRunner {

    private final RoleService roleService;
    public static void main(String[] args) {
        SpringApplication.run(BookeApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        Role role = roleService.getRoleByName("READER").getData();
        if(role == null)
            roleService.addNewRole("READER");
    }

}
