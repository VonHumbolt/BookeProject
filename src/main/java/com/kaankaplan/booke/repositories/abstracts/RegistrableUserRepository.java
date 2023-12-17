package com.kaankaplan.booke.repositories.abstracts;

import com.kaankaplan.booke.modals.RegistrableUser;

public interface RegistrableUserRepository {

    RegistrableUser getUserById(String id);

    RegistrableUser getUserByEmail(String email);

    RegistrableUser save(RegistrableUser registrableUser);
}
