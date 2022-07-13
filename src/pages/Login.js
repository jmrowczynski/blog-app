import MainTemplate from '../templates/MainTemplate';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const Login = () => {
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
                >
                    <TextField required id="email" label="Email" fullWidth />
                    <TextField
                        required
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
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
