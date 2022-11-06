import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { queryKey as postsKey } from './usePostsQuery';
import { queryKey as myPostsKey } from './useMyPostsQuery';
import PostsApi from '../connections/PostsApi';

export const useDeletePostMutation = () => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    return useMutation((slug: string) => PostsApi.delete(slug), {
        async onSuccess() {
            await queryClient.invalidateQueries([postsKey]);
            await queryClient.invalidateQueries([myPostsKey]);
            enqueueSnackbar('Post deleted successfully!', {
                variant: 'success',
            });
        },

        onError(error: AxiosError<{ message?: string }>) {
            enqueueSnackbar(error.response?.data?.message, {
                variant: 'error',
            });
        },
    });
};
