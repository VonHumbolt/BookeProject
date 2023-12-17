package com.kaankaplan.booke.business.concretes;

import com.kaankaplan.booke.business.abstracts.AuthorService;
import com.kaankaplan.booke.business.abstracts.BookService;
import com.kaankaplan.booke.business.abstracts.RatingService;
import com.kaankaplan.booke.business.abstracts.ReviewService;
import com.kaankaplan.booke.business.messages.Constant;
import com.kaankaplan.booke.core.services.image.abstracts.ImageUploadService;
import com.kaankaplan.booke.core.util.results.*;
import com.kaankaplan.booke.dto.BookDto;
import com.kaankaplan.booke.modals.*;
import com.kaankaplan.booke.repositories.abstracts.BookRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final ReviewService reviewService;
    private final RatingService ratingService;
    private final AuthorService authorService;
    private final ImageUploadService imageUploadService;

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

    @Transactional
    @Override
    public DataResult<Book> addReviewToBook(String bookId, Review review) {
        log.info("Review --> " + review);
        Review savedReview = reviewService.addReview(review).getData();
        log.info("Saved Review --> " + savedReview);
        Book book = bookRepository.getBookById(bookId);
        book.reviews.add(review);

        log.info("Old rating --> " + book.rating);
        book.rating = ratingService.updateRatingByStar(book.rating, review.star).getData();

        return new SuccessDataResult<>(bookRepository.save(book));
    }

    @Override
    public Result addImageForBook(String bookId, MultipartFile multipartFile) {
        Book book = bookRepository.getBookById(bookId);
        if (book == null)
            return new ErrorResult(Constant.BOOK_NOT_FOUND);

        Map<Object, Object> result = imageUploadService.upload(multipartFile);
        String id = (String) result.get("public_id");
        String url = (String) result.get("url");
        book.bookImage = new Image(id, url);
        bookRepository.save(book);
        return new SuccessResult(Constant.BOOK_IMAGE_ADDED);
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
