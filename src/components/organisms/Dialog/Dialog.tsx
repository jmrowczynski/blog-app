import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import Button from '../../atoms/Button';

export interface DialogProps {
    open: boolean;
    onClose: () => void;
    onAccept: () => void;
    title: string;
    content: string;
    isActionLoading?: boolean;
}

const DeleteUserDialog: React.FunctionComponent<DialogProps> = ({
    open,
    onClose,
    onAccept,
    title,
    content,
    isActionLoading,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Disagree</Button>
                <Button
                    onClick={onAccept}
                    autoFocus
                    loading={isActionLoading}
                    disabled={isActionLoading}
                >
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteUserDialog;
