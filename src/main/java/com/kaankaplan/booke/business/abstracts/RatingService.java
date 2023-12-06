package com.kaankaplan.booke.business.abstracts;

import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.modals.Rating;

public interface RatingService {

    DataResult<Rating> updateRatingByStar(Rating rating, int star);
}
