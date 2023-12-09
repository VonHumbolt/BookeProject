package com.kaankaplan.booke.business.abstracts;

import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.modals.Comment;

public interface CommentService {

    DataResult<Comment> saveComment(Comment comment);
}
