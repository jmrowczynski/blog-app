import { useMutation } from 'react-query';
import { ICreatePostRequest } from '../../types';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import PostsApi from '../connections/PostsApi';

export const useCreatePostMutation = () => {
    const { enqueueSnackbar } = useSnackbar();

    return useMutation((body: ICreatePostRequest) => PostsApi.create(body), {
        onSuccess() {
            enqueueSnackbar('Post created!', { variant: 'success' });
        },

        onError(error: AxiosError<{ message?: string }>) {
            enqueueSnackbar(error.response?.data?.message, {
                variant: 'error',
            });
        },
    });
};
