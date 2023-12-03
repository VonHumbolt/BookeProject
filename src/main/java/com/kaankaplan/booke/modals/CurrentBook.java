package com.kaankaplan.booke.modals;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "current_book")
public class CurrentBook {

    @Id
    private String currentBookId;
    public Book book;
    public Reader reader;
    public int currentPage;

    public CurrentBook(Book book, Reader reader) {
        this.book = book;
        this.reader = reader;
        this.currentPage = 0;
    }

    public CurrentBook() { }

    public String getCurrentBookId() {
        return currentBookId;
    }
}
