package com.kaankaplan.booke.modals;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.ArrayList;
import java.util.List;

@Document(indexName = "reading_challenge")
public class ReadingChallenge {

    @Id
    private String challengeId;
    public int target;
    public int read;
    public int left;
    public List<Book> books;

    public ReadingChallenge(int target) {
        this.target = target;
        this.read = 0;
        this.left = target;
        this.books = new ArrayList<>();
    }

    public String getChallengeId() {
        return challengeId;
    }
}
