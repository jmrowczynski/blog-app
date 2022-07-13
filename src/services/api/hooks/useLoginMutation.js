import { useMutation } from 'react-query';
import AuthApi from '../connections/AuthApi';
import { useUserLogin } from '../../../hooks/useUserLogin';

export const useLoginMutation = () => {
    const { setUser } = useUserLogin();
    return useMutation((body) => AuthApi.login(body), {
        onSuccess(data) {
            setUser(data.data);
        },
    });
};
