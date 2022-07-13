import { createContext, useContext } from 'react';
import { useUserLogin } from '../hooks/useUserLogin';

const AppContext = createContext({});

const AppProvider = ({ children }) => {
    const { saveUser, user, token } = useUserLogin();

    return (
        <AppContext.Provider value={{ saveUser, user, token }}>
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
