package com.kaankaplan.booke.business.concretes;

import com.kaankaplan.booke.business.abstracts.AuthorService;
import com.kaankaplan.booke.business.messages.Constant;
import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.core.util.results.ErrorDataResult;
import com.kaankaplan.booke.core.util.results.SuccessDataResult;
import com.kaankaplan.booke.dto.AuthorDto;
import com.kaankaplan.booke.modals.Author;
import com.kaankaplan.booke.repositories.abstracts.AuthorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService {

    private final AuthorRepository authorRepository;

    @Override
    public DataResult<Author> addAuthor(AuthorDto authorDto) {
        log.info("Add author-->" + authorDto);
        Author author = new Author(authorDto.fullName());
        return new SuccessDataResult<>(authorRepository.save(author), Constant.ADD_NEW_AUTHOR);
    }

    @Override
    public DataResult<Author> getAuthorById(String authorId) {
        Author author = authorRepository.getAuthorById(authorId);
        return author != null ? new SuccessDataResult<>(author) : new ErrorDataResult<>(Constant.AUTHOR_NOT_FOUND);
    }
}
