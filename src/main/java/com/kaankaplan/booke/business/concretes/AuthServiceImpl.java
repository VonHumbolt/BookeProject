package com.kaankaplan.booke.business.concretes;

import com.kaankaplan.booke.business.abstracts.*;
import com.kaankaplan.booke.business.messages.Constant;
import com.kaankaplan.booke.core.config.security.jwt.JwtService;
import com.kaankaplan.booke.core.util.results.*;
import com.kaankaplan.booke.dto.LoginRequestDto;
import com.kaankaplan.booke.dto.LoginResponseDto;
import com.kaankaplan.booke.dto.RefreshRequestDto;
import com.kaankaplan.booke.dto.UserRegisterDto;
import com.kaankaplan.booke.modals.Reader;
import com.kaankaplan.booke.modals.RefreshToken;
import com.kaankaplan.booke.modals.RegistrableUser;
import com.kaankaplan.booke.modals.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.bcel.Const;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RegistrableUserService registrableUserService;
    private final ReaderService readerService;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    @Transactional
    @Override
    public DataResult<RegistrableUser> registerReader(UserRegisterDto userRegisterDto) {
        boolean isUserExist = registrableUserService.getUserByEmail(userRegisterDto.email()).isSuccess();
        if(isUserExist) {
            return new ErrorDataResult<>(Constant.USER_ALREADY_REGISTERED);
        }
        Role readerRole = roleService.getRoleByName("READER").getData();
        log.info("Reader role --> " + readerRole);
        RegistrableUser registrableUser =
                new RegistrableUser(
                        userRegisterDto.fullName(),
                        userRegisterDto.email(),
                        passwordEncoder.encode(userRegisterDto.password()),
                        readerRole
                );
        log.info("Registrable user is created ---> " + registrableUser);
        Reader reader =
                new Reader(
                    registrableUser.fullName,
                    registrableUser.email,
                    passwordEncoder.encode(userRegisterDto.password()),
                    readerRole
                );
        log.info("Reader is created ---> " + reader);
        DataResult<RegistrableUser> userDataResult = registrableUserService.save(registrableUser);
        readerService.saveReader(reader);
        return new SuccessDataResult<>(userDataResult.getData(), Constant.USER_SUCCESSFULLY_CREATED);
    }

    @Override
    public DataResult<LoginResponseDto> login(LoginRequestDto loginRequestDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDto.email(),
                        loginRequestDto.password()
                )
        );
        log.info("Authenticate user with email --> " + loginRequestDto.email());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User userPrincipal = (User) authentication.getPrincipal();
        String refreshToken = refreshTokenService.generateRefreshToken(loginRequestDto.email()).getData().refreshToken;
        RegistrableUser user = registrableUserService.getUserByEmail(loginRequestDto.email()).getData();
        log.info("user --> " + user);
        return new SuccessDataResult<>(
                new LoginResponseDto(
                        user.getUserId(),
                        loginRequestDto.email(),
                        jwtService.generateJwtToken(userPrincipal),
                        refreshToken
                ),
                Constant.USER_SUCCESSFULLY_LOGIN
        );
    }

    @Override
    public Result logout(RefreshRequestDto refreshRequestDto) {
        RefreshToken refreshToken = refreshTokenService.getRefreshToken(refreshRequestDto.refreshToken()).getData();

        if (refreshToken == null)
            return new ErrorResult(Constant.REFRESH_TOKEN_IS_NOT_FOUND);

        log.info("RefreshToken ---> " + refreshToken.refreshToken);

        refreshTokenService.deleteToken(refreshRequestDto.refreshToken());
        return new SuccessResult(Constant.LOGOUT);
    }

    @Override
    public DataResult<LoginResponseDto> refreshJwtToken(RefreshRequestDto refreshRequestDto) {
        RefreshToken refreshToken = refreshTokenService.getRefreshToken(refreshRequestDto.refreshToken()).getData();
        if(refreshToken == null)
            return new ErrorDataResult<>(Constant.REFRESH_TOKEN_IS_NOT_FOUND);

        RegistrableUser user = registrableUserService.getUserByEmail(refreshRequestDto.email()).getData();
        List<SimpleGrantedAuthority> grantedAuthorities = List.of(new SimpleGrantedAuthority(user.role.roleName));

        String newJwtToken = jwtService.generateJwtTokenWithEmail(refreshRequestDto.email(), grantedAuthorities);
        log.info("New jwt token --> " + newJwtToken);
        LoginResponseDto loginResponseDto = new LoginResponseDto(
                user.getUserId(),
                refreshRequestDto.email(),
                newJwtToken,
                refreshRequestDto.refreshToken()
        );
        return new SuccessDataResult<>(loginResponseDto);
    }
}