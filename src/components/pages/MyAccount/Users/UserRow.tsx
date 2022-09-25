import React from 'react';
import TableCell from '@mui/material/TableCell';
import { Avatar, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TableRow from '@mui/material/TableRow';
import { IUser } from '../../../../services/types';

const UserRow = ({
    user,
    isDisabled,
    handleRemoveClick,
}: {
    user: IUser;
    isDisabled?: boolean;
    handleRemoveClick: () => void;
}) => {
    return (
        <TableRow
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
                    disabled={isDisabled}
                    color="error"
                    onClick={handleRemoveClick}
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default UserRow;
