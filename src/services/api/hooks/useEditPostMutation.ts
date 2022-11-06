import { useMutation, useQueryClient } from 'react-query';
import { IEditPostRequest } from '../../types';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import PostsApi from '../connections/PostsApi';
import { queryKey as singlePostKey } from './useSinglePostQuery';
import { queryKey as postsKey } from './usePostsQuery';
import { queryKey as myPostsKey } from './useMyPostsQuery';

export const useEditPostMutation = () => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    return useMutation(
        ({ body, slug }: { body: IEditPostRequest; slug: string }) =>
            PostsApi.update(body, slug),
        {
            onSuccess(_, data) {
                queryClient.invalidateQueries([singlePostKey, data.slug]);
                queryClient.invalidateQueries(postsKey);
                queryClient.invalidateQueries(myPostsKey);
                enqueueSnackbar('Post edited!', { variant: 'success' });
            },

            onError(error: AxiosError<{ message?: string }>) {
                enqueueSnackbar(error.response?.data?.message, {
                    variant: 'error',
                });
            },
        }
    );
};
