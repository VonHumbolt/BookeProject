package com.kaankaplan.booke.business.abstracts;

import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.modals.ReadingChallenge;

public interface ReadingChallengeService {

    DataResult<ReadingChallenge> createReadingChallenge(int target);

    DataResult<ReadingChallenge> updateReadingChallenge(String challengeId, String bookId);
}
