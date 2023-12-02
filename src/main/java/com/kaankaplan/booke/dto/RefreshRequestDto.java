package com.kaankaplan.booke.dto;

public record RefreshRequestDto(
        String email,
        String refreshToken
) {
}
