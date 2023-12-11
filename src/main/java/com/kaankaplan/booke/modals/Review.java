package com.kaankaplan.booke.modals;

import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Date;

@ToString
@Document(indexName = "review")
public class Review {

    @Id
    private String reviewId;
    public String userId;
    public String fullName;
    public String description;
    public int star;
    @Field(name = "published_date", type = FieldType.Date)
    public Date publishedDate;

    public Review(String userId, int star) {
        this();
        this.userId = userId;
        this.star = star;

    }

    public Review(String userId, int star, String description) {
        this(userId, star);
        this.description = description;
    }

    public Review() {  this.publishedDate = new Date(); }

    public String getReviewId() {
        return reviewId;
    }
}
