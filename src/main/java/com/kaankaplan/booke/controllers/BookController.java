package com.kaankaplan.booke.controllers;

import com.kaankaplan.booke.business.abstracts.BookService;
import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.dto.BookDto;
import com.kaankaplan.booke.modals.Book;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book/")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @PostMapping("addBook")
    public DataResult<Book> addBook(@RequestBody BookDto bookDto) {
        return bookService.addBook(bookDto);
    }

    @GetMapping("getBookById/{bookId}")
    public DataResult<Book> getBookById(@PathVariable String bookId) {
        return bookService.getBookById(bookId);
    }

    @GetMapping("search/{title}")
    public DataResult<List<Book>> searchBooks(@PathVariable String title) {
        return bookService.searchBooksAutocomplete(title);
    }
}
