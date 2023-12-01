package com.kaankaplan.booke.business.abstracts;

import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.modals.Reader;

public interface ReaderService {

    DataResult<Reader> saveReader(Reader reader);
}
