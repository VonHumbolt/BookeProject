package com.kaankaplan.booke.repositories.concretes;

import com.kaankaplan.booke.modals.ReadingChallenge;
import com.kaankaplan.booke.repositories.abstracts.ReadingChallengeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Repository;


@Repository
@RequiredArgsConstructor
public class ReadingChallengeRepositoryImpl implements ReadingChallengeRepository {

    private final ElasticsearchOperations elasticsearchOperations;

    @Override
    public ReadingChallenge getReadingChallengeById(String challengeId) {
        return elasticsearchOperations.get(challengeId, ReadingChallenge.class);
    }

    @Override
    public ReadingChallenge startChallenge(ReadingChallenge readingChallenge) {
        return elasticsearchOperations.save(readingChallenge);
    }

    @Override
    public ReadingChallenge updateChallenge(ReadingChallenge readingChallenge) {
        return elasticsearchOperations.save(readingChallenge);
    }
}
