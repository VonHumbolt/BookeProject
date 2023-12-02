package com.kaankaplan.booke.modals;

import lombok.ToString;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.ArrayList;
import java.util.List;

@ToString
@Document(indexName = "author")
public class Author extends User {

    public List<Book> books;
    public String profileImageUrl;

    public Author(String fullName, List<Book> books, String profileImageUrl) {
        this(fullName, profileImageUrl);
        this.books = books;
    }
    public Author(String fullName, String profileImageUrl) {
        this(fullName);
        this.profileImageUrl = profileImageUrl;
    }
    public Author(String fullName) {
        super(fullName);
        this.books = new ArrayList<>();
        this.profileImageUrl = "DEFAULT_PROFILE_IMAGE_URL";
    }

    public Author() { }
}
