import { useMutation } from 'react-query';
import AuthApi from '../connections/AuthApi';
import { IUserForgotPasswordRequest } from '../../types';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';

export const useForgotPasswordMutation = () => {
    const { enqueueSnackbar } = useSnackbar();

    return useMutation(
        (body: IUserForgotPasswordRequest) => AuthApi.forgot(body),
        {
            onSuccess(response) {
                enqueueSnackbar(response.data.status, {
                    variant: 'success',
                });
            },

            onError(error: AxiosError<{ message?: string }>) {
                enqueueSnackbar(error.response?.data?.message, {
                    variant: 'error',
                });
            },
        }
    );
};
