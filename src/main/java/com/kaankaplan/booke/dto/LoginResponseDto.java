package com.kaankaplan.booke.dto;

public record LoginResponseDto(
        String userId,
        String email,
        String token,
        String refreshToken
) {
}
