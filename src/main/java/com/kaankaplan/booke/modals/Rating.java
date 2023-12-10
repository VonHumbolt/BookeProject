package com.kaankaplan.booke.modals;

import lombok.ToString;

@ToString
public class Rating {

    private String ratingId;
    public int oneStarCount;
    public int twoStarCount;
    public int threeStarCount;
    public int fourStarCount;
    public int fiveStarCount;
    public int totalStarCount;
    public double meanOfRating;

    public Rating() {
        this.oneStarCount = 0;
        this.twoStarCount = 0;
        this.threeStarCount = 0;
        this.fourStarCount = 0;
        this.fiveStarCount = 0;
        this.totalStarCount = 0;
        this.meanOfRating = 0;
    }

    public String getRatingId() {
        return ratingId;
    }
}
