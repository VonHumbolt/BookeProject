package com.kaankaplan.booke.controllers;

import com.kaankaplan.booke.business.abstracts.GenreService;
import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.modals.Book;
import com.kaankaplan.booke.modals.Genre;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/genre/")
@RequiredArgsConstructor
public class GenreController {

    private final GenreService genreService;

    @PostMapping("addGenre/{genreName}")
    public DataResult<Genre> addGenre(@PathVariable String genreName) {
        return genreService.saveOrUpdate(genreName);
    }

    @PostMapping("addBooksToGenre/{genreId}")
    public DataResult<Genre> addBooksToGenre(@PathVariable String genreId, @RequestBody List<Book> books) {
        return genreService.addBooksToGenre(genreId, books);
    }

    @GetMapping("getall")
    public DataResult<List<Genre>> getFirst3Genres() {
        return genreService.getFirstThreeGenres();
    }
}
