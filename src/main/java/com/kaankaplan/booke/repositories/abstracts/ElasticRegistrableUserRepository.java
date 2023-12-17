package com.kaankaplan.booke.repositories.abstracts;

import com.kaankaplan.booke.modals.RegistrableUser;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElasticRegistrableUserRepository extends ElasticsearchRepository<RegistrableUser, String> {
}
