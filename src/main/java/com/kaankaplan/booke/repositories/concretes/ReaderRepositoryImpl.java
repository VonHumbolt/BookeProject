package com.kaankaplan.booke.repositories.concretes;

import co.elastic.clients.elasticsearch._types.query_dsl.FuzzyQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import com.kaankaplan.booke.modals.Reader;
import com.kaankaplan.booke.repositories.abstracts.ReaderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
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
public class ReaderRepositoryImpl implements ReaderRepository {

    private final ElasticsearchOperations elasticsearchOperations;

    @Override
    public Reader saveReader(Reader reader) {
        return elasticsearchOperations.save(reader);
    }

    @Override
    public Reader getReaderById(String userId) {
        return elasticsearchOperations.get(userId, Reader.class);
    }

    @Override
    public Reader getReaderByEmail(String email) {
        Criteria criteria = new Criteria("email").is(email);
        Query query = new CriteriaQuery(criteria);
        SearchHits<Reader> search = elasticsearchOperations.search(query, Reader.class);
        List<Reader> readers = search.get().map(SearchHit::getContent).toList();
        return readers.size() > 0 ? readers.get(0) : null;
    }

    @Override
    public List<Reader> searchUserAutocomplete(String fullName) {
        FuzzyQuery fuzzyQuery = QueryBuilders.fuzzy(f -> f.field("fullName").fuzziness("1").value(fullName)).fuzzy();
        Query query = NativeQuery.builder().withQuery(fuzzyQuery._toQuery()).withPageable(PageRequest.of(0, 5)).build();
        SearchHits<Reader> search = elasticsearchOperations.search(query, Reader.class);
        return search.get().map(SearchHit::getContent).toList();
    }
}
