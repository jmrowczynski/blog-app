import React, { createContext, useContext } from 'react';
import { useUserLogin } from '../hooks/useUserLogin';
import { IUserLoginResponse } from '../services/types';

export interface IAppContext {
    saveUser: (data: IUserLoginResponse) => void;
    updateUser: (data: IUserLoginResponse['user']) => void;
    removeUser: () => void;
    user?: IUserLoginResponse['user'];
    token?: IUserLoginResponse['token'];
    isAdmin: boolean;
}

const AppContext = createContext<IAppContext | undefined>(undefined);

const AppProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { saveUser, removeUser, updateUser, user, token, isAdmin } =
        useUserLogin();

    return (
        <AppContext.Provider
            value={{
                saveUser,
                removeUser,
                updateUser,
                user,
                token,
                isAdmin,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
};

export default AppProvider;
