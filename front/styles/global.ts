import { createTheme } from '@mui/material/styles';

const primaryColor = '#E50914';
const primaryDark = '#B8070F';
const primaryLight = '#FF4757';
const backgroundDefault = '#0F0F1A';
const backgroundPaper = '#1A1A2E';
const textPrimary = '#ffffff';
const textSecondary = '#aaaaaa';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: primaryColor,
            dark: primaryDark,
            light: primaryLight,
        },
        background: {
            default: backgroundDefault,
            paper: backgroundPaper,
        },
        text: {
            primary: textPrimary,
            secondary: textSecondary,
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
                    boxShadow: `0 4px 20px rgba(229, 9, 20, 0.3)`,
                    '&:hover': {
                        boxShadow: `0 8px 30px rgba(229, 9, 20, 0.5)`,
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
                    backgroundColor: backgroundPaper,
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
                        backgroundColor: backgroundDefault,
                        '& fieldset': {
                            borderColor: '#666',
                        },
                        '&:hover fieldset': {
                            borderColor: '#aaa',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: primaryColor,
                        },
                    },
                },
            },
        },
    },
});