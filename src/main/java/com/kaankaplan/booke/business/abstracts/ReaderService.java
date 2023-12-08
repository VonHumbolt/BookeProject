package com.kaankaplan.booke.business.abstracts;

import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.core.util.results.Result;
import com.kaankaplan.booke.dto.BookStatusDto;
import com.kaankaplan.booke.modals.Reader;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ReaderService {

    DataResult<Reader> saveReader(Reader reader);

    DataResult<Reader> getReaderById(String userId);
    DataResult<Reader> getReaderByEmail(String email);
    DataResult<List<Reader>> getReadersFollows(String userId);
    DataResult<List<Reader>> getReadersFollowers(String userId);

    Result follow(String userId, String wantToFollowUserId);

    Result unfollow(String userId, String wantToUnfollowUserId);

    Result addPostToReader(String userId, String postId);

    DataResult<BookStatusDto> getBookCurrentStatusForReader(String readerId, String bookId);

    Result addBookIntoCurrentlyReadings(String readerId, String bookId);

    Result addBookIntoWantToReads(String readerId, String bookId);

    Result addBookIntoReads(String readerId, String bookId);

    DataResult<List<Reader>> searchReaderAutocomplete(String fullName);

    Result updateProfileImage(String userId, MultipartFile multipartFile);

    Result startReadingChallenge(String userId, int target);

}
