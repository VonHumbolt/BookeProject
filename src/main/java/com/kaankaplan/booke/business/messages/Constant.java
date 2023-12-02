package com.kaankaplan.booke.business.messages;

import com.kaankaplan.booke.modals.RegistrableUser;

public final class Constant {

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
}
