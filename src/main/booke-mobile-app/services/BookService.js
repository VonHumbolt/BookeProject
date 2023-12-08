import Interceptor from "../utils/interceptors/Interceptor";

export default class BookService {
    apiUrl = "book/";
    axiosInstance;

    constructor() {
        this.axiosInstance = new Interceptor().getInstance();
    }

    getBookById(bookId) {
        return this.axiosInstance.get(this.apiUrl + "getBookById/" + bookId);
    }

    search(title) {
        console.log(this.apiUrl + "search/" + title)
        return this.axiosInstance.get(this.apiUrl + "search/" + title);
    }

    addReviewToBook(bookId, review) {
        return this.axiosInstance.post(this.apiUrl + "addReviewToBook/" + bookId, review);
    }
}