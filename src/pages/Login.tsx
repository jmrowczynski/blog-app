import MainTemplate from '../templates/MainTemplate';
import { Box, Container, Typography } from '@mui/material';
import { useLoginMutation } from '../services/api/hooks/useLoginMutation';
import { useForm } from 'react-hook-form';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import React from 'react';
import { Link } from 'react-router-dom';
import MuiButton from '@mui/material/Button';
import { forgotPassword } from '../routing/routes';

interface FormInputs {
    email: string;
    password: string;
}

const Login = () => {
    const loginMutation = useLoginMutation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit = handleSubmit((data) => loginMutation.mutate(data));

    return (
        <MainTemplate>
            <Container maxWidth={'sm'}>
                <Typography component="h1" variant="h4" gutterBottom>
                    Login
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
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        type="submit"
                        loading={loginMutation.isLoading}
                        disabled={loginMutation.isLoading}
                    >
                        login
                    </Button>
                    <MuiButton
                        component={Link}
                        color="primary"
                        to={forgotPassword}
                        size="small"
                        sx={{ marginTop: 1 }}
                    >
                        Forgot password?
                    </MuiButton>
                </Box>
            </Container>
        </MainTemplate>
    );
};

export default Login;
