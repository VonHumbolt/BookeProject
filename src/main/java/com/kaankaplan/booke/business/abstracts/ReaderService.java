package com.kaankaplan.booke.business.abstracts;

import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.core.util.results.Result;
import com.kaankaplan.booke.modals.Post;
import com.kaankaplan.booke.modals.Reader;

import java.util.List;

public interface ReaderService {

    DataResult<Reader> saveReader(Reader reader);

    DataResult<Reader> getReaderById(String userId);
    DataResult<List<Reader>> getReadersFollows(String userId);
    DataResult<List<Reader>> getReadersFollowers(String userId);

    Result follow(String userId, String wantToFollowUserId);

    Result unfollow(String userId, String wantToUnfollowUserId);

    Result addPostToReader(String userId, Post post);

    Result updateUserPost(Post post);
}
