import React from 'react';
import { useAppContext } from '../../context/app.context';
import { Navigate } from 'react-router-dom';
import { home } from '../routes';
import { getUserRolesNames } from '../../utils/getUserRolesNames';
import { Role } from '../../services/types';

export type Rule = 'logged_in' | 'not_logged_in';

const Protect: React.FunctionComponent<{
    children?: React.ReactNode;
    rules?: Rule[];
    roles?: Role[];
}> = ({ children, rules = [], roles = [] }) => {
    const { token, user } = useAppContext();

    if (roles.length) {
        const userRolesNames = getUserRolesNames(user.roles);
        const isValid = roles.every((role) => userRolesNames.includes(role));

        if (!isValid) {
            return <Navigate replace to={home} />;
        }
    }

    if (rules.includes('logged_in') && !token) {
        return <Navigate replace to={home} />;
    }

    if (rules.includes('not_logged_in') && token) {
        return <Navigate replace to={home} />;
    }

    if (!rules.length && !token) {
        return <Navigate replace to={home} />;
    }

    return <>{children}</>;
};

export default Protect;
