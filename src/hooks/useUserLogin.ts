import { useEffect, useMemo, useState } from 'react';
import { axiosInstance } from '../services/api/axios';
import { IUserLoginResponse } from '../services/types';

const getUser = () => {
    const storageUser = localStorage.getItem('user');
    if (storageUser) {
        return JSON.parse(storageUser);
    }

    return null;
};

const getToken = () => {
    const storageToken = localStorage.getItem('token');
    if (storageToken) {
        return JSON.parse(storageToken);
    }

    return null;
};

const isUserAdmin = (roles: { id: number; name: string }[]) => {
    return roles.map((role) => role.id).includes(1);
};

export const useUserLogin = () => {
    const [user, setUser] = useState(getUser());
    const [token, setToken] = useState(getToken());

    const isAdmin = useMemo(() => {
        if (user?.roles) {
            return isUserAdmin(user.roles);
        }

        return false;
    }, [user]);

    useEffect(() => {
        if (token) {
            axiosInstance.defaults.headers.common.Authorization = token;
        }
    }, [token, user?.id]);

    const saveUser = ({ user, token }: IUserLoginResponse) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(token));
        setUser(user);
        setToken(token);
    };

    const updateUser = (data: IUserLoginResponse['user']) => {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
    };

    const removeUser = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(undefined);
        setToken(undefined);
    };

    return { user, token, saveUser, removeUser, updateUser, isAdmin };
};
