package com.kaankaplan.booke.business.concretes;

import com.kaankaplan.booke.business.abstracts.AuthorService;
import com.kaankaplan.booke.business.abstracts.BookService;
import com.kaankaplan.booke.business.messages.Constant;
import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.core.util.results.ErrorDataResult;
import com.kaankaplan.booke.core.util.results.SuccessDataResult;
import com.kaankaplan.booke.dto.BookDto;
import com.kaankaplan.booke.modals.Author;
import com.kaankaplan.booke.modals.Book;
import com.kaankaplan.booke.repositories.abstracts.BookRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final AuthorService authorService;

    @Transactional
    @Override
    public DataResult<Book> addBook(BookDto bookDto) {
        Author author = authorService.getAuthorById(bookDto.authorId()).getData();
        Book book = new Book(
                bookDto.title(),
                bookDto.description(),
                bookDto.pageNumber(),
                author,
                bookDto.genres(),
                bookDto.publishedDate(),
                bookDto.publisher()
            );
        return new SuccessDataResult<>(bookRepository.save(book), Constant.ADD_NEW_BOOK);
    }

    @Override
    public DataResult<Book> getBookById(String bookId) {
        Book book = bookRepository.getBookById(bookId);
        return book != null ? new SuccessDataResult<>(book) : new ErrorDataResult<>(Constant.BOOK_NOT_FOUND);
    }

    @Override
    public DataResult<List<Book>> searchBooksAutocomplete(String title) {
        return new SuccessDataResult<>(bookRepository.searchBooksAutocomplete(title));
    }
}
