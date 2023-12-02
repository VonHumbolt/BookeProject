package com.kaankaplan.booke.controllers;

import com.kaankaplan.booke.business.abstracts.ReaderService;
import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.core.util.results.Result;
import com.kaankaplan.booke.modals.Reader;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reader/")
@RequiredArgsConstructor
public class ReaderController {

    private final ReaderService readerService;

    @GetMapping("getReaderById/{userId}")
    public DataResult<Reader> getReaderById(@PathVariable String userId){
        return readerService.getReaderById(userId);
    }

    @GetMapping("getReaderFollows/{userId}")
    public DataResult<List<Reader>> getReaderFollows(@PathVariable String userId){
        return readerService.getReadersFollows(userId);
    }

    @GetMapping("getReaderFollowers/{userId}")
    public DataResult<List<Reader>> getReaderFollowers(@PathVariable String userId){
        return readerService.getReadersFollowers(userId);
    }

    @PostMapping("follow/{userId}/{wantToFollowUserId}")
    public Result follow(@PathVariable String userId, @PathVariable String wantToFollowUserId) {
        return readerService.follow(userId, wantToFollowUserId);
    }

    @PostMapping("unfollow/{userId}/{wantToUnfollowUserId}")
    public Result unfollow(@PathVariable String userId, @PathVariable String wantToUnfollowUserId) {
        return readerService.unfollow(userId, wantToUnfollowUserId);
    }
}
