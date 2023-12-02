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
}
