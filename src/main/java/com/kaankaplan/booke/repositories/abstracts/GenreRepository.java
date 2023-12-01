package com.kaankaplan.booke.repositories.abstracts;


import com.kaankaplan.booke.modals.Genre;

import java.util.List;

public interface GenreRepository {

    List<Genre> getAllGenres();
}
