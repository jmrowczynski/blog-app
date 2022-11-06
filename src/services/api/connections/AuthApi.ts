import { axiosInstance } from '../axios';
import {
    IUserLoginRequest,
    IUserForgotPasswordRequest,
    IUserResetPasswordRequest,
} from '../../types';

class AuthApi {
    static login(body: IUserLoginRequest) {
        return axiosInstance.post('/login', body);
    }

    static register(body: IUserLoginRequest) {
        return axiosInstance.post('/register', body);
    }

    static cookie() {
        return axiosInstance.get('/sanctum/csrf-cookie', {
            baseURL: process.env.REACT_APP_API_URL?.replace('/api', ''),
        });
    }

    static logout() {
        return axiosInstance.post('/logout');
    }

    static forgot(body: IUserForgotPasswordRequest) {
        return axiosInstance.post('/forgot-password', body);
    }

    static reset(body: IUserResetPasswordRequest) {
        return axiosInstance.post('/reset-password', body);
    }
}

export default AuthApi;
