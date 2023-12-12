import axios from "axios";

export default class AuthService {
    // <YOUR_LOCALHOST_IP>
    apiUrl = "http://<YOUR_LOCALHOST_IP>:8080/auth/";

    login(credentials) {
        return axios.post(this.apiUrl + "login", credentials);
    }

    register(credentials) {
        return axios.post(this.apiUrl + "register", credentials);
    }

    logout(refreshRequestDto) {
        return axios.post(this.apiUrl + "logout", refreshRequestDto);
    }
}