import { axiosInstance } from '../axios';
import { IPostsParams } from '../../types';

class UserApi {
    static editMe(body: FormData) {
        return axiosInstance.post('/me', body, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    static getPosts(params?: IPostsParams) {
        return axiosInstance.get('/me/posts', { params });
    }

    static getUsers(params?: IPostsParams) {
        return axiosInstance.get('/users', { params });
    }
}

export default UserApi;
