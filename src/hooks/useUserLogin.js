import { useState } from 'react';

const getUser = () => {
    const storageUser = localStorage.getItem('user');
    return JSON.parse(storageUser);
};

const getToken = () => {
    const storageUser = localStorage.getItem('token');
    return JSON.parse(storageUser);
};

export const useUserLogin = () => {
    const [user, setUser] = useState(getUser());
    const [token, setToken] = useState(getToken());

    const saveUser = ({ user, token }) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(token));
        setUser(user);
        setToken(token);
    };

    return { user, token, setUser: saveUser };
};
