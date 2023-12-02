package com.kaankaplan.booke.modals;

import lombok.ToString;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@ToString
@Document(indexName = "registrable_user")
public class RegistrableUser extends User{

    public String email;
    private String password;
    @Field(name="isActive", type= FieldType.Boolean)
    public boolean isActive;
    public Role role;

    public RegistrableUser(String fullName, String email, String password) {
        super(fullName);
        this.email = email;
        this.password = password;
    }

    public RegistrableUser(String fullName, String email, String password, Role role) {
        this(fullName, email, password);
        this.isActive = true;
        this.role = role;
    }

    public RegistrableUser() { }

    public String getPassword() {
        return password;
    }
}
