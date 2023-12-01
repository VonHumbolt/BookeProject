package com.kaankaplan.booke.repositories.concretes;

import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import com.kaankaplan.booke.modals.Genre;
import com.kaankaplan.booke.repositories.abstracts.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class GenreRepositoryImpl implements GenreRepository {

    private final ElasticsearchOperations elasticsearchOperations;

    @Override
    public List<Genre> getAllGenres() {
        Query query = NativeQuery.builder()
                .withQuery(q -> q
                        .matchAll(m -> m
                        )
                )
                .withPageable(PageRequest.of(0,3))
                .build();

        SearchHits<Genre> search = elasticsearchOperations.search(query, Genre.class);
        return search.get().map(SearchHit::getContent).toList();
    }
}
