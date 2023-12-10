package com.kaankaplan.booke.repositories.abstracts;

import com.kaankaplan.booke.modals.Post;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElasticPostRepository extends ElasticsearchRepository<Post, String> {
}
