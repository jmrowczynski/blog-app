import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { login, account } from '../routing/routes';
import { useAppContext } from '../context/app.context';
import React from 'react';
import { useLogoutMutation } from '../services/api/hooks/useLogoutMutation';

const ApplicationBar: React.FunctionComponent = () => {
    const { token } = useAppContext();
    const logoutMutation = useLogoutMutation();

    const handleLogout = () => logoutMutation.mutate();

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
                        <>
                            <Button
                                component={Link}
                                to={account}
                                color="inherit"
                                style={{ marginLeft: 'auto' }}
                            >
                                My account
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default ApplicationBar;
