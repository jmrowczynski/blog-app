import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { login } from '../routing/routes';

const ApplicationBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Button
                        color="inherit"
                        style={{ marginLeft: 'auto' }}
                        component={Link}
                        to={login}
                    >
                        Login
                    </Button>
                    <Button color="inherit">Register</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default ApplicationBar;
