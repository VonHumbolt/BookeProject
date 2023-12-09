package com.kaankaplan.booke.modals;

import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@ToString
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
    public double meanOfRating;
    public int likeCount;
    public List<String> usersWhoLikePost;
    public List<Comment> comments;
    @Field(name="published_date", type = FieldType.Date)
    public Date publishedDate;

    public Post(String userId, String fullName, String profilePictureUrl, String activity,
                String bookName, String authorName, String bookImageUrl, double meanOfRating) {
        this();
        this.userId = userId;
        this.fullName = fullName;
        this.profilePictureUrl = profilePictureUrl;
        this.activity = activity;
        this.bookName = bookName;
        this.authorName = authorName;
        this.bookImageUrl = bookImageUrl;
        this.meanOfRating = meanOfRating;
    }

    public Post() {
        this.likeCount = 0;
        this.usersWhoLikePost = new ArrayList<>();
        this.comments = new ArrayList<>();
        this.publishedDate = new Date();
    }

    public String getPostId() {
        return postId;
    }

    public Date getPublishedDate() {
        return publishedDate;
    }

    @Override
    public boolean equals(Object obj) {
        if(this == obj)
            return true;

        if(obj == null || obj.getClass()!= this.getClass())
            return false;

        Post post = (Post) obj;
        return this.postId.equals(post.postId);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }
}
