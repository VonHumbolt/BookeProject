package com.kaankaplan.booke.repositories.abstracts;

import com.kaankaplan.booke.modals.Book;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElasticBookRepository extends ElasticsearchRepository<Book, String> {
}
