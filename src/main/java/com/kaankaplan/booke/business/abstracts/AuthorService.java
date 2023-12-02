package com.kaankaplan.booke.business.abstracts;

import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.dto.AuthorDto;
import com.kaankaplan.booke.modals.Author;

public interface AuthorService {

    DataResult<Author> addAuthor(AuthorDto authorDto);

    DataResult<Author> getAuthorById(String authorId);
}
