import { useMutation } from 'react-query';
import AuthApi from '../connections/AuthApi';
import { useAppContext } from '../../../context/app.context';
import { home } from '../../../routing/routes';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export const useLogoutMutation = () => {
    const { removeUser } = useAppContext();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation(() => AuthApi.logout(), {
        onSuccess() {
            removeUser();
            enqueueSnackbar('Logged out!', { variant: 'success' });
            navigate(home, { replace: true });
        },
    });
};
