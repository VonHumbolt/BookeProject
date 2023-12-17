package com.kaankaplan.booke.business.abstracts.abstracts;

import com.kaankaplan.booke.modals.Role;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElasticRoleRepository extends ElasticsearchRepository<Role, String> {
}
