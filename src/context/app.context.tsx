import React, { createContext, useContext } from 'react';
import { useUserLogin } from '../hooks/useUserLogin';
import { IUserLoginResponse } from '../services/types';

interface IContext {
    saveUser: (data: IUserLoginResponse) => void;
    removeUser: () => void;
    user: IUserLoginResponse['user'];
    token: IUserLoginResponse['token'];
}

const AppContext = createContext<IContext | undefined>(undefined);

const AppProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { saveUser, removeUser, user, token } = useUserLogin();

    return (
        <AppContext.Provider value={{ saveUser, removeUser, user, token }}>
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
