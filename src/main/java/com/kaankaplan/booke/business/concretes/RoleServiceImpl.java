package com.kaankaplan.booke.business.concretes;

import com.kaankaplan.booke.business.abstracts.RoleService;
import com.kaankaplan.booke.business.messages.Constant;
import com.kaankaplan.booke.core.util.results.*;
import com.kaankaplan.booke.modals.Role;
import com.kaankaplan.booke.repositories.abstracts.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public DataResult<Role> getRoleByName(String roleName) {
        return new SuccessDataResult<>(roleRepository.getRoleByName(roleName));
    }

    @Override
    public DataResult<Role> addNewRole(String roleName) {
        Role role = new Role(roleName);
        log.info("New Role --> " +  role);
        return new SuccessDataResult<>(roleRepository.addNewRole(role));
    }

    @Override
    public Result deleteRole(String roleName) {
        Role role = roleRepository.getRoleByName(roleName);
        if(role == null)
            return new ErrorResult(Constant.ROLE_NOT_FOUND);

        roleRepository.deleteRole(roleName);
        return new SuccessResult(Constant.ROLE_DELETED_SUCCESSFULLY);
    }
}
