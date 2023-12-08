package com.kaankaplan.booke.business.concretes;

import com.kaankaplan.booke.business.abstracts.RatingService;
import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.core.util.results.SuccessDataResult;
import com.kaankaplan.booke.modals.Rating;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

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
        rating.meanOfRating = calculateMeanOfRating(rating);
        log.info("Rating service --> new rating: " + rating);
        return new SuccessDataResult<>(rating);
    }

    private double calculateMeanOfRating(Rating rating) {
        double totalPoint = rating.oneStarCount + rating.twoStarCount * 2 + rating.threeStarCount * 3
                + rating.fourStarCount * 4 + rating.fiveStarCount * 5;
        BigDecimal bd = new BigDecimal( totalPoint / rating.totalStarCount).setScale(2, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }

}
