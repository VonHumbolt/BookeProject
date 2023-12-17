package com.kaankaplan.booke.repositories.abstracts;

import com.kaankaplan.booke.modals.RefreshToken;

import java.util.Optional;

public interface RefreshTokenRepository {

    RefreshToken saveRefreshToken(RefreshToken refreshToken);

    Optional<RefreshToken> getRefreshTokenByToken(String refreshToken);

    void deleteRefreshToken(String refreshToken);
}
