package com.kaankaplan.booke.dto;

public record UserRegisterDto(
        String fullName,
        String email,
        String password
) {
}
