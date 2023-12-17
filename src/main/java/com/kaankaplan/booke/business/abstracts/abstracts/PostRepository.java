package com.kaankaplan.booke.business.abstracts.abstracts;

import com.kaankaplan.booke.modals.Post;

public interface PostRepository {

    Post saveOrUpdate(Post post);

    Post getPostById(String postId);
}
