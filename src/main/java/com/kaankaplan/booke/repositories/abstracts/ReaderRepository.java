package com.kaankaplan.booke.repositories.abstracts;

import com.kaankaplan.booke.modals.Reader;

public interface ReaderRepository {

    Reader saveReader(Reader reader);

    Reader getReaderById(String userId);
}
