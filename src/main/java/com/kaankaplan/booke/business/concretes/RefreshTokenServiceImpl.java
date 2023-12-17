package com.kaankaplan.booke.business.concretes;

import com.kaankaplan.booke.business.abstracts.RefreshTokenService;
import com.kaankaplan.booke.business.messages.Constant;
import com.kaankaplan.booke.core.config.security.jwt.JwtService;
import com.kaankaplan.booke.core.util.results.*;
import com.kaankaplan.booke.modals.RefreshToken;
import com.kaankaplan.booke.repositories.abstracts.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;

    @Transactional
    @Override
    public DataResult<RefreshToken> generateRefreshToken(String email) {
        String token = jwtService.generateRefreshToken(email);
        RefreshToken refreshToken = new RefreshToken(token, email);
        log.info("Generated refresh token ---> " + refreshToken);
        return new SuccessDataResult<>(refreshTokenRepository.saveRefreshToken(refreshToken));
    }

    @Override
    public DataResult<RefreshToken> getRefreshToken(String refreshToken) {
        boolean isPresent = refreshTokenRepository.getRefreshTokenByToken(refreshToken).isPresent();
        if (!isPresent) {
            return new ErrorDataResult<>();
        }
        RefreshToken token = refreshTokenRepository.getRefreshTokenByToken(refreshToken).get();
        return new SuccessDataResult<>(token);
    }

    @Transactional
    @Override
    public Result deleteToken(String refreshToken) {
        boolean isPresent = refreshTokenRepository.getRefreshTokenByToken(refreshToken).isPresent();
        log.info("refresh token is present --> " + isPresent);
        if (!isPresent)
            return new ErrorResult(Constant.REFRESH_TOKEN_IS_NOT_FOUND);

        log.info("deleted refresh token --> " + refreshToken);
        refreshTokenRepository.deleteRefreshToken(refreshToken);
        return new SuccessResult(Constant.DELETE_REFRESH_TOKEN);
    }
}
