package com.kaankaplan.booke.repositories.concretes;

import com.kaankaplan.booke.modals.Review;
import com.kaankaplan.booke.repositories.abstracts.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ReviewRepositoryImpl implements ReviewRepository {

    private final ElasticsearchOperations elasticsearchOperations;

    @Override
    public Review save(Review review) {
        return elasticsearchOperations.save(review);
    }

    @Override
    public Review getReviewById(String reviewId) {
        return elasticsearchOperations.get(reviewId, Review.class);
    }
}
