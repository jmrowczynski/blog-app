import { axiosInstance } from '../axios';
import { ICreatePostRequest, IPostsParams } from '../../types';

class PostsApi {
    static getAll(params: IPostsParams) {
        return axiosInstance.get('/posts', { params });
    }
    static create(body: ICreatePostRequest) {
        return axiosInstance.post('/posts/store', body);
    }
}

export default PostsApi;
