package com.kaankaplan.booke.business.concretes;

import com.kaankaplan.booke.business.abstracts.ReaderService;
import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.core.util.results.SuccessDataResult;
import com.kaankaplan.booke.modals.Reader;
import com.kaankaplan.booke.repositories.abstracts.ReaderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReaderServiceImpl implements ReaderService {

    private final ReaderRepository readerRepository;

    @Transactional
    @Override
    public DataResult<Reader> saveReader(Reader reader) {
        return new SuccessDataResult<>(readerRepository.saveReader(reader));
    }
}
