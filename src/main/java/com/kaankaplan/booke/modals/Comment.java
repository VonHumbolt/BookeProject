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
    public RegistrableUser commentOwner;
    @Field(name = "published_date", type = FieldType.Date)
    private final Date publishedDate;

    public Comment() {
        this.publishedDate = new Date();
    }

    public Comment(String message, RegistrableUser commentOwner) {
        this();
        this.message = message;
        this.commentOwner = commentOwner;
    }

    public String getCommentId() {
        return commentId;
    }
}
