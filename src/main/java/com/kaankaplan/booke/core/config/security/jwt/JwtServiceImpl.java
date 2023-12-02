package com.kaankaplan.booke.core.config.security.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class JwtServiceImpl implements JwtService {

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.token-expiration-time}")
    private int tokenExpirationTime;

    @Override
    public String generateJwtToken(User principal) {
        return Jwts.builder()
                .setSubject(principal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(
                                new Date().getTime() + tokenExpirationTime
                        )
                )
                .claim("authority", principal.getAuthorities())
                .signWith(SignatureAlgorithm.HS512, secretKey.getBytes())
                .compact();
    }

    @Override
    public String generateJwtTokenWithEmail(String email, List<SimpleGrantedAuthority> grantedAuthorities) {
        return Jwts.builder()
                .setIssuer(email)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(
                                new Date().getTime() + tokenExpirationTime
                        )
                )
                .claim("authority", grantedAuthorities)
                .signWith(SignatureAlgorithm.HS512, secretKey.getBytes())
                .compact();
    }

    @Override
    public String generateRefreshToken(String email) {
        return Jwts.builder()
                .setIssuer(email)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS512, secretKey.getBytes())
                .compact();
    }
}
