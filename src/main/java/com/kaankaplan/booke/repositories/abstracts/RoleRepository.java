package com.kaankaplan.booke.repositories.abstracts;

import com.kaankaplan.booke.modals.Role;

public interface RoleRepository {

    Role getRoleByName(String roleName);

    Role addNewRole(String roleName);

    void deleteRole(String roleName);
}
