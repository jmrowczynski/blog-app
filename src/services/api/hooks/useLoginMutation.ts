import { useMutation } from 'react-query';
import AuthApi from '../connections/AuthApi';
import { useAppContext } from '../../../context/app.context';
import { IUserLoginRequest } from '../../types';

export const useLoginMutation = () => {
    const { saveUser } = useAppContext();

    return useMutation((body: IUserLoginRequest) => AuthApi.login(body), {
        onSuccess(data) {
            saveUser(data.data);
        },
    });
};
