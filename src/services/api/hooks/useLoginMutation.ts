import { useMutation } from 'react-query';
import AuthApi from '../connections/AuthApi';
import { useAppContext } from '../../../context/app.context';
import { IUserLoginRequest } from '../../types';
import { useNavigate } from 'react-router-dom';
import { home } from '../../../routing/routes';

export const useLoginMutation = () => {
    const { saveUser } = useAppContext();
    const navigate = useNavigate();

    return useMutation((body: IUserLoginRequest) => AuthApi.login(body), {
        onSuccess(data) {
            saveUser(data.data);
            navigate(home, { replace: true });
        },
    });
};
