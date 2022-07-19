import { useQuery } from 'react-query';
import { IPostsParams } from '../../types';
import UserApi from '../connections/UserApi';

export const queryKey = 'myPosts';

export const useMyPostsQuery = (params?: IPostsParams) => {
    return useQuery([queryKey, params], () => UserApi.getPosts(params));
};
