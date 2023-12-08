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
}