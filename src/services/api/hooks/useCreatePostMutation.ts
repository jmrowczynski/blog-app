import { useMutation, useQueryClient } from 'react-query';
import { ICreatePostRequest } from '../../types';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import PostsApi from '../connections/PostsApi';
import { queryKey as postsKey } from './usePostsQuery';
import { queryKey as myPostsKey } from './useMyPostsQuery';

export const useCreatePostMutation = () => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    return useMutation((body: ICreatePostRequest) => PostsApi.create(body), {
        async onSuccess() {
            await queryClient.invalidateQueries(postsKey);
            await queryClient.invalidateQueries(myPostsKey);
            enqueueSnackbar('Post created!', { variant: 'success' });
        },

        onError(error: AxiosError<{ message?: string }>) {
            enqueueSnackbar(error.response?.data?.message, {
                variant: 'error',
            });
        },
    });
};
