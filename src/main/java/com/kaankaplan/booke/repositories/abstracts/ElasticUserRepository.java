package com.kaankaplan.booke.repositories.abstracts;

import com.kaankaplan.booke.modals.User;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElasticUserRepository extends ElasticsearchRepository<User, String> {
}
