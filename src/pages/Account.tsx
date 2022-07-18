import React from 'react';
import MainTemplate from '../templates/MainTemplate';
import { useForm } from 'react-hook-form';
import { IEditUserRequest } from '../services/types';
import { Box, Container, Typography } from '@mui/material';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { useEditUserMutation } from '../services/api/hooks/useEditUserMutation';
import { useAppContext } from '../context/app.context';

const Account = () => {
    const editUserMutation = useEditUserMutation();
    const { user } = useAppContext();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IEditUserRequest>({
        defaultValues: {
            name: user.name,
            avatar: undefined,
        },
    });
    const onSubmit = handleSubmit((data) => editUserMutation.mutate(data));

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
