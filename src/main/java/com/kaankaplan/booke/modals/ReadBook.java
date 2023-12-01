package com.kaankaplan.booke.modals;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "read_book")
public class ReadBook {

    @Id
    private String readBookId;
    public Book book;
    public Reader reader;

    public ReadBook(Book book, Reader reader) {
        this.book = book;
        this.reader = reader;
    }

    public String getReadBookId() {
        return readBookId;
    }
}
