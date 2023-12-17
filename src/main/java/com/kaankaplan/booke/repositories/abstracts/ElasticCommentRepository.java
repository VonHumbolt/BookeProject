package com.kaankaplan.booke.repositories.abstracts;

import com.kaankaplan.booke.modals.Comment;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElasticCommentRepository extends ElasticsearchRepository<Comment, String> {
}
