package com.kaankaplan.booke.modals;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Setting;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(indexName = "book")
@Setting(settingPath = "es-config/analyzer.json")
public class Book {

    @Id
    private String bookId;
    @Field(name = "title", type = FieldType.Text, analyzer = "autocomplete", searchAnalyzer = "autocomplete_search")
    public String title;
    public String description;
    public int pageNumber;
    public Author author;
    public List<String> genres;
    @Field(name="publishedDate", type = FieldType.Date)
    public Date publishedDate;
    public String publisher;
    public Rating rating;
    public List<Review> reviews;

    {
        this.reviews = new ArrayList<>();
    }

    public Book(String title, String description, int pageNumber, Author author,
                List<String> genres, Date publishedDate, String publisher) {
        this.title = title;
        this.description = description;
        this.pageNumber = pageNumber;
        this.author = author;
        this.genres = genres;
        this.publishedDate = publishedDate;
        this.publisher = publisher;
    }

    public Book() { }

    public String getBookId() {
        return bookId;
    }
}
