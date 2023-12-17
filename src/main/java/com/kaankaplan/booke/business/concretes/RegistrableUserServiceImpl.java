package com.kaankaplan.booke.business.concretes;

import com.kaankaplan.booke.business.abstracts.RegistrableUserService;
import com.kaankaplan.booke.business.messages.Constant;
import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.core.util.results.ErrorDataResult;
import com.kaankaplan.booke.core.util.results.SuccessDataResult;
import com.kaankaplan.booke.modals.RegistrableUser;
import com.kaankaplan.booke.repositories.abstracts.RegistrableUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Slf4j
@RequiredArgsConstructor
public class RegistrableUserServiceImpl implements RegistrableUserService, UserDetailsService {

    private final RegistrableUserRepository registrableUserRepository;

    @Override
    public DataResult<RegistrableUser> getUserByEmail(String email) {
        RegistrableUser user = registrableUserRepository.getUserByEmail(email);
        log.info("getUserByEmail method --> return user: " + user);
        return user != null ? new SuccessDataResult<>(user) : new ErrorDataResult<>(Constant.USER_DOES_NOT_EXIST_WITH_GIVEN_EMAIL);
    }

    @Override
    public DataResult<RegistrableUser> getUserById(String userId) {
        RegistrableUser user = registrableUserRepository.getUserById(userId);
        log.info("getUserById method --> return user: " + user);
        return user != null ? new SuccessDataResult<>(user) : new ErrorDataResult<>(Constant.USER_DOES_NOT_EXIST_WITH_GIVEN_USERID);
    }

    @Transactional
    @Override
    public DataResult<RegistrableUser> save(RegistrableUser registrableUser) {
        return new SuccessDataResult<>(registrableUserRepository.save(registrableUser));
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        RegistrableUser user = registrableUserRepository.getUserByEmail(email);
        log.info("loadUserByUsername ---> user: " + user);
        System.out.println("loadUserByUsername ---> user: " + user);
        if(user == null)
            throw new UsernameNotFoundException(Constant.USER_DOES_NOT_EXIST_WITH_GIVEN_EMAIL);

        return new User(
                        email,
                        user.getPassword(),
                        List.of(new SimpleGrantedAuthority(user.role.roleName))
                    );
    }
}
