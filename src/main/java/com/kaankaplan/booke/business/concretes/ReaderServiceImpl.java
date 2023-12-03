package com.kaankaplan.booke.business.concretes;

import com.kaankaplan.booke.business.abstracts.BookService;
import com.kaankaplan.booke.business.abstracts.ReaderService;
import com.kaankaplan.booke.business.messages.Constant;
import com.kaankaplan.booke.core.services.image.abstracts.ImageUploadService;
import com.kaankaplan.booke.core.util.results.*;
import com.kaankaplan.booke.dto.BookStatusDto;
import com.kaankaplan.booke.dto.PostDto;
import com.kaankaplan.booke.modals.Book;
import com.kaankaplan.booke.modals.Image;
import com.kaankaplan.booke.modals.Post;
import com.kaankaplan.booke.modals.Reader;
import com.kaankaplan.booke.repositories.abstracts.ReaderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.bcel.Const;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReaderServiceImpl implements ReaderService {

    private final ReaderRepository readerRepository;
    private final BookService bookService;
    private final ImageUploadService imageUploadService;

    @Transactional
    @Override
    public DataResult<Reader> saveReader(Reader reader) {
        return new SuccessDataResult<>(readerRepository.saveReader(reader));
    }

    @Override
    public DataResult<Reader> getReaderById(String userId) {
        Reader reader = readerRepository.getReaderById(userId);
        return reader != null ? new SuccessDataResult<>(reader) : new ErrorDataResult<>(Constant.READER_WAS_NOT_FOUND);
    }

    @Override
    public DataResult<List<Reader>> getReadersFollows(String userId) {
        Reader reader = readerRepository.getReaderById(userId);
        if (reader == null)
            return new ErrorDataResult<>(Constant.READER_WAS_NOT_FOUND);

        return new SuccessDataResult<>(reader.follows);
    }

    @Override
    public DataResult<List<Reader>> getReadersFollowers(String userId) {
        Reader reader = readerRepository.getReaderById(userId);
        if (reader == null)
            return new ErrorDataResult<>(Constant.READER_WAS_NOT_FOUND);

        return new SuccessDataResult<>(reader.followers);
    }

    @Transactional
    @Override
    public Result follow(String userId, String wantToFollowUserId) {
        Reader reader = readerRepository.getReaderById(userId);
        Reader wantToFollowUser = readerRepository.getReaderById(wantToFollowUserId);

        if (reader == null || wantToFollowUser == null)
            return new ErrorResult(Constant.READER_WAS_NOT_FOUND);

        if (!reader.follows.contains(wantToFollowUser)) {
            log.info("User is not in the follows");
            reader.follows.add(wantToFollowUser);
            readerRepository.saveReader(reader);
            return new SuccessResult(Constant.FOLLOW_READER);
        }

        log.info("Follow process is unsuccessful!");
        return new ErrorResult(Constant.READER_CURRENTLY_FOLLOWING);
    }

    @Transactional
    @Override
    public Result unfollow(String userId, String wantToUnfollowUserId) {
        Reader reader = readerRepository.getReaderById(userId);
        Reader wantToUnfollowUser = readerRepository.getReaderById(wantToUnfollowUserId);

        if (reader == null || wantToUnfollowUser == null)
            return new ErrorResult(Constant.READER_WAS_NOT_FOUND);

        if (reader.follows.contains(wantToUnfollowUser)) {
            log.info("User is in the follows");
            reader.follows.remove(wantToUnfollowUser);
            readerRepository.saveReader(reader);
            return new SuccessResult(Constant.UNFOLLOW_READER);
        }

        log.info("Unfollow process is unsuccessful!");
        return new ErrorResult(Constant.UNFOLLOW_UNSUCCESSFUL);
    }

    @Transactional
    @Override
    public Result addPostToReader(String userId, Post post) {
        Reader reader = readerRepository.getReaderById(userId);
        reader.posts.add(post);
        readerRepository.saveReader(reader);
        return new SuccessResult();
    }

    @Transactional
    @Override
    public Result updateUserPost(Post post) {
        Reader reader = readerRepository.getReaderById(post.userId);
        if(reader.posts.contains(post)) {
            log.info("Post in user posts");
            reader.posts.remove(post);
            reader.posts.add(post);
            readerRepository.saveReader(reader);
            return new SuccessResult();
        }
        return new ErrorResult(Constant.POST_NOT_IN_USER_POSTS);
    }

    @Override
    public DataResult<BookStatusDto> getBookCurrentStatusForReader(String readerId, String bookId) {
        Reader reader = readerRepository.getReaderById(readerId);
        DataResult<Book> bookDataResult = bookService.getBookById(bookId);
        if(!bookDataResult.isSuccess() || reader == null)
            return new ErrorDataResult<>();

        Book book = bookDataResult.getData();
        if (reader.currentlyBooks.contains(book))
            return new SuccessDataResult<>(new BookStatusDto(
                    Constant.CURRENTLY_READING, reader, book

            ));
        if (reader.wantToReadBooks.contains(book))
            return new SuccessDataResult<>(new BookStatusDto(
                    Constant.WANT_TO_READ, reader, book
            ));
        if (reader.readBooks.contains(book))
            return new SuccessDataResult<>(new BookStatusDto(
                    Constant.READ, reader, book
            ));

        return new SuccessDataResult<>(new BookStatusDto(
                null, reader, book
        ));
    }

    @Transactional
    @Override
    public Result addBookIntoCurrentlyReadings(String readerId, String bookId) {
        DataResult<BookStatusDto> dataResult = getBookCurrentStatusForReader(readerId, bookId);
        if (!dataResult.isSuccess())
            return new ErrorResult();

        Book book = dataResult.getData().book();
        Reader reader = dataResult.getData().reader();
        String status = dataResult.getData().status();
        if(status != null && status.equals(Constant.WANT_TO_READ))
            reader.wantToReadBooks.remove(book);

        reader.currentlyBooks.add(book);
        readerRepository.saveReader(reader);
        return new SuccessResult(Constant.BOOK_ADDED_IN_CURRENTLY_READINGS);
    }

    @Transactional
    @Override
    public Result addBookIntoWantToReads(String readerId, String bookId) {
        DataResult<BookStatusDto> dataResult = getBookCurrentStatusForReader(readerId, bookId);
        if (!dataResult.isSuccess())
            return new ErrorResult();

        Book book = dataResult.getData().book();
        Reader reader = dataResult.getData().reader();
        String status = dataResult.getData().status();
        if(status != null && status.equals(Constant.CURRENTLY_READING))
            reader.currentlyBooks.remove(book);

        reader.wantToReadBooks.add(book);
        readerRepository.saveReader(reader);
        return new SuccessResult(Constant.BOOK_ADDED_IN_WANT_TO_READS);
    }

    @Transactional
    @Override
    public Result addBookIntoReads(String readerId, String bookId) {
        DataResult<BookStatusDto> dataResult = getBookCurrentStatusForReader(readerId, bookId);
        if (!dataResult.isSuccess())
            return new ErrorResult();

        Book book = dataResult.getData().book();
        Reader reader = dataResult.getData().reader();
        String status = dataResult.getData().status();

        if(status != null && status.equals(Constant.CURRENTLY_READING))
            reader.currentlyBooks.remove(book);
        if(status != null && status.equals(Constant.WANT_TO_READ))
            reader.wantToReadBooks.remove(book);

        reader.readBooks.add(book);
        readerRepository.saveReader(reader);
        return new SuccessResult(Constant.BOOK_ADDED_IN_READS);
    }

    @Override
    public DataResult<List<Reader>> searchReaderAutocomplete(String fullName) {
        return new SuccessDataResult<>(readerRepository.searchUserAutocomplete(fullName));
    }

    @Override
    public Result updateProfileImage(String userId, MultipartFile multipartFile) {
        Reader reader = readerRepository.getReaderById(userId);
        if(reader == null)
            return new ErrorResult(Constant.READER_WAS_NOT_FOUND);

        if(!reader.profileImage.imageUrl.equals(Constant.DEFAULT_PROFILE_PICTURE))
            imageUploadService.deleteImage(reader.profileImage.getImageId());

        Map<Object, Object> uploadResult = imageUploadService.upload(multipartFile);
        log.info("Image Upload Result --> " + uploadResult);
        String imageId = (String) uploadResult.get("public_id");
        String imageUrl = (String) uploadResult.get("url");

        reader.profileImage = new Image(imageId, imageUrl);
        readerRepository.saveReader(reader);
        return new SuccessResult(Constant.PROFILE_PICTURE_UPDATED);
    }
}