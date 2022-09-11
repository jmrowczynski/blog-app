import MainTemplate from '../templates/MainTemplate';
import { Box, Container, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import React from 'react';
import { useForgotPasswordMutation } from '../services/api/hooks/useForgotPasswordMutation';

interface FormInputs {
    email: string;
}

const Login = () => {
    const forgotPasswordMutation = useForgotPasswordMutation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>({
        defaultValues: {
            email: '',
        },
    });
    const onSubmit = handleSubmit((data) =>
        forgotPasswordMutation.mutate(data)
    );

    return (
        <MainTemplate>
            <Container maxWidth={'sm'}>
                <Typography component="h1" variant="h4" gutterBottom>
                    Forgot password
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
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        type="submit"
                        loading={forgotPasswordMutation.isLoading}
                    >
                        send email
                    </Button>
                </Box>
            </Container>
        </MainTemplate>
    );
};

export default Login;
