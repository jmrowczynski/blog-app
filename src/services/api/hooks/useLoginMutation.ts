import { useMutation } from 'react-query';
import AuthApi from '../connections/AuthApi';
import { useAppContext } from '../../../context/app.context';
import { IUserLoginRequest } from '../../types';
import { useNavigate } from 'react-router-dom';
import { home } from '../../../routing/routes';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';

export const useLoginMutation = () => {
    const { saveUser } = useAppContext();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation((body: IUserLoginRequest) => AuthApi.login(body), {
        onSuccess(data) {
            saveUser(data.data);
            enqueueSnackbar('Logged in!', { variant: 'success' });
            navigate(home, { replace: true });
        },

        onError(error: AxiosError<{ message?: string }>) {
            enqueueSnackbar(error.response?.data?.message, {
                variant: 'error',
            });
        },
    });
};
