package com.kaankaplan.booke.modals;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Date;

@Document(indexName = "comment")
public class Comment {

    @Id
    private String commentId;
    public String message;
    public String commentOwnerName;
    @Field(name = "published_date", type = FieldType.Date)
    private final Date publishedDate;

    public Comment() {
        this.publishedDate = new Date();
    }

    public Comment(String message, String commentOwnerName) {
        this();
        this.message = message;
        this.commentOwnerName = commentOwnerName;
    }

    public String getCommentId() {
        return commentId;
    }

    public Date getPublishedDate() {
        return publishedDate;
    }
}
