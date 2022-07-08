import { AppBar, Box, Button, Toolbar } from '@mui/material'

const ApplicationBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Button color="inherit" style={{ marginLeft: 'auto' }}>
                        Login
                    </Button>
                    <Button color="inherit">Register</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default ApplicationBar
