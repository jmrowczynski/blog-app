import { axiosInstance } from '../axios';
import {
    ICreatePostRequest,
    IEditPostRequest,
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
    static update(body: IEditPostRequest, slug: string) {
        return axiosInstance.put(`/posts/${slug}`, body);
    }
}

export default PostsApi;
