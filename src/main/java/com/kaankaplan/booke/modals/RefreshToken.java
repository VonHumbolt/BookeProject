package com.kaankaplan.booke.modals;

import java.io.Serializable;
import java.util.Date;

public class RefreshToken implements Serializable {

    public String refreshToken;
    public String email;
    private final Date createdAt;

    public RefreshToken(String refreshToken, String email) {
        this();
        this.refreshToken = refreshToken;
        this.email = email;
    }

    public RefreshToken() {
        this.createdAt = new Date();
    }
}
