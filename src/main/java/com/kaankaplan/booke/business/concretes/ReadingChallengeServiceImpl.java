package com.kaankaplan.booke.business.concretes;

import com.kaankaplan.booke.business.abstracts.BookService;
import com.kaankaplan.booke.business.abstracts.ReadingChallengeService;
import com.kaankaplan.booke.business.messages.Constant;
import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.core.util.results.ErrorDataResult;
import com.kaankaplan.booke.core.util.results.SuccessDataResult;
import com.kaankaplan.booke.modals.Book;
import com.kaankaplan.booke.modals.ReadingChallenge;
import com.kaankaplan.booke.repositories.abstracts.ReadingChallengeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReadingChallengeServiceImpl implements ReadingChallengeService {

    private final ReadingChallengeRepository readingChallengeRepository;
    private final BookService bookService;

    @Transactional
    @Override
    public DataResult<ReadingChallenge> createReadingChallenge(int target) {
        log.info("Challenge target --> " + target);
        ReadingChallenge readingChallenge = new ReadingChallenge(target);
        return new SuccessDataResult<>(readingChallengeRepository.startChallenge(readingChallenge), Constant.READING_CHALLENGE_START);
    }

    @Transactional
    @Override
    public DataResult<ReadingChallenge> updateReadingChallenge(String challengeId, String bookId) {
        ReadingChallenge readingChallenge = readingChallengeRepository.getReadingChallengeById(challengeId);
        if(readingChallenge == null)
            return new ErrorDataResult<>(Constant.READING_CHALLENGE_NOT_FOUND);

        log.info("Old Challenge -> " + readingChallenge);
        Book book = bookService.getBookById(bookId).getData();
        readingChallenge.books.add(book);
        readingChallenge.read += 1;
        readingChallenge.left -= 1;
        log.info("New Challenge ---> " + readingChallenge);

        if (readingChallenge.read == readingChallenge.target)
            readingChallenge.isActive = false;

        return new SuccessDataResult<>(readingChallengeRepository.updateChallenge(readingChallenge));
    }
}
