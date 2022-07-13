import React from 'react';
import { useAppContext } from '../../context/app.context';
import { Navigate } from 'react-router-dom';
import { home } from '../routes';

const AuthRoute = ({ children }) => {
    const { token } = useAppContext();

    if (!token) {
        return <Navigate replace to={home} />;
    }

    return <>{children}</>;
};

export default AuthRoute;
