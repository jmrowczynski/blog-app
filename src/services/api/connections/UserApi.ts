import { axiosInstance } from '../axios';
import { IEditUserRequest } from '../../types';

class UserApi {
    static editMe(body: IEditUserRequest) {
        return axiosInstance.post('/me', body);
    }
}

export default UserApi;
