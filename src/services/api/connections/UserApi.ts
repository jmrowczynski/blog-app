import { axiosInstance } from '../axios';
import { IPostsParams, IUsersParams } from '../../types';

class UserApi {
    static editMe(body: FormData) {
        return axiosInstance.post('/me', body, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    static getPosts(params?: IPostsParams) {
        return axiosInstance.get('/me/posts', { params });
    }

    static getUsers(params?: IUsersParams) {
        return axiosInstance.get('/users', { params });
    }

    static deleteUser(id: number) {
        return axiosInstance.delete(`/users/${id}`);
    }
}

export default UserApi;
