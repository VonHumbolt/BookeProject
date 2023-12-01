package com.kaankaplan.booke.repositories.concretes;

import co.elastic.clients.elasticsearch._types.query_dsl.FuzzyQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import com.kaankaplan.booke.modals.Book;
import com.kaankaplan.booke.repositories.abstracts.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BookRepositoryImpl implements BookRepository {

    private final ElasticsearchOperations elasticsearchOperations;

    @Override
    public Book getBookById(String bookId) {
        Criteria criteria = new Criteria("bookId").matches(bookId);
        CriteriaQuery query = new CriteriaQuery(criteria);
        SearchHits<Book> search = elasticsearchOperations.search(query, Book.class);
        List<Book> bookList = search.get().map(SearchHit::getContent).toList();
        return bookList.size() > 0 ? bookList.get(0) : null;
    }

    @Override
    public List<Book> searchBooksAutocomplete(String title) {
        FuzzyQuery fuzzyQuery = QueryBuilders.fuzzy(q -> q.field("title").fuzziness("1").value(title)).fuzzy();
        NativeQuery query = NativeQuery.builder().withQuery(fuzzyQuery._toQuery()).withPageable(PageRequest.of(0, 5)).build();
        SearchHits<Book> search = elasticsearchOperations.search(query, Book.class);
        return search.get().map(SearchHit::getContent).toList();
    }
}
