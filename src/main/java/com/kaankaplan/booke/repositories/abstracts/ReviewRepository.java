package com.kaankaplan.booke.repositories.abstracts;

import com.kaankaplan.booke.modals.Review;

public interface ReviewRepository {

    Review save(Review review);

    Review getReviewById(String reviewId);
}
