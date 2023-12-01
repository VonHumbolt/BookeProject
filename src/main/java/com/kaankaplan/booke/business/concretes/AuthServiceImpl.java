package com.kaankaplan.booke.business.concretes;

import com.kaankaplan.booke.business.abstracts.AuthService;
import com.kaankaplan.booke.business.abstracts.ReaderService;
import com.kaankaplan.booke.business.abstracts.RegistrableUserService;
import com.kaankaplan.booke.business.messages.Constant;
import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.core.util.results.SuccessDataResult;
import com.kaankaplan.booke.dto.LoginRequestDto;
import com.kaankaplan.booke.dto.LoginResponseDto;
import com.kaankaplan.booke.dto.UserRegisterDto;
import com.kaankaplan.booke.modals.Reader;
import com.kaankaplan.booke.modals.RegistrableUser;
import com.kaankaplan.booke.modals.Role;
import com.kaankaplan.booke.repositories.abstracts.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RegistrableUserService registrableUserService;
    private final ReaderService readerService;

    @Transactional
    @Override
    public DataResult<RegistrableUser> registerReader(UserRegisterDto userRegisterDto) {
        Role readerRole = roleRepository.getRoleByName("READER");
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
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new SuccessDataResult<>(
                new LoginResponseDto(
                        "",
                        loginRequestDto.email(),
                        "token", // TODO -1 : Create token service for generating jwt token
                        "refreshtoke" // TODO -2 : Create refresh token service and generate refresh token
                ),
                Constant.USER_SUCCESSFULLY_LOGIN
        );
    }
}
