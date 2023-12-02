package com.kaankaplan.booke.repositories.concretes;

import com.kaankaplan.booke.modals.Reader;
import com.kaankaplan.booke.repositories.abstracts.ReaderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;

import org.springframework.stereotype.Repository;

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
}
