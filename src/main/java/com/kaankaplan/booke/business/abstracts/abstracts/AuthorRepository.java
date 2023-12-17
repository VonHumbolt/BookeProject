package com.kaankaplan.booke.business.abstracts.abstracts;

import com.kaankaplan.booke.modals.Author;

public interface AuthorRepository {

    Author getAuthorById(String authorId);

    Author save(Author author);
}
