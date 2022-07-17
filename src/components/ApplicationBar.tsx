import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { login, account, home } from '../routing/routes';
import { useAppContext } from '../context/app.context';
import React from 'react';
import { useLogoutMutation } from '../services/api/hooks/useLogoutMutation';
import Protect from '../routing/utils/Protect';

const ApplicationBar: React.FunctionComponent = () => {
    const logoutMutation = useLogoutMutation();

    const handleLogout = () => logoutMutation.mutate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Button color="inherit" component={Link} to={home}>
                        Home
                    </Button>
                    <Protect rules={['not_logged_in']}>
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
                    </Protect>
                    <Protect>
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
                    </Protect>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default ApplicationBar;
