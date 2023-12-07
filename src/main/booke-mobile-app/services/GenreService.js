import Interceptor from "../utils/interceptors/Interceptor";

export default class GenreService {
    apiUrl = "genre/";
    axiosInstance;

    constructor() {
        this.axiosInstance = new Interceptor().getInstance();
    }

    getGenres() {
        return this.axiosInstance.get(this.apiUrl + "getall");
    }
}