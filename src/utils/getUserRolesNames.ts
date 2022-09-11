import { IUser, Role } from '../services/types';

export const getUserRolesNames = (roles: IUser['roles']): Role[] => {
    return roles.map((role) => role.name);
};
