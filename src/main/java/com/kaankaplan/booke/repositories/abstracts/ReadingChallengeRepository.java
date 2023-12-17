package com.kaankaplan.booke.repositories.abstracts;


import com.kaankaplan.booke.modals.ReadingChallenge;


public interface ReadingChallengeRepository {

    ReadingChallenge getReadingChallengeById(String challengeId);

    ReadingChallenge startChallenge(ReadingChallenge readingChallenge);

    ReadingChallenge updateChallenge(ReadingChallenge readingChallenge);
}
