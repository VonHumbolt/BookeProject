package com.kaankaplan.booke.core.util.results;

public abstract class Result {

    private final boolean isSuccess;
    private String message;

    public Result(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

    public Result(boolean isSuccess, String message) {
        this(isSuccess);
        this.message = message;
    }

    public boolean isSuccess() {
        return isSuccess;
    }

    public String getMessage() {
        return message;
    }
}
