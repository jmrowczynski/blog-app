import MainTemplate from '../templates/MainTemplate';
import { Box, Container, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import React from 'react';
import { IUserRegisterRequest } from '../services/types';
import { useRegisterMutation } from '../services/api/hooks/useRegisterMutation';

const Register = () => {
    const registerMutation = useRegisterMutation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserRegisterRequest>({
        defaultValues: {
            email: '',
            name: '',
            password: '',
            password_confirmation: '',
        },
    });
    const onSubmit = handleSubmit((data) => registerMutation.mutate(data));

    return (
        <MainTemplate>
            <Container maxWidth={'sm'}>
                <Typography component="h1" variant="h4" gutterBottom>
                    Register
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
                        name="email"
                        control={control}
                        inputProps={{
                            fullWidth: true,
                            required: true,
                            type: 'email',
                            label: 'Email',
                            error: !!errors?.email?.message,
                            helperText: errors?.email?.message,
                        }}
                        controllerProps={{
                            rules: {
                                required: 'Email is required',
                                pattern: {
                                    message: 'Email is not valid',
                                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                },
                            },
                        }}
                    />
                    <Input
                        name="name"
                        control={control}
                        inputProps={{
                            fullWidth: true,
                            required: true,
                            type: 'text',
                            label: 'Name',
                            error: !!errors?.name?.message,
                            helperText: errors?.name?.message,
                        }}
                        controllerProps={{
                            rules: {
                                required: 'Name is required',
                            },
                        }}
                    />
                    <Input
                        name="password"
                        control={control}
                        inputProps={{
                            fullWidth: true,
                            required: true,
                            type: 'password',
                            label: 'Password',
                            error: !!errors?.password?.message,
                            helperText: errors?.password?.message,
                        }}
                        controllerProps={{
                            rules: {
                                required: 'Password is required',
                            },
                        }}
                    />
                    <Input
                        name="password_confirmation"
                        control={control}
                        inputProps={{
                            fullWidth: true,
                            required: true,
                            type: 'password',
                            label: 'Password confirmation',
                            error: !!errors?.password_confirmation?.message,
                            helperText: errors?.password_confirmation?.message,
                        }}
                        controllerProps={{
                            rules: {
                                required: 'Password is required',
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        type="submit"
                        loading={registerMutation.isLoading}
                        disabled={registerMutation.isLoading}
                    >
                        register
                    </Button>
                </Box>
            </Container>
        </MainTemplate>
    );
};

export default Register;
