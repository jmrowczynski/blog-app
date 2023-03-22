import { AppBar, Avatar, Box, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { login, account, home, register } from '../routing/routes';
import { useAppContext } from '../context/app.context';
import React from 'react';
import { useLogoutMutation } from '../services/api/hooks/useLogoutMutation';

const ApplicationBar: React.FunctionComponent = () => {
    const logoutMutation = useLogoutMutation();
    const { user } = useAppContext();

    const handleLogout = () => logoutMutation.mutate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Button color="inherit" component={Link} to={home}>
                        Home
                    </Button>
                    {!user ? (
                        <>
                            <Button
                                color="inherit"
                                style={{ marginLeft: 'auto' }}
                                component={Link}
                                to={login}
                            >
                                Login
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to={register}
                            >
                                Register
                            </Button>
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
                                <Avatar
                                    alt={user?.name}
                                    src={user?.avatar_url}
                                    sx={{
                                        marginLeft: 1,
                                        width: 30,
                                        height: 30,
                                    }}
                                >
                                    {user?.name[0]}
                                </Avatar>
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
