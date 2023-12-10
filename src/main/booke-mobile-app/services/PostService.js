import Interceptor from "../utils/interceptors/Interceptor";

export default class PostService {
    apiUrl = "post/";
    axiosInstance;

    constructor() {
        this.axiosInstance = new Interceptor().getInstance();
    }

    getUserFollowsPost(userId, pageNo, pageSize) {
        return this.axiosInstance.get(this.apiUrl + "getUserFollowsPost/" + userId + "/" + pageNo + "/" + pageSize);
    }

    addCommentToPost(postId, comment) {
        return this.axiosInstance.post(this.apiUrl + "addCommentToPost/" + postId, comment);
    }
    
    likePost(userId, postId) {
        return this.axiosInstance.post(this.apiUrl + "likePost/" + userId + "/" + postId, {});
    }

    unlikePost(userId, postId) {
        return this.axiosInstance.post(this.apiUrl + "unlikePost/" + userId + "/" + postId, {});
    }

    createPost(postDto) {
        return this.axiosInstance.post(this.apiUrl + "createPost", postDto);
    }
}