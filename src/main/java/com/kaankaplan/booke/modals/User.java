package com.kaankaplan.booke.modals;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "user")
public class User {

    @Id
    private String userId;
    @Field(name = "fullName", type = FieldType.Text)
    public String fullName;

    public User(String fullName) {
        this.fullName = fullName;
    }

    public User() { }

    public String getUserId() {
        return userId;
    }
}
