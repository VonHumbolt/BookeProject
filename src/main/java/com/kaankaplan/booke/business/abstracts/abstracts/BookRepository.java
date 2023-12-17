package com.kaankaplan.booke.business.abstracts.abstracts;

import com.kaankaplan.booke.modals.Book;

import java.util.List;

public interface BookRepository {

    Book save(Book book);

    Book getBookById(String bookId);

    List<Book> searchBooksAutocomplete(String title);
}
