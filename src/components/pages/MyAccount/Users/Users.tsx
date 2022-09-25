import { useUsersQuery } from '../../../../services/api/hooks/useUsersQuery';
import { useAppContext } from '../../../../context/app.context';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useState } from 'react';
import RemoveUserDialog from './RemoveUserDialog';
import UserRow from './UserRow';
import { IUser } from '../../../../services/types';

const Users = () => {
    const users = useUsersQuery();
    const usersData = users.data?.data;
    const { user: currentUser } = useAppContext();
    const [open, setOpen] = useState(false);
    const [clickedUser, setClickedUser] = useState<IUser | undefined>(
        undefined
    );

    const handleDialogOpen = (user: IUser) => {
        setOpen(true);
        setClickedUser(user);
    };
    const handleDialogClose = () => setOpen(false);

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
                        <UserRow
                            key={user.id}
                            user={user}
                            isDisabled={user.id === currentUser.id}
                            handleRemoveClick={() => handleDialogOpen(user)}
                        />
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
            <RemoveUserDialog
                open={open}
                handleClose={handleDialogClose}
                user={clickedUser}
            />
        </div>
    );
};

export default Users;
