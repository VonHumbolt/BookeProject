package com.kaankaplan.booke.business.abstracts.abstracts;

import com.kaankaplan.booke.modals.Reader;

import java.util.List;

public interface ReaderRepository {

    Reader saveReader(Reader reader);

    Reader getReaderById(String userId);

    Reader getReaderByEmail(String email);

    List<Reader> searchUserAutocomplete(String fullName);
}
