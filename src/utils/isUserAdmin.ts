import { IUser } from '../services/types';
import { USER_ADMIN_ID } from '../constants';

export const isUserAdmin = (roles: IUser['roles']) => {
    return roles.map((role) => role.id).includes(USER_ADMIN_ID);
};
