package com.kaankaplan.booke.modals;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "rating")
public class Rating {

    @Id
    private String ratingId;
    public int oneStarCount;
    public int twoStarCount;
    public int threeStarCount;
    public int fourStarCount;
    public int fiveStarCount;
    public int totalStartCount;

    public Rating() {
        this.oneStarCount = 0;
        this.twoStarCount = 0;
        this.threeStarCount = 0;
        this.fourStarCount = 0;
        this.fiveStarCount = 0;
        this.totalStartCount = 0;
    }

    public String getRatingId() {
        return ratingId;
    }
}
