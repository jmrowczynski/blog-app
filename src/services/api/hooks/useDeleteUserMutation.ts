import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import UserApi from '../connections/UserApi';
import { queryKey } from './useUsersQuery';

export const useDeleteUserMutation = () => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    return useMutation((id: number) => UserApi.deleteUser(id), {
        onSuccess() {
            queryClient.invalidateQueries([queryKey]);
            enqueueSnackbar('User deleted successfully!', {
                variant: 'success',
            });
        },

        onError(error: AxiosError<{ message?: string }>) {
            enqueueSnackbar(error.response?.data?.message, {
                variant: 'error',
            });
        },
    });
};
