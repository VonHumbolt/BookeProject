package com.kaankaplan.booke.modals;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "want_to_read_book")
public class WantToReadBook {
    @Id
    private String wantToReadBookId;
    public Book book;
    public Reader reader;

    public WantToReadBook(Book book, Reader reader) {
        this.book = book;
        this.reader = reader;
    }

    public String getWantToReadBookId() {
        return wantToReadBookId;
    }
}
