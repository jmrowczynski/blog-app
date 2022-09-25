import axios from 'axios';
import AuthApi from '../connections/AuthApi';
import { IAppContext } from '../../../context/app.context';

const config = {
    baseURL: process.env.REACT_APP_API_URL,
    headers: { Accept: 'application/json' },
    withCredentials: true,
};

export const axiosInstance = axios.create(config);

export const NetworkService = {
    setupInterceptors(appContext: IAppContext) {
        axiosInstance.interceptors.response.use(
            function (response) {
                return response;
            },
            async function (error) {
                if (error.response.status === 419) {
                    await AuthApi.cookie();

                    return axiosInstance.request(error.config);
                }

                if (error.response.status === 401) {
                    appContext.removeUser();
                }

                return Promise.reject(error);
            }
        );
    },
};
