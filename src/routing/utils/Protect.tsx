import React from 'react';
import { useAppContext } from '../../context/app.context';
import { Navigate } from 'react-router-dom';
import { home } from '../routes';

export type Rules = 'logged_in' | 'not_logged_in';

const Protect: React.FunctionComponent<{
    children?: React.ReactNode;
    rules?: Rules[];
}> = ({ children, rules = [] }) => {
    const { token } = useAppContext();

    if (rules.includes('logged_in') && !token) {
        return <Navigate replace to={home} />;
    }

    if (rules.includes('not_logged_in') && token) {
        return <Navigate replace to={home} />;
    }

    if (!token) {
        return <Navigate replace to={home} />;
    }

    return <>{children}</>;
};

export default Protect;
