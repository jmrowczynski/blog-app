import { axiosInstance } from '../axios';
import { IUserLoginRequest } from '../../types';

class AuthApi {
    static login(body: IUserLoginRequest) {
        return axiosInstance.post('/login', body);
    }

    static logout() {
        return axiosInstance.post('/logout');
    }
}

export default AuthApi;
