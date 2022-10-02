import { axiosInstance } from '../axios';

class ImagesApi {
    static upload(body: FormData) {
        return axiosInstance.post('/images/store', body, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }
}

export default ImagesApi;
