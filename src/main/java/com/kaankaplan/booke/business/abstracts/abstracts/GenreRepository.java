package com.kaankaplan.booke.business.abstracts.abstracts;


import com.kaankaplan.booke.modals.Genre;

import java.util.List;

public interface GenreRepository {

    Genre saveOrUpdate(Genre genre);

    List<Genre> getFirstThreeGenres();

    Genre getGenreById(String genreId);
}
