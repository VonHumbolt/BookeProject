package com.kaankaplan.booke.business.abstracts;

import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.core.util.results.Result;
import com.kaankaplan.booke.dto.PostDto;
import com.kaankaplan.booke.modals.Post;

import java.util.List;

public interface PostService {

    DataResult<Post> saveOrUpdate(PostDto postDto);

    DataResult<List<Post>> getUserFollowsPost(String userId);

    Result likePost(String userId, String postId);

    Result unlikePost(String userId, String postId);
}
