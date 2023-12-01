package com.kaankaplan.booke.modals;

import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "admin")
public class Admin extends RegistrableUser{

    public Admin(String fullName, String email, String password) {
        super(fullName, email, password);
    }
}
