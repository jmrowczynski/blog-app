import { axiosInstance } from '../axios';
import { IUserLoginRequest } from '../../types';

class AuthApi {
    static login(body: IUserLoginRequest) {
        return axiosInstance.post('/login', body);
    }
}

export default AuthApi;
