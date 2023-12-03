package com.kaankaplan.booke.modals;

import lombok.ToString;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.ArrayList;
import java.util.List;

@ToString
@Document(indexName = "author")
public class Author extends User {

    public List<Book> books;

    public Author(String fullName, List<Book> books) {
        this(fullName);
        this.books = books;
    }
    public Author(String fullName) {
        super(fullName);
        this.books = new ArrayList<>();
    }

    public Author() { }
}
