package com.kaankaplan.booke.business.abstracts.abstracts;

import com.kaankaplan.booke.modals.RegistrableUser;

public interface RegistrableUserRepository {

    RegistrableUser getUserById(String id);

    RegistrableUser getUserByEmail(String email);

    RegistrableUser save(RegistrableUser registrableUser);
}
