import { axiosInstance } from '../axios';
import {
    ICreatePostRequest,
    IPostsParams,
    ISinglePostRequest,
} from '../../types';

class PostsApi {
    static getAll(params: IPostsParams) {
        return axiosInstance.get('/posts', { params });
    }
    static get(slug: string): Promise<ISinglePostRequest> {
        return axiosInstance.get(`/posts/${slug}`);
    }
    static create(body: ICreatePostRequest) {
        return axiosInstance.post('/posts/store', body);
    }
}

export default PostsApi;
