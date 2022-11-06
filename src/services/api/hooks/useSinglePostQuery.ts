import { useQuery, UseQueryOptions } from 'react-query';
import PostsApi from '../connections/PostsApi';
import { ISinglePostRequest } from '../../types';

export const queryKey = 'singlePost';

export const useSinglePostQuery = (
    slug: string,
    options: UseQueryOptions<ISinglePostRequest, any, ISinglePostRequest, any>
) => {
    return useQuery([queryKey, slug], () => PostsApi.get(slug), options);
};
