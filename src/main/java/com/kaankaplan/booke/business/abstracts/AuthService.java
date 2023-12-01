package com.kaankaplan.booke.business.abstracts;

import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.dto.LoginRequestDto;
import com.kaankaplan.booke.dto.LoginResponseDto;
import com.kaankaplan.booke.dto.UserRegisterDto;
import com.kaankaplan.booke.modals.RegistrableUser;

public interface AuthService {

    DataResult<RegistrableUser> registerReader(UserRegisterDto userRegisterDto);

    DataResult<LoginResponseDto> login(LoginRequestDto loginRequestDto);
}
