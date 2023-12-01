package com.kaankaplan.booke.modals;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Date;

@Document(indexName = "review")
public class Review {

    @Id
    private String reviewId;
    public RegistrableUser user;
    public String description;
    public int star;
    @Field(name = "published_date", type = FieldType.Date)
    private final Date publishedDate;

    public Review(RegistrableUser user, int star) {
        this.user = user;
        this.star = star;
        this.publishedDate = new Date();
    }

    public Review(RegistrableUser user, int star, String description) {
        this(user, star);
        this.description = description;
    }

    // get published date metodu olmadğından servis sonrası dönen verilerin içerisinde publishedDAte alanı olur mu?
    public String getReviewId() {
        return reviewId;
    }
}
