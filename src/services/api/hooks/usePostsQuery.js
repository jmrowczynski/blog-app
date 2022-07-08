import { useQuery } from 'react-query';
import PostsApi from '../connections/PostsApi';

export const queryKey = 'posts';

export const usePostsQuery = (params = {}) => {
    return useQuery([queryKey, params], () => PostsApi.getAll(params));
};
