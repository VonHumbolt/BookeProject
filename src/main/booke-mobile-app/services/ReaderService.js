import Interceptor from "../utils/interceptors/Interceptor";

export default class ReaderService {
    apiUrl = "reader/";
    axiosInstance;

    constructor() {
        this.axiosInstance = new Interceptor().getInstance();
    }

    getReaderByEmail(email) {
        return this.axiosInstance.get(this.apiUrl + "getReaderByEmail/" + email);
    }
    
    getReaderById(readerId) {
        return this.axiosInstance.get(this.apiUrl + "getReaderById/" + readerId);
    }

    getReaderFollows(readerId) {
        return this.axiosInstance.get(this.apiUrl + "getReaderFollows/" + readerId);
    }

    getReaderFollowers(readerId) {
        return this.axiosInstance.get(this.apiUrl + "getReaderFollowers/" + readerId);
    }

    getBookStatusForUser(userId, bookId) {
        return this.axiosInstance.get(this.apiUrl + "getBookStatus/" + userId + "/" + bookId);
    }

    addBookIntoWantToReads(userId, bookId) {
        return this.axiosInstance.post(this.apiUrl + "addWantToRead/" + userId + "/" + bookId, {});
    }

    addBookIntoCurrentlyReadings(userId, bookId) {
        return this.axiosInstance.post(this.apiUrl + "addCurrentlyBook/" + userId + "/" + bookId, {});
    }

    addBookIntoReads(userId, bookId) {
        return this.axiosInstance.post(this.apiUrl + "addRead/" + userId + "/" + bookId, {});
    }

    startReadingChallenge(userId, target) {
        return this.axiosInstance.post(this.apiUrl + "startChallenge/" + userId + "/" + target, {})
    }

    searchReader(name) {
        return this.axiosInstance.get(this.apiUrl + "search/" + name);
    }

    follow(userId, wantToFollowUserId) {
        return this.axiosInstance.post(this.apiUrl + "follow/" + userId + "/" + wantToFollowUserId, {});
    }

    unfollow(userId, wantToUnfollowUserId) {
        return this.axiosInstance.post(this.apiUrl + "unfollow/" + userId + "/" + wantToUnfollowUserId, {});
    }

    updateProfileImage(userId, formData) {
        return this.axiosInstance.post(this.apiUrl + "updateProfileImage/" + userId, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    }
}