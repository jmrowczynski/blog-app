import { axiosInstance } from '../axios';

class CategoriesApi {
    static getAll() {
        return axiosInstance.get('/categories');
    }
}

export default CategoriesApi;
