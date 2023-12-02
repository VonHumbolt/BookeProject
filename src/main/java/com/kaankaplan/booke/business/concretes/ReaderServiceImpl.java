package com.kaankaplan.booke.business.concretes;

import com.kaankaplan.booke.business.abstracts.ReaderService;
import com.kaankaplan.booke.business.messages.Constant;
import com.kaankaplan.booke.core.util.results.*;
import com.kaankaplan.booke.dto.PostDto;
import com.kaankaplan.booke.modals.Post;
import com.kaankaplan.booke.modals.Reader;
import com.kaankaplan.booke.repositories.abstracts.ReaderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReaderServiceImpl implements ReaderService {

    private final ReaderRepository readerRepository;
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

    @Override
    public Result addPostToReader(String userId, Post post) {
        Reader reader = readerRepository.getReaderById(userId);
        reader.posts.add(post);
        readerRepository.saveReader(reader);
        return new SuccessResult();
    }
}