package com.kaankaplan.booke.business.abstracts;

import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.modals.Genre;

import java.util.List;

public interface GenreService {

    DataResult<Genre> saveOrUpdate(String genreName);

    DataResult<List<Genre>> getFirstThreeGenres();
}
