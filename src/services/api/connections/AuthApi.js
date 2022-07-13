import { axiosInstance } from '../axios';

class AuthApi {
    static login(body) {
        return axiosInstance.post('/login', body);
    }
}

export default AuthApi;
