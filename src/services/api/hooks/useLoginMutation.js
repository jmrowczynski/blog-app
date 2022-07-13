import { useMutation } from 'react-query';
import AuthApi from '../connections/AuthApi';
import { useAppContext } from '../../../context/app.context';

export const useLoginMutation = () => {
    const { saveUser } = useAppContext();

    return useMutation((body) => AuthApi.login(body), {
        onSuccess(data) {
            saveUser(data.data);
        },
    });
};
