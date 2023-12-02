package com.kaankaplan.booke.repositories.concretes;

import com.kaankaplan.booke.modals.Role;
import com.kaankaplan.booke.repositories.abstracts.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class RoleRepositoryImpl implements RoleRepository {

    private final ElasticsearchOperations elasticsearchOperations;

    @Override
    public Role getRoleByName(String roleName) {
        Criteria criteria = new Criteria("roleName").matches(roleName);
        CriteriaQuery query = new CriteriaQuery(criteria);
        SearchHits<Role> search = elasticsearchOperations.search(query, Role.class);
        List<Role> roleList = search.get().map(SearchHit::getContent).toList();
        return roleList.size() > 0 ? roleList.get(0) : null;
    }

    @Override
    public Role addNewRole(Role role) {
        return elasticsearchOperations.save(role);
    }

    @Override
    public void deleteRole(String roleName) {
        Criteria criteria = new Criteria("roleName").matches(roleName);
        CriteriaQuery query = new CriteriaQuery(criteria);
        SearchHits<Role> search = elasticsearchOperations.search(query, Role.class);
        List<Role> roleList = search.get().map(SearchHit::getContent).toList();
        elasticsearchOperations.delete(roleList.get(0), IndexCoordinates.of("role"));
    }
}
