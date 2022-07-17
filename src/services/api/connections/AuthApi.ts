import { axiosInstance } from '../axios';
import { IUserLoginRequest } from '../../types';

class AuthApi {
    static login(body: IUserLoginRequest) {
        return axiosInstance.post('/login', body);
    }

    static cookie() {
        return axiosInstance.get('/sanctum/csrf-cookie', {
            baseURL: process.env.REACT_APP_API_URL?.replace('/api', ''),
        });
    }

    static logout() {
        return axiosInstance.post('/logout');
    }
}

export default AuthApi;
