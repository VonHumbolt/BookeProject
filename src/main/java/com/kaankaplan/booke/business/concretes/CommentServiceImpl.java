package com.kaankaplan.booke.business.concretes;

import com.kaankaplan.booke.business.abstracts.CommentService;
import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.core.util.results.SuccessDataResult;
import com.kaankaplan.booke.modals.Comment;
import com.kaankaplan.booke.repositories.abstracts.ElasticCommentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final ElasticCommentRepository commentRepository;

    @Override
    public DataResult<Comment> saveComment(Comment comment) {
        return new SuccessDataResult<>(commentRepository.save(comment));
    }
}
