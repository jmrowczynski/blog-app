import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { IUser } from '../../../../services/types';

export interface RemoveUserDialogProps {
    open: boolean;
    onClose: () => void;
    onAccept: () => void;
    user?: IUser;
}

const DeleteUserDialog: React.FunctionComponent<RemoveUserDialogProps> = ({
    open,
    onClose,
    onAccept,
    user,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{user?.name}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete {user?.name}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Disagree</Button>
                <Button onClick={onAccept} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteUserDialog;
