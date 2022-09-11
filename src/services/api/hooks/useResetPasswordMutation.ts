import { useMutation } from 'react-query';
import AuthApi from '../connections/AuthApi';
import { IUserResetPasswordRequest } from '../../types';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { login } from '../../../routing/routes';
import { useNavigate } from 'react-router-dom';

export const useResetPasswordMutation = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    return useMutation(
        (body: IUserResetPasswordRequest) => AuthApi.reset(body),
        {
            onSuccess() {
                enqueueSnackbar('Password reset successfully', {
                    variant: 'success',
                });
                navigate(login, { replace: true });
            },

            onError(error: AxiosError<{ message?: string }>) {
                enqueueSnackbar(error.response?.data?.message, {
                    variant: 'error',
                });
            },
        }
    );
};
