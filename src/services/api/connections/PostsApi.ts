import { axiosInstance } from '../axios';
import { IPostsParams } from '../../types';

class PostsApi {
    static getAll(params: IPostsParams) {
        return axiosInstance.get('/posts', { params });
    }
}

export default PostsApi;
