import { useUsersQuery } from '../../../../services/api/hooks/useUsersQuery';
import { useAppContext } from '../../../../context/app.context';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import {
    Avatar,
    Box,
    CircularProgress,
    IconButton,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

const Users = () => {
    const users = useUsersQuery();
    const usersData = users.data?.data;
    const { user: currentUser } = useAppContext();

    const renderUsers =
        !!usersData && usersData.length > 0 ? (
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Avatar</TableCell>
                        <TableCell>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersData.map((user) => (
                        <TableRow
                            key={user.id}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                            hover
                        >
                            <TableCell component="th" scope="row" width={50}>
                                <Avatar
                                    alt={user.name}
                                    src={user.avatar}
                                    sx={{
                                        marginLeft: 1,
                                        width: 30,
                                        height: 30,
                                    }}
                                >
                                    {user.name[0]}
                                </Avatar>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {user.name}
                            </TableCell>
                            <TableCell component="th" scope="row" align="right">
                                <IconButton
                                    aria-label="delete"
                                    disabled={currentUser.id === user.id}
                                    color="error"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        ) : (
            <Typography>No results</Typography>
        );

    return (
        <div>
            {users.isLoading ? (
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                renderUsers
            )}
        </div>
    );
};

export default Users;
