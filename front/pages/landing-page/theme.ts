import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#E50914',
            dark: '#B8070F',
            light: '#FF4757',
        },
        background: {
            default: '#0F0F1A',
            paper: '#1A1A2E',
        },
        text: {
            primary: '#ffffff',
            secondary: '#aaaaaa',
        },
    },
    typography: {
        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '4rem',
            '@media (max-width:600px)': {
                fontSize: '2.5rem',
            },
        },
        h2: {
            fontWeight: 700,
            fontSize: '3rem',
            '@media (max-width:600px)': {
                fontSize: '2rem',
            },
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.5rem',
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.25rem',
        },
        body1: {
            fontWeight: 300,
            fontSize: '1.125rem',
            lineHeight: 1.6,
        },
        body2: {
            fontWeight: 300,
            fontSize: '1rem',
            lineHeight: 1.5,
        },
        button: {
            fontWeight: 600,
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '12px 32px',
                    fontSize: '1.125rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    },
                },
                contained: {
                    boxShadow: '0 4px 20px rgba(229, 9, 20, 0.3)',
                    '&:hover': {
                        boxShadow: '0 8px 30px rgba(229, 9, 20, 0.5)',
                    },
                },
                outlined: {
                    borderWidth: 2,
                    '&:hover': {
                        borderWidth: 2,
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1A1A2E',
                    borderRadius: 12,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: '#0F0F1A',
                        '& fieldset': {
                            borderColor: '#666',
                        },
                        '&:hover fieldset': {
                            borderColor: '#aaa',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#E50914',
                        },
                    },
                },
            },
        },
    },
});