package com.kaankaplan.booke.core.config.security.jwt;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public interface JwtService {

    String generateJwtToken(User principal);

    String generateRefreshToken(String email);

    String generateJwtTokenWithEmail(String email, List<SimpleGrantedAuthority> grantedAuthorities);
}
