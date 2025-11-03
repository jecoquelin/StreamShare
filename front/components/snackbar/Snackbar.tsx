import React from 'react';
import { Snackbar, Button } from '@mui/material';

interface CustomSnackbarProps {
    open: boolean;
    message: string;
    onClose: () => void;
}

export default function CustomSnackbar ({ open, message, onClose }: CustomSnackbarProps) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            message={message}
            action={
                <Button color="inherit" onClick={onClose}>
                    Close
                </Button>
            }
        />
    );
};
