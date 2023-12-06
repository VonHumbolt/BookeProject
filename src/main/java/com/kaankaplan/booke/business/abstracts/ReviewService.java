package com.kaankaplan.booke.business.abstracts;

import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.modals.Review;

public interface ReviewService {

    DataResult<Review> addReview(Review review);

    DataResult<Review> getReviewById(String reviewId);
}
