package com.kaankaplan.booke.business.concretes;

import com.kaankaplan.booke.business.abstracts.GenreService;
import com.kaankaplan.booke.business.messages.Constant;
import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.core.util.results.SuccessDataResult;
import com.kaankaplan.booke.modals.Genre;
import com.kaankaplan.booke.repositories.abstracts.GenreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class GenreServiceImpl implements GenreService {

    private final GenreRepository genreRepository;

    @Transactional
    @CacheEvict(value = "genres", allEntries = true)
    @Override
    public DataResult<Genre> saveOrUpdate(String genreName) {
        Genre genre = new Genre(genreName);
        return new SuccessDataResult<>(genreRepository.saveOrUpdate(genre), Constant.ADD_NEW_GENRE);
    }

    // TODO: Add books into genre!

    @Cacheable(value = "genres")
    @Override
    public DataResult<List<Genre>> getFirstThreeGenres() {
        return new SuccessDataResult<>(genreRepository.getFirstThreeGenres());
    }
}
