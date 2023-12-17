package com.kaankaplan.booke.business.concretes;

import com.kaankaplan.booke.business.abstracts.BookService;
import com.kaankaplan.booke.business.abstracts.ReaderService;
import com.kaankaplan.booke.business.abstracts.ReadingChallengeService;
import com.kaankaplan.booke.business.messages.Constant;
import com.kaankaplan.booke.core.services.image.abstracts.ImageUploadService;
import com.kaankaplan.booke.core.util.results.*;
import com.kaankaplan.booke.dto.BookStatusDto;
import com.kaankaplan.booke.modals.*;
import com.kaankaplan.booke.repositories.abstracts.ReaderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReaderServiceImpl implements ReaderService {

    private final ReaderRepository readerRepository;
    private final BookService bookService;
    private final ImageUploadService imageUploadService;
    private final ReadingChallengeService readingChallengeService;

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
    public DataResult<Reader> getReaderByEmail(String email) {
        return new SuccessDataResult<>(readerRepository.getReaderByEmail(email));
    }

    @Override
    public DataResult<List<Reader>> getReadersFollows(String userId) {
        Reader reader = readerRepository.getReaderById(userId);
        if (reader == null)
            return new ErrorDataResult<>(Constant.READER_WAS_NOT_FOUND);
        List<Reader> follows = new ArrayList<>();
        for (String readerId : reader.followsIdList) {
            follows.add(readerRepository.getReaderById(readerId));
        }
        return new SuccessDataResult<>(follows);
    }

    @Override
    public DataResult<List<Reader>> getReadersFollowers(String userId) {
        Reader reader = readerRepository.getReaderById(userId);
        if (reader == null)
            return new ErrorDataResult<>(Constant.READER_WAS_NOT_FOUND);
        List<Reader> followers = new ArrayList<>();
        for (String readerId : reader.followersIdList) {
            followers.add(readerRepository.getReaderById(readerId));
        }
        return new SuccessDataResult<>(followers);
    }

    @Transactional
    @Override
    public Result follow(String userId, String wantToFollowUserId) {
        Reader reader = readerRepository.getReaderById(userId);
        Reader wantToFollowReader = readerRepository.getReaderById(wantToFollowUserId);

        if (reader == null)
            return new ErrorResult(Constant.READER_WAS_NOT_FOUND);

        if (!reader.followsIdList.contains(wantToFollowUserId)) {
            log.info("User is not in the follows");
            reader.followsIdList.add(wantToFollowUserId);
            readerRepository.saveReader(reader);
            wantToFollowReader.followersIdList.add(userId);
            readerRepository.saveReader(wantToFollowReader);
            return new SuccessResult(Constant.FOLLOW_READER);
        }

        log.info("Follow process is unsuccessful!");
        return new ErrorResult(Constant.READER_CURRENTLY_FOLLOWING);
    }

    @Transactional
    @Override
    public Result unfollow(String userId, String wantToUnfollowUserId) {
        Reader reader = readerRepository.getReaderById(userId);
        Reader wantToUnfollowReader = readerRepository.getReaderById(wantToUnfollowUserId);

        if (reader == null)
            return new ErrorResult(Constant.READER_WAS_NOT_FOUND);

        if (reader.followsIdList.contains(wantToUnfollowUserId)) {
            log.info("User is in the follows");
            reader.followsIdList.remove(wantToUnfollowUserId);
            readerRepository.saveReader(reader);
            wantToUnfollowReader.followersIdList.remove(userId);
            readerRepository.saveReader(wantToUnfollowReader);
            return new SuccessResult(Constant.UNFOLLOW_READER);
        }

        log.info("Unfollow process is unsuccessful!");
        return new ErrorResult(Constant.UNFOLLOW_UNSUCCESSFUL);
    }

    @Transactional
    @Override
    public Result addPostToReader(String userId, String postId) {
        Reader reader = readerRepository.getReaderById(userId);
        reader.postIdList.add(postId);
        readerRepository.saveReader(reader);
        return new SuccessResult();
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
//        Update Reading Challenge
        DataResult<ReadingChallenge> challengeDataResult = updateReadingChallenge(reader, bookId);
        if(challengeDataResult.isSuccess()) {
            ReadingChallenge challenge = challengeDataResult.getData();
            log.info("Currently active challenge ---> " + challenge);
            reader.readingChallenges.remove(challenge);
            reader.readingChallenges.add(challenge);
            log.info("Reader new challenges ---> " + reader.readingChallenges);
        }

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

    @Transactional
    @Override
    public Result startReadingChallenge(String userId, int target) {
        Reader reader = readerRepository.getReaderById(userId);
        if(reader == null)
            return new ErrorResult(Constant.READER_WAS_NOT_FOUND);

        ReadingChallenge readingChallenge = readingChallengeService.createReadingChallenge(target).getData();
        reader.readingChallenges.add(readingChallenge);
        readerRepository.saveReader(reader);
        return new SuccessResult(Constant.READING_CHALLENGE_START);
    }

    private DataResult<ReadingChallenge> updateReadingChallenge(Reader reader, String bookId) {
        log.info("Reader old challenges ---> " + reader.readingChallenges);
        ReadingChallenge challenge = null;
        for (ReadingChallenge readingChallenge : reader.readingChallenges) {
            if(readingChallenge.isActive)
                challenge = readingChallenge;
        }
        if(challenge != null) {
            ReadingChallenge savedChallenge = readingChallengeService.updateReadingChallenge(challenge.getChallengeId(), bookId).getData();
            return new SuccessDataResult<>(savedChallenge, Constant.READING_CHALLENGE_UPDATE);
        }
        return new ErrorDataResult<>(Constant.READING_CHALLENGE_NOT_FOUND);
    }
}