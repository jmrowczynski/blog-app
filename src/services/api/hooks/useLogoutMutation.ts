import { useMutation, useQueryClient } from 'react-query';
import AuthApi from '../connections/AuthApi';
import { useAppContext } from '../../../context/app.context';
import { home } from '../../../routing/routes';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export const useLogoutMutation = () => {
    const { removeUser } = useAppContext();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    return useMutation(() => AuthApi.logout(), {
        onSuccess() {
            removeUser();
            queryClient.clear();
            enqueueSnackbar('Logged out!', { variant: 'success' });
            navigate(home, { replace: true });
        },
    });
};
