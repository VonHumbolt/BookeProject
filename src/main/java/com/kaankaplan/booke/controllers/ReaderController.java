package com.kaankaplan.booke.controllers;

import com.kaankaplan.booke.business.abstracts.ReaderService;
import com.kaankaplan.booke.core.util.results.DataResult;
import com.kaankaplan.booke.core.util.results.Result;
import com.kaankaplan.booke.dto.BookStatusDto;
import com.kaankaplan.booke.modals.Reader;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping("getReaderByEmail/{email}")
    public DataResult<Reader> getReaderByEmail(@PathVariable String email) {
        return readerService.getReaderByEmail(email);
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

    @GetMapping("getBookStatus/{readerId}/{bookId}")
    public DataResult<BookStatusDto> getBookCurrentStatusForReader(@PathVariable String readerId, @PathVariable String bookId){
        return readerService.getBookCurrentStatusForReader(readerId, bookId);
    }

    @PostMapping("addCurrentlyBook/{readerId}/{bookId}")
    public Result addBookIntoCurrentlyReadings(@PathVariable String readerId, @PathVariable String bookId){
        return readerService.addBookIntoCurrentlyReadings(readerId, bookId);
    }

    @PostMapping("addWantToRead/{readerId}/{bookId}")
    Result addBookIntoWantToReads(@PathVariable String readerId, @PathVariable String bookId) {
        return readerService.addBookIntoWantToReads(readerId, bookId);
    }

    @PostMapping("addRead/{readerId}/{bookId}")
    Result addBookIntoReads(@PathVariable String readerId, @PathVariable String bookId) {
        return readerService.addBookIntoReads(readerId, bookId);
    }

    @GetMapping("search/{fullName}")
    public DataResult<List<Reader>> searchReaderAutocomplete(@PathVariable String fullName) {
        return readerService.searchReaderAutocomplete(fullName);
    }

    @PostMapping("updateProfileImage/{userId}")
    public Result updateProfileImage(@PathVariable String userId, @RequestPart("image") MultipartFile multipartFile) {
        return readerService.updateProfileImage(userId, multipartFile);
    }

    @PostMapping("startChallenge/{userId}/{target}")
    public Result startReadingChallenge(@PathVariable String userId, @PathVariable int target) {
        return readerService.startReadingChallenge(userId, target);
    }
}
