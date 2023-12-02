package com.kaankaplan.booke.controllers;

import com.kaankaplan.booke.business.abstracts.AuthorService;
import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.dto.AuthorDto;
import com.kaankaplan.booke.modals.Author;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/author/")
@RequiredArgsConstructor
public class AuthorController {

    private final AuthorService authorService;

    @PostMapping("addAuthor")
    public DataResult<Author> addNewAuthor(@RequestBody AuthorDto authorDto) {
        return authorService.addAuthor(authorDto);
    }

    @GetMapping("getAuthorById/{authorId}")
    public DataResult<Author> getAuthorById(@PathVariable String authorId) {
        return authorService.getAuthorById(authorId);
    }
}
