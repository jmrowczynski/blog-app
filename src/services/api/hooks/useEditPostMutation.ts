import { useMutation, useQueryClient } from 'react-query';
import { IEditPostRequest } from '../../types';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import PostsApi from '../connections/PostsApi';
import { queryKey } from './useSinglePostQuery';

export const useEditPostMutation = () => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    return useMutation(
        ({ body, slug }: { body: IEditPostRequest; slug: string }) =>
            PostsApi.update(body, slug),
        {
            onSuccess(_, data) {
                enqueueSnackbar('Post edited!', { variant: 'success' });
                queryClient.invalidateQueries([queryKey, data.slug]);
            },

            onError(error: AxiosError<{ message?: string }>) {
                enqueueSnackbar(error.response?.data?.message, {
                    variant: 'error',
                });
            },
        }
    );
};
