package com.kaankaplan.booke.business.messages;

import com.kaankaplan.booke.modals.ReadingChallenge;
import com.kaankaplan.booke.modals.RegistrableUser;

public final class Constant {

    public static final String DEFAULT_PROFILE_PICTURE = "https://res.cloudinary.com/dspea8wm4/image/upload/v1701638455/default_profile_pic_szshsv.jpg";
    public static final String USER_DOES_NOT_EXIST_WITH_GIVEN_EMAIL="User doesn't exist with given email!";
    public static final String USER_DOES_NOT_EXIST_WITH_GIVEN_USERID = "User doesn't exist with given userId!";
    public static final String USER_SUCCESSFULLY_CREATED = "User is created successfully!";
    public static final String USER_SUCCESSFULLY_LOGIN = "Login is successful!";
    public static final String DELETE_REFRESH_TOKEN = "Refresh token is deleted!";
    public static final String REFRESH_TOKEN_IS_NOT_FOUND = "Refresh token is not found in redis!";
    public static final String LOGOUT = "Logout successful!";
    public static final String ROLE_NOT_FOUND = "Role not found with given roleName!";
    public static final String ROLE_DELETED_SUCCESSFULLY = "Role successfully deleted!";
    public static final String READER_WAS_NOT_FOUND = "Reader was not found!";
    public static final String FOLLOW_READER = "Reader is following now!";
    public static final String READER_CURRENTLY_FOLLOWING = "This reader already following!";
    public static final String UNFOLLOW_READER = "Reader is unfollowed";
    public static final String UNFOLLOW_UNSUCCESSFUL = "Unfollowed process is unsuccessful!";
    public static final String POST_NOT_FOUND = "Post not found!";
    public static final String LIKE_POST = "Post is liked!";
    public static final String UNLIKE_POST = "Post is unliked!";
    public static final String POST_CREATED = "New post is created!";
    public static final String BOOK_NOT_FOUND = "Book not found!";
    public static final String ADD_NEW_AUTHOR = "New Author is added!";
    public static final String AUTHOR_NOT_FOUND = "Author is not found!";
    public static final String ADD_NEW_BOOK = "New book is added!";
    public static final String USER_ALREADY_REGISTERED = "User is already registered with given email!";
    public static final String POST_NOT_IN_USER_POSTS = "Post is not fount in user posts!";
    public static final String POST_NOT_UPDATED = "Post is not updated!";
    public static final String ADD_NEW_GENRE = "New Genre is created!";
    public static final String CURRENTLY_READING = "Currently Reading";
    public static final String WANT_TO_READ = "Want To Read";
    public static final String READ = "Read";
    public static final String BOOK_ADDED_IN_CURRENTLY_READINGS = "Book is added in currently reading books";
    public static final String BOOK_ADDED_IN_WANT_TO_READS = "Book is added in want to read books";
    public static final String BOOK_ADDED_IN_READS = "Book is added in read books";
    public static final String PROFILE_PICTURE_UPDATED = "Profile picture was updated successfully!";
    public static final String BOOK_IMAGE_ADDED = "Book image is added successfully!";
    public static final String READING_CHALLENGE_START = "Reading challenge is created!";
    public static final String READING_CHALLENGE_NOT_FOUND = "Reading challenge was not found!";
    public static final String READING_CHALLENGE_COMPLETED = "Reading challenge was completed!";
    public static final String READING_CHALLENGE_UPDATE = "Reading challenge is updated successfully!";
    public static final String GENRE_NOT_FOUND = "Genre was not found!";
}
