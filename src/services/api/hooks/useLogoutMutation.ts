import { useMutation } from 'react-query';
import AuthApi from '../connections/AuthApi';
import { useAppContext } from '../../../context/app.context';
import { home } from '../../../routing/routes';
import { useNavigate } from 'react-router-dom';

export const useLogoutMutation = () => {
    const { removeUser } = useAppContext();
    const navigate = useNavigate();

    return useMutation(() => AuthApi.logout(), {
        onSuccess() {
            removeUser();
            navigate(home, { replace: true });
        },
    });
};
