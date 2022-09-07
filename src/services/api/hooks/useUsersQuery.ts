import { useQuery } from 'react-query';
import { IPostsParams, IUser, IUsersParams } from '../../types';
import UserApi from '../connections/UserApi';

export const queryKey = 'users';

export const useUsersQuery = (params?: IUsersParams) => {
    return useQuery<{ data: IUser[] }>([queryKey, params], () =>
        UserApi.getUsers(params)
    );
};
