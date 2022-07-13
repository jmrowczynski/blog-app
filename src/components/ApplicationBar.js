import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { login } from '../routing/routes';
import { useAppContext } from '../context/app.context';

const ApplicationBar = () => {
    const { token } = useAppContext();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    {!token ? (
                        <>
                            <Button
                                color="inherit"
                                style={{ marginLeft: 'auto' }}
                                component={Link}
                                to={login}
                            >
                                Login
                            </Button>
                            <Button color="inherit">Register</Button>
                        </>
                    ) : (
                        <Button color="inherit" style={{ marginLeft: 'auto' }}>
                            Account
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default ApplicationBar;
