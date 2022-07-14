import { useQuery } from 'react-query';
import PostsApi from '../connections/PostsApi';
import { IPostsParams } from '../../types';

export const queryKey = 'posts';

export const usePostsQuery = (params: IPostsParams) => {
    return useQuery([queryKey, params], () => PostsApi.getAll(params));
};
