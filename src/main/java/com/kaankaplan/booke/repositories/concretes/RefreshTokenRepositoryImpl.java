package com.kaankaplan.booke.repositories.concretes;

import com.kaankaplan.booke.modals.RefreshToken;
import com.kaankaplan.booke.repositories.abstracts.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class RefreshTokenRepositoryImpl implements RefreshTokenRepository {

    private final RedisTemplate<String, Object> redisTemplate;
    private final String HASH_KEY = "redis_template_hash_key";

    @Override
    public RefreshToken saveRefreshToken(RefreshToken refreshToken) {
        redisTemplate.opsForHash().put(HASH_KEY, refreshToken.refreshToken, refreshToken);
        return refreshToken;
    }

    @Override
    public Optional<RefreshToken> getRefreshTokenByToken(String refreshToken) {
        RefreshToken token = (RefreshToken) redisTemplate.opsForHash().get(HASH_KEY, refreshToken);
        return Optional.ofNullable(token);
    }

    @Override
    public void deleteRefreshToken(String refreshToken) {
        redisTemplate.opsForHash().delete(HASH_KEY, refreshToken);
    }
}
