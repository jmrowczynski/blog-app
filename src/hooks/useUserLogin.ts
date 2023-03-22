import { useMemo, useState } from 'react';
import { IUser, IUserLoginResponse } from '../services/types';
import { isUserAdmin } from '../utils/isUserAdmin';

const getUser = () => {
    const storageUser = localStorage.getItem('user');
    if (storageUser) {
        return JSON.parse(storageUser);
    }

    return undefined;
};

export const useUserLogin = () => {
    const [user, setUser] = useState<IUser | undefined>(getUser());

    const isAdmin = useMemo(() => {
        if (user?.roles) {
            return isUserAdmin(user.roles);
        }

        return false;
    }, [user]);

    const saveUser = ({ user }: IUserLoginResponse) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };

    const updateUser = (data: IUserLoginResponse['user']) => {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
    };

    const removeUser = () => {
        localStorage.removeItem('user');
        setUser(undefined);
    };

    return { user, saveUser, removeUser, updateUser, isAdmin };
};
