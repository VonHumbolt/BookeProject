package com.kaankaplan.booke.modals;

import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.ArrayList;
import java.util.List;

@ToString
@Document(indexName = "reading_challenge")
public class ReadingChallenge {

    @Id
    private String challengeId;
    public int target;
    public int read;
    public int left;

    public boolean isActive;
    public List<Book> books;

    public ReadingChallenge(int target) {
        this.target = target;
        this.read = 0;
        this.left = target;
        this.isActive = true;
        this.books = new ArrayList<>();
    }

    public String getChallengeId() {
        return challengeId;
    }

    @Override
    public boolean equals(Object obj) {
        if(this == obj)
            return true;

        if(obj == null || obj.getClass()!= this.getClass())
            return false;

        ReadingChallenge challenge = (ReadingChallenge) obj;
        return this.challengeId.equals(challenge.challengeId);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }
}
