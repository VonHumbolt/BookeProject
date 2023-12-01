package com.kaankaplan.booke.modals;

import org.springframework.data.elasticsearch.annotations.Document;

import java.util.ArrayList;
import java.util.List;

@Document(indexName = "registrable_user")
public class RegistrableUser extends User{

    public String email;
    private String password;
    public List<Post> posts;
    public Role role;

    public RegistrableUser(String fullName, String email, String password) {
        super(fullName);
        this.email = email;
        this.password = password;
    }

    public RegistrableUser(String fullName, String email, String password, Role role) {
        this(fullName, email, password);
        this.role = role;
        this.posts = new ArrayList<>();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}