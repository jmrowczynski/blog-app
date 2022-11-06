import React, { ImgHTMLAttributes } from 'react';
import { Box, Typography } from '@mui/material';
import Input from '../../atoms/Input';
import { DropzoneField } from '../../atoms/DropzoneInput';
import Button from '../../atoms/Button';
import { useEditUserMutation } from '../../../services/api/hooks/useEditUserMutation';
import { useForm } from 'react-hook-form';
import { IEditUserRequest, IUser } from '../../../services/types';

const AvatarImage = (props: ImgHTMLAttributes<HTMLImageElement>) => (
    <img
        alt="avatar"
        width={120}
        height={120}
        {...props}
        style={{ objectFit: 'cover' }}
    />
);

const EditUserForm = ({ user }: { user: IUser }) => {
    const editUserMutation = useEditUserMutation();

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<IEditUserRequest>({
        defaultValues: {
            name: user.name,
            avatar: undefined,
        },
    });
    const onSubmit = handleSubmit((data) => {
        const formData = new FormData();
        formData.append('name', data.name as string);
        if (data.avatar) {
            formData.append('avatar', data.avatar[0]);
        }
        editUserMutation.mutate(formData);
    });
    const avatar = watch('avatar');

    return (
        <div>
            <Typography component="h1" variant="h4" gutterBottom>
                Edit
            </Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    '& .MuiTextField-root': { mb: 2 },
                }}
                onSubmit={onSubmit}
            >
                <Input
                    name="name"
                    control={control}
                    inputProps={{
                        fullWidth: true,
                        label: 'Name',
                        error: !!errors?.name?.message,
                        helperText: errors?.name?.message,
                    }}
                />
                <Box sx={{ marginBottom: 1 }}>
                    <DropzoneField control={control} name="avatar" />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    {!avatar && user.avatar_url && (
                        <AvatarImage src={user.avatar_url} alt={user.name} />
                    )}
                    {avatar &&
                        avatar.map((file, index) => {
                            return (
                                <AvatarImage
                                    key={`${file.name}-${index}`}
                                    src={URL.createObjectURL(file)}
                                    alt={user.name}
                                />
                            );
                        })}
                </Box>
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    type="submit"
                    loading={editUserMutation.isLoading}
                    disabled={editUserMutation.isLoading}
                >
                    save
                </Button>
            </Box>
        </div>
    );
};

export default EditUserForm;
