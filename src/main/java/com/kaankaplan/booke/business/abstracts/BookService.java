package com.kaankaplan.booke.business.abstracts;

import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.core.util.results.Result;
import com.kaankaplan.booke.dto.BookDto;
import com.kaankaplan.booke.modals.Book;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BookService {

    DataResult<Book> addBook(BookDto bookDto);

    DataResult<Book> getBookById(String bookId);

    DataResult<List<Book>> searchBooksAutocomplete(String title);

    Result addImageForBook(String bookId, MultipartFile multipartFile);
}
