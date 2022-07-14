import MainTemplate from '../templates/MainTemplate';
import { Box, Button, Container, Typography } from '@mui/material';
import { useLoginMutation } from '../services/api/hooks/useLoginMutation';
import { useForm } from 'react-hook-form';
import Input from '../components/atoms/Input';

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
                    >
                        login
                    </Button>
                </Box>
            </Container>
        </MainTemplate>
    );
};

export default Login;
