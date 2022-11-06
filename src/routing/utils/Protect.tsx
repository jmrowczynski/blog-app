import React from 'react';
import { Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import MainTemplate from '../../templates/MainTemplate';
import { useCanEditPost } from '../../hooks/useCanEditPost';

export type IPermissions = 'edit_post';

const Protect: React.FunctionComponent<{
    children?: React.ReactNode;
    rules?: boolean[];
    permissions?: IPermissions[];
}> = ({ children, rules = [], permissions = [] }) => {
    const { canEdit, isLoading } = useCanEditPost({
        enable: permissions.includes('edit_post'),
    });
    const isValidRules = rules.every((rule) => rule);
    const isValidPermissions = [canEdit]
        .filter((permission) => permission !== undefined)
        .every((permission) => permission);

    if (isLoading) {
        return (
            <MainTemplate>
                <CircularProgress />
            </MainTemplate>
        );
    }

    if (isValidRules && isValidPermissions) {
        return <>{children}</>;
    }

    return <Navigate to="/" />;
};

export default Protect;
