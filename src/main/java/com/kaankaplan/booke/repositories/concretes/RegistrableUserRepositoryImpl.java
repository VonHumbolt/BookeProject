package com.kaankaplan.booke.repositories.concretes;

import com.kaankaplan.booke.modals.RegistrableUser;
import com.kaankaplan.booke.repositories.abstracts.RegistrableUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class RegistrableUserRepositoryImpl implements RegistrableUserRepository {

    private final ElasticsearchOperations elasticsearchOperations;

    @Override
    public RegistrableUser getUserById(String id) {
        return elasticsearchOperations.get(id, RegistrableUser.class);
    }

    @Override
    public RegistrableUser getUserByEmail(String email) {
        Criteria criteria = new Criteria("email").is(email);
        Query query = new CriteriaQuery(criteria);
        SearchHits<RegistrableUser> search = elasticsearchOperations.search(query, RegistrableUser.class);
        List<RegistrableUser> registrableUsers = search.get().map(SearchHit::getContent).toList();
        return registrableUsers.size() > 0 ? registrableUsers.get(0) : null;
    }

    @Override
    public RegistrableUser save(RegistrableUser registrableUser) {
        return elasticsearchOperations.save(registrableUser);
    }
}
