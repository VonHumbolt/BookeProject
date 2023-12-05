import Interceptor from "../utils/interceptors/Interceptor";

export default class BookService {
    apiUrl = "book/";
    axiosInstance;

    constructor() {
        this.axiosInstance = new Interceptor().getInstance();
    }

    search(title) {
        console.log(this.apiUrl + "search/" + title)
        return this.axiosInstance.get(this.apiUrl + "search/" + title);
    }
}