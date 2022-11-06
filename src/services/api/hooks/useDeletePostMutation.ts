import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { queryKey } from './usePostsQuery';
import PostsApi from '../connections/PostsApi';

export const useDeletePostMutation = () => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    return useMutation((slug: string) => PostsApi.delete(slug), {
        async onSuccess() {
            await queryClient.invalidateQueries([queryKey]);
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
