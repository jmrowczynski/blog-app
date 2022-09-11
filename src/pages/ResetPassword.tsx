import MainTemplate from '../templates/MainTemplate';
import { Box, Container, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import React from 'react';
import { useResetPasswordMutation } from '../services/api/hooks/useResetPasswordMutation';
import { useSearchParams } from 'react-router-dom';

interface FormInputs {
    email: string;
    password: string;
    password_confirmation: string;
}

const ResetPassword = () => {
    const resetPasswordMutation = useResetPasswordMutation();
    const [searchParams] = useSearchParams();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>({
        defaultValues: {
            email: '',
            password: '',
            password_confirmation: '',
        },
    });
    const onSubmit = handleSubmit((data) => {
        const token = searchParams.get('token');
        if (token) {
            resetPasswordMutation.mutate({ ...data, token });
        }
    });

    return (
        <MainTemplate>
            <Container maxWidth={'sm'}>
                <Typography component="h1" variant="h4" gutterBottom>
                    Reset password
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
                            label: 'Confirm password',
                            error: !!errors?.password_confirmation?.message,
                            helperText: errors?.password_confirmation?.message,
                        }}
                        controllerProps={{
                            rules: {
                                required: 'Confirm password is required',
                                min: 8,
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        type="submit"
                        loading={resetPasswordMutation.isLoading}
                    >
                        reset password
                    </Button>
                </Box>
            </Container>
        </MainTemplate>
    );
};

export default ResetPassword;
