import { axiosInstance } from '../axios';

class UserApi {
    static editMe(body: FormData) {
        return axiosInstance.post('/me', body, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }
}

export default UserApi;
