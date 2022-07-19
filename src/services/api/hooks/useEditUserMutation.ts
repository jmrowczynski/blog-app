import { useAppContext } from '../../../context/app.context';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import UserApi from '../connections/UserApi';

export const useEditUserMutation = () => {
    const { updateUser } = useAppContext();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation((body: FormData) => UserApi.editMe(body), {
        onSuccess(data) {
            updateUser(data.data.data);
            enqueueSnackbar('Updated successfully!', { variant: 'success' });
        },

        onError(error: AxiosError<{ message?: string }>) {
            enqueueSnackbar(error.response?.data?.message, {
                variant: 'error',
            });
        },
    });
};
