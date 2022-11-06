import React from 'react';
import Dialog, { DialogProps } from '../../../organisms/Dialog/Dialog';

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
            onAccept={onAccept}
            content={content}
            title={title}
            isActionLoading={isActionLoading}
        />
    );
};

export default DeleteUserDialog;
