package com.kaankaplan.booke.modals;

import com.kaankaplan.booke.business.messages.Constant;
import lombok.ToString;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.ArrayList;
import java.util.List;

@ToString
@Document(indexName = "reader")
public class Reader extends RegistrableUser {

    public Image profileImage;
//    public List<ReadBook> readBooks;
//    public List<CurrentBook> currentlyBooks;
//    public List<WantToReadBook> wantToReadBooks;
    public List<ReadingChallenge> readingChallenges;

    public List<Book> readBooks;
    public List<Book> currentlyBooks;
    public List<Book> wantToReadBooks;
    public List<Reader> follows;
    public List<Reader> followers;
    public List<Post> posts;

    public Reader(String fullName, String email, String password, Role role) {
        super(fullName, email, password, role);
        this.profileImage = new Image("1", Constant.DEFAULT_PROFILE_PICTURE);
        this.readBooks = new ArrayList<>();
        this.currentlyBooks = new ArrayList<>();
        this.wantToReadBooks = new ArrayList<>();
        this.readingChallenges = new ArrayList<>();
        this.follows = new ArrayList<>();
        this.followers = new ArrayList<>();
        this.posts = new ArrayList<>();
    }

    @Override
    public boolean equals(Object obj) {
        if(this == obj)
            return true;

        if(obj == null || obj.getClass()!= this.getClass())
            return false;

        Reader reader = (Reader) obj;
        return this.getUserId().equals(reader.getUserId());
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }
}
