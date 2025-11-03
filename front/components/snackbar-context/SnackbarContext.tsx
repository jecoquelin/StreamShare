import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Button } from '@mui/material';

interface SnackbarContextProps {
    showSnackbar: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

    const showSnackbar = (message: string) => {
        setSnackbarMessage(message);
        setIsSnackbarOpen(true);
    };

    const handleClose = () => {
        setIsSnackbarOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackbarMessage}
                action={
                    <Button color="inherit" onClick={handleClose}>
                        Close
                    </Button>
                }
            />
        </SnackbarContext.Provider>
    );
};