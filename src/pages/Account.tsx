import React, { ImgHTMLAttributes } from 'react';
import MainTemplate from '../templates/MainTemplate';
import { useForm } from 'react-hook-form';
import { IEditUserRequest } from '../services/types';
import { Box, Container, Typography } from '@mui/material';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { useEditUserMutation } from '../services/api/hooks/useEditUserMutation';
import { useAppContext } from '../context/app.context';
import { DropzoneField } from '../components/atoms/DropzoneInput';

const AvatarImage = (props: ImgHTMLAttributes<HTMLImageElement>) => (
    <img width={120} height={120} {...props} style={{ objectFit: 'cover' }} />
);

const Account = () => {
    const editUserMutation = useEditUserMutation();
    const { user } = useAppContext();

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
        <MainTemplate>
            <Container maxWidth="sm">
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
                        {!avatar && (
                            <AvatarImage src={user.avatar} alt={user.name} />
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
                    >
                        save
                    </Button>
                </Box>
            </Container>
        </MainTemplate>
    );
};

export default Account;
