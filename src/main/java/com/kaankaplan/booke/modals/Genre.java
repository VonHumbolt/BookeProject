package com.kaankaplan.booke.modals;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.ArrayList;
import java.util.List;

@Document(indexName = "genre")
public class Genre {

    @Id
    private String genreId;
    public String genreName;
    public List<Book> books;

    public Genre(String genreName) {
        this.genreName = genreName;
        this.books = new ArrayList<>();
    }

    public Genre(String genreName, List<Book> books) {
        this(genreName);
        this.books = books;
    }

    public String getGenreId() {
        return genreId;
    }
}
