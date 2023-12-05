import axios from "axios";

export default class AuthService {
    apiUrl = "http://<YOUR_LOCALHOST_IP>:8080/auth/";

    login(credentials) {
        return axios.post(this.apiUrl + "login", credentials);
    }

    register(credentials) {
        return axios.post(this.apiUrl + "register", credentials);
    }
}