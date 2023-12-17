package com.kaankaplan.booke.business.abstracts.abstracts;

import com.kaankaplan.booke.modals.Review;

public interface ReviewRepository {

    Review save(Review review);

    Review getReviewById(String reviewId);
}
