package com.kaankaplan.booke.modals;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Setting;

@Document(indexName = "user")
@Setting(settingPath = "es-config/analyzer.json")
public class User {

    @Id
    private String userId;
    @Field(name = "fullName", type = FieldType.Text, analyzer = "autocomplete", searchAnalyzer = "autocomplete_search")
    public String fullName;

    public User(String fullName) {
        this.fullName = fullName;
    }

    public User() { }

    public String getUserId() {
        return userId;
    }
}
