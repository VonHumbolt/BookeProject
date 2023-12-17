package com.kaankaplan.booke.business.concretes;

import com.kaankaplan.booke.business.abstracts.GenreService;
import com.kaankaplan.booke.business.messages.Constant;
import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.core.util.results.ErrorDataResult;
import com.kaankaplan.booke.core.util.results.SuccessDataResult;
import com.kaankaplan.booke.modals.Book;
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

    @Cacheable(value = "genres")
    @Override
    public DataResult<List<Genre>> getFirstThreeGenres() {
        return new SuccessDataResult<>(genreRepository.getFirstThreeGenres());
    }

    @Override
    public DataResult<Genre> addBooksToGenre(String genreId, List<Book> books) {
        Genre genre = genreRepository.getGenreById(genreId);
        if(genre == null)
            return new ErrorDataResult<>(Constant.GENRE_NOT_FOUND);

        genre.books.addAll(books);
        return new SuccessDataResult<>(genreRepository.saveOrUpdate(genre));
    }
}
