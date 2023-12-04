package com.kaankaplan.booke.controllers;

import com.kaankaplan.booke.business.abstracts.AuthService;
import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.core.util.results.Result;
import com.kaankaplan.booke.dto.LoginRequestDto;
import com.kaankaplan.booke.dto.LoginResponseDto;
import com.kaankaplan.booke.dto.RefreshRequestDto;
import com.kaankaplan.booke.dto.UserRegisterDto;
import com.kaankaplan.booke.modals.RegistrableUser;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("register")
    public DataResult<RegistrableUser> registerReader(@RequestBody UserRegisterDto userRegisterDto) {
        return authService.registerReader(userRegisterDto);
    }

    @PostMapping("login")
    public DataResult<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        return authService.login(loginRequestDto);
    }

    @PostMapping("logout")
    public Result logout(@RequestBody RefreshRequestDto refreshRequestDto) {
        return authService.logout(refreshRequestDto);
    }

    @PostMapping("refreshToken")
    public DataResult<LoginResponseDto> refreshJwtToken(@RequestBody RefreshRequestDto refreshRequestDto) {
        return authService.refreshJwtToken(refreshRequestDto);
    }

}
