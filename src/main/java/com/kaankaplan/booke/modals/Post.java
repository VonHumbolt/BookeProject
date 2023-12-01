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
    public RegistrableUser user;
    public String activity;
    public Book book;
    public int likeCount;
    public List<Comment> comments;
    @Field(name="published_date", type = FieldType.Date)
    private final Date publishedDate;

    {
        this.likeCount = 0;
        this.comments = new ArrayList<>();
        this.publishedDate = new Date();
    }

    public Post(RegistrableUser user, String activity, Book book) {
        this.user = user;
        this.activity = activity;
        this.book = book;
    }

    public Post() {
    }

    public String getPostId() {
        return postId;
    }
}
