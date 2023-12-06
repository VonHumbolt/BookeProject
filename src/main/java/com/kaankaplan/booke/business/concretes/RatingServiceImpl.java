package com.kaankaplan.booke.business.concretes;

import com.kaankaplan.booke.business.abstracts.RatingService;
import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.core.util.results.SuccessDataResult;
import com.kaankaplan.booke.modals.Rating;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService {

    @Override
    public DataResult<Rating> updateRatingByStar(Rating rating, int star) {
        log.info("Rating service --> star: " + star);
        log.info("Rating service --> rating: " + rating);
        switch (star) {
            case 1 -> rating.oneStarCount += 1;
            case 2 -> rating.twoStarCount += 1;
            case 3 -> rating.threeStarCount += 1;
            case 4 -> rating.fourStarCount += 1;
            case 5 -> rating.fiveStarCount += 1;
        }
        rating.totalStarCount += 1;
        log.info("Rating service --> new rating: " + rating);
        return new SuccessDataResult<>(rating);
    }

}
