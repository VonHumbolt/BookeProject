package com.kaankaplan.booke.business.abstracts.abstracts;

import com.kaankaplan.booke.modals.RefreshToken;

import java.util.Optional;

public interface RefreshTokenRepository {

    RefreshToken saveRefreshToken(RefreshToken refreshToken);

    Optional<RefreshToken> getRefreshTokenByToken(String refreshToken);

    void deleteRefreshToken(String refreshToken);
}
