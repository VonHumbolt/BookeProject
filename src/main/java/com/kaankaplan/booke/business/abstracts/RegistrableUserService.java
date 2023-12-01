package com.kaankaplan.booke.business.abstracts;

import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.modals.RegistrableUser;

public interface RegistrableUserService {

    DataResult<RegistrableUser> getUserByEmail(String email);

    DataResult<RegistrableUser> getUserById(String userId);

    DataResult<RegistrableUser> save(RegistrableUser registrableUser);

}
