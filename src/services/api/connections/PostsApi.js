import { axiosInstance } from '../axios';

class PostsApi {
    static getAll(params) {
        return axiosInstance.get('/posts', params);
    }
}

export default PostsApi;
