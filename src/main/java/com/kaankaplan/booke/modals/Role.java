package com.kaankaplan.booke.modals;

import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@ToString
@Document(indexName = "role")
public class Role {

    @Id
    private String roleId;
    @Field(name = "roleName", type = FieldType.Text)
    public String roleName;

    public Role(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleId() {
        return roleId;
    }
}
