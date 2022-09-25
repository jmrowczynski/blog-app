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
    handleClose: () => void;
    user?: IUser;
}

const RemoveUserDialog: React.FunctionComponent<RemoveUserDialogProps> = ({
    open,
    handleClose,
    user,
}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{user?.name}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to remove {user?.name}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RemoveUserDialog;
