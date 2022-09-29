import { useUsersQuery } from '../../../../services/api/hooks/useUsersQuery';
import { useAppContext } from '../../../../context/app.context';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useState } from 'react';
import DeleteUserDialog from './DeleteUserDialog';
import UserRow from './UserRow';
import { IUser } from '../../../../services/types';
import { useDeleteUserMutation } from '../../../../services/api/hooks/useDeleteUserMutation';

const Users = () => {
    const users = useUsersQuery();
    const usersData = users.data?.data;
    const { user: currentUser } = useAppContext();
    const [open, setOpen] = useState(false);
    const [clickedUser, setClickedUser] = useState<IUser | undefined>(
        undefined
    );
    const { mutate: deleteUser } = useDeleteUserMutation();

    const handleDialogOpen = (user: IUser) => {
        setOpen(true);
        setClickedUser(user);
    };
    const handleDialogClose = () => setOpen(false);
    const handleUserDelete = () => {
        setOpen(false);
        if (clickedUser) {
            deleteUser(clickedUser.id);
        }
    };

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
            <DeleteUserDialog
                open={open}
                onClose={handleDialogClose}
                onAccept={handleUserDelete}
                user={clickedUser}
            />
        </div>
    );
};

export default Users;
