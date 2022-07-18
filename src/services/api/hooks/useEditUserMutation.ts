import { useAppContext } from '../../../context/app.context';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { IEditUserRequest } from '../../types';
import { AxiosError } from 'axios';
import UserApi from '../connections/UserApi';

export const useEditUserMutation = () => {
    const { saveUser } = useAppContext();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation((body: IEditUserRequest) => UserApi.editMe(body), {
        onSuccess(data) {
            saveUser(data.data);
            enqueueSnackbar('Updated successfully!', { variant: 'success' });
        },

        onError(error: AxiosError<{ message?: string }>) {
            enqueueSnackbar(error.response?.data?.message, {
                variant: 'error',
            });
        },
    });
};
