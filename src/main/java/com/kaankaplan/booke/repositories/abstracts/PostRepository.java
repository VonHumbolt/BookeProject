package com.kaankaplan.booke.repositories.abstracts;

import com.kaankaplan.booke.modals.Post;

public interface PostRepository {

    Post saveOrUpdate(Post post);

    Post getPostById(String postId);
}
