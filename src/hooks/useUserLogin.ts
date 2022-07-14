import { useEffect, useState } from 'react';
import { axiosInstance } from '../services/api/axios';
import { IUserLoginResponse } from '../services/types';

const getUser = () => {
    const storageUser = localStorage.getItem('user');
    return JSON.parse(storageUser || '');
};

const getToken = () => {
    const storageToken = localStorage.getItem('token');
    return JSON.parse(storageToken || '');
};

export const useUserLogin = () => {
    const [user, setUser] = useState(getUser());
    const [token, setToken] = useState(getToken());

    useEffect(() => {
        if (token) {
            axiosInstance.defaults.headers.common.Authorization = token;
        }
    }, [token]);

    const saveUser = ({ user, token }: IUserLoginResponse) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(token));
        setUser(user);
        setToken(token);
    };

    return { user, token, saveUser };
};
