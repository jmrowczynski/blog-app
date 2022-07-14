import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { login, account } from '../routing/routes';
import { useAppContext } from '../context/app.context';
import React from 'react';

const ApplicationBar: React.FunctionComponent = () => {
    const { token, user } = useAppContext();
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
                            <Button color="inherit">Logout</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default ApplicationBar;
