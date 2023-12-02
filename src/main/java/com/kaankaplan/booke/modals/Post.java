package com.kaankaplan.booke.modals;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(indexName = "post")
public class Post {

    @Id
    private String postId;
    public String userId;
    public String fullName;
    public String profilePictureUrl;
    public String activity;
    public String bookName;
    public String authorName;
    public String bookImageUrl;
    public int likeCount;
    public List<Comment> comments;
    @Field(name="published_date", type = FieldType.Date)
    private final Date publishedDate;

    {
        this.likeCount = 0;
        this.comments = new ArrayList<>();
        this.publishedDate = new Date();
    }

    public Post(String userId, String fullName, String profilePictureUrl, String activity,
                String bookName, String authorName, String bookImageUrl) {
        this.userId = userId;
        this.fullName = fullName;
        this.profilePictureUrl = profilePictureUrl;
        this.activity = activity;
        this.bookName = bookName;
        this.authorName = authorName;
        this.bookImageUrl = bookImageUrl;
    }

    public Post() {
    }

    public String getPostId() {
        return postId;
    }

    public Date getPublishedDate() {
        return publishedDate;
    }
}
