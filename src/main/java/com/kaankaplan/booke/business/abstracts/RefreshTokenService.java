package com.kaankaplan.booke.business.abstracts;

import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.core.util.results.Result;
import com.kaankaplan.booke.modals.RefreshToken;

public interface RefreshTokenService {

    DataResult<RefreshToken> generateRefreshToken(String email);

    DataResult<RefreshToken> getRefreshToken(String refreshToken);

    Result deleteToken(String refreshToken);
}
