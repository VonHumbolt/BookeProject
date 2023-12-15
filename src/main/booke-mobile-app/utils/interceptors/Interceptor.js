import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export default class Interceptor {
    token;
    refreshToken;
    email;
    axiosInstance;
    
    constructor() {
        SecureStore.getItemAsync("token").then(token => this.token = token);
        SecureStore.getItemAsync("refreshToken").then(token => this.refreshToken = token);
        SecureStore.getItemAsync("email").then(email => this.email = email);
        this.axiosInstance = axios.create({
            // <YOUR_LOCALHOST_IP>
            baseURL: "http://<YOUR_LOCALHOST_IP>:8080/"
        });

        // Request
        this.axiosInstance.interceptors.request.use( async (request) => {
            console.log("Request url --> " + request.url)
            if (this.token != null && request.url != "auth/refreshToken" && request.url != "auth/logout") {
                request.headers = {
                    ...request.headers,
                    Authorization: `Bearer ${this.token}`
                }
            }
            return request
        }, (error) => Promise.reject(error));

        // Response
        this.axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const originalConfig = error?.config;
                if(error.response) {
                    if (error.response.status == 403 && !originalConfig.sent) {
                        originalConfig.sent = true;
                        try {
                            const refreshRequest = {
                                email: this.email,
                                refreshToken: this.refreshToken
                            };
                            const result = await this.axiosInstance.post("auth/refreshToken", refreshRequest)
                            // New Token
                            console.log("Old Token --> " + this.token)
                            await SecureStore.deleteItemAsync("token");
                            this.token = result.data.data.token;
                            console.log("New token --> " + result.data.data.token);
                            SecureStore.setItemAsync("token", result.data.data.token);
                            originalConfig.headers = {
                                ...originalConfig.headers,
                                Authorization: `Bearer ${result.data.data.token}`
                            }
                            return this.axiosInstance(originalConfig);
                        } catch(err) {
                            return Promise.reject(err);
                        }
                    }
                }
                return Promise.reject(error);
            }
        )
    }

    getInstance() {
        return this.axiosInstance;
    }
}