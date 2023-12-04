package com.kaankaplan.booke.business.concretes;

import com.kaankaplan.booke.business.abstracts.PostService;
import com.kaankaplan.booke.business.abstracts.ReaderService;
import com.kaankaplan.booke.business.messages.Constant;
import com.kaankaplan.booke.core.util.results.*;
import com.kaankaplan.booke.dto.PostDto;
import com.kaankaplan.booke.modals.Post;
import com.kaankaplan.booke.modals.Reader;
import com.kaankaplan.booke.repositories.abstracts.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final ReaderService readerService;

    @Transactional
    @Override
    public DataResult<Post> saveOrUpdate(PostDto postDto) {
        Post post = new Post(postDto.userId(), postDto.fullName(), postDto.profilePictureUrl(),
                postDto.activity(), postDto.bookName(), postDto.authorName(), postDto.bookImageUrl());
        log.info("Post ---> " + post);
        Post savedPost = postRepository.saveOrUpdate(post);
        log.info("Saved Post ---> " + savedPost);
        readerService.addPostToReader(postDto.userId(), savedPost.getPostId());
        return new SuccessDataResult<>(savedPost, Constant.POST_CREATED);
    }

    @Override
    public DataResult<List<Post>> getUserFollowsPost(String userId) {
        DataResult<List<Reader>> result = readerService.getReadersFollows(userId);
        if(!result.isSuccess()) {
            return new ErrorDataResult<>(Constant.READER_WAS_NOT_FOUND);
        }
        List<Post> timelinePosts = new ArrayList<>();
        List<Reader> readerFollows = result.getData();
        for(Reader reader : readerFollows) {
            timelinePosts.addAll(getReaderPostDetail(reader));
        }
        log.info("timelinePosts ---> " + timelinePosts);
        timelinePosts.sort(Comparator.comparing(Post::getPublishedDate));
        Collections.reverse(timelinePosts);
        log.info("timelinePosts with sorted ---> " + timelinePosts);
        return new SuccessDataResult<>(timelinePosts);
    }

    private List<Post> getReaderPostDetail(Reader reader) {
        List<Post> posts = new ArrayList<>();
        for(String postId : reader.postIdList) {
            Post post = postRepository.getPostById(postId);
            log.info("Post Date ---> " + post.publishedDate);
            posts.add(post);
        }
        posts.sort(Comparator.comparing(Post::getPublishedDate));
        Collections.reverse(posts);
        return posts.size() > 5 ? posts.subList(0, 5) : posts;
    }

    @Transactional
    @Override
    public Result likePost(String userId, String postId) {
        Post post = postRepository.getPostById(postId);
        if (post == null)
            return new ErrorResult(Constant.POST_NOT_FOUND);

        post.likeCount += 1;
        post.usersWhoLikePost.add(userId);
        postRepository.saveOrUpdate(post);
        return new SuccessResult(Constant.LIKE_POST);
    }

    @Transactional
    @Override
    public Result unlikePost(String userId, String postId) {
        Post post = postRepository.getPostById(postId);
        if (post == null)
            return new ErrorResult(Constant.POST_NOT_FOUND);
        // TODO: Kullanıcı karşısına çıkan post'u daha önce beğenip beğenmediğini nasıl görecek?
        post.likeCount -= 1;
        post.usersWhoLikePost.remove(userId);
        postRepository.saveOrUpdate(post);
        return new SuccessResult(Constant.UNLIKE_POST);
    }
}