package com.kaankaplan.booke.business.abstracts;

import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.core.util.results.Result;
import com.kaankaplan.booke.modals.Role;

public interface RoleService {

    DataResult<Role> getRoleByName(String roleName);

    DataResult<Role> addNewRole(String roleName);

    Result deleteRole(String roleName);
}
