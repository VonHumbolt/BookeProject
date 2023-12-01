package com.kaankaplan.booke.modals;

import org.springframework.data.elasticsearch.annotations.Document;

import java.util.ArrayList;
import java.util.List;

@Document(indexName = "reader")
public class Reader extends RegistrableUser {

    public String profileImageUrl;
    public List<ReadBook> readBooks;
    public List<CurrentBook> currentlyBooks;
    public List<WantToReadBook> wantToReadBooks;
    public List<ReadingChallenge> readingChallenges;
    public List<Reader> follows;
    public List<Reader> followers;

    public Reader(String fullName, String email, String password, Role role) {
        super(fullName, email, password);
        this.profileImageUrl = "DEFAULT_PROFILE_PICTURE_URL";
        this.readBooks = new ArrayList<>();
        this.currentlyBooks = new ArrayList<>();
        this.wantToReadBooks = new ArrayList<>();
        this.readingChallenges = new ArrayList<>();
        this.follows = new ArrayList<>();
        this.followers = new ArrayList<>();
    }
}
