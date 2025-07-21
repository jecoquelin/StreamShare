import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Stack,
    Fade,
    Slide,
} from '@mui/material';
import { PlayArrow, People } from '@mui/icons-material';

interface HeaderProps {
    onAuthClick: () => void;
    onDiscoverClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick, onDiscoverClick }) => {
    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Background Image with Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'url(https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(0.3)',
                    },
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, rgba(15, 15, 26, 0.9) 0%, rgba(15, 15, 26, 0.7) 50%, rgba(15, 15, 26, 0.9) 100%)',
                    },
                }}
            />

            {/* Content */}
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                <Fade in timeout={1000}>
                    <Box>
                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mb: 4 }}>
                            <PlayArrow sx={{ fontSize: { xs: 60, md: 80 }, color: 'primary.main' }} />
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
                                    fontWeight: 700,
                                    background: 'linear-gradient(45deg, #ffffff 30%, #E50914 90%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                StreamShare
                            </Typography>
                        </Stack>
                    </Box>
                </Fade>

                <Slide direction="up" in timeout={1200}>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: '1.125rem', md: '1.5rem' },
                            color: 'text.secondary',
                            mb: 6,
                            maxWidth: 600,
                            mx: 'auto',
                            lineHeight: 1.6,
                        }}
                    >
                        Partagez vos films et séries préférés avec vos proches.
                        Créez des liens éphémères pour un streaming privé et sécurisé.
                    </Typography>
                </Slide>

                <Slide direction="up" in timeout={1400}>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={3}
                        justifyContent="center"
                        alignItems="center"
                        sx={{ mt: 6 }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<People />}
                            onClick={onAuthClick}
                            sx={{
                                px: 4,
                                py: 2,
                                fontSize: '1.125rem',
                                minWidth: 200,
                            }}
                        >
                            Connexion
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            onClick={onDiscoverClick}
                            sx={{
                                px: 4,
                                py: 2,
                                fontSize: '1.125rem',
                                minWidth: 200,
                                color: 'white',
                                borderColor: 'white',
                                '&:hover': {
                                    borderColor: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            Découvrir
                        </Button>
                    </Stack>
                </Slide>

                {/* Scroll Indicator */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: -150,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        animation: 'bounce 2s infinite',
                        '@keyframes bounce': {
                            '0%, 20%, 53%, 80%, 100%': {
                                transform: 'translateX(-50%) translateY(0)',
                            },
                            '40%, 43%': {
                                transform: 'translateX(-50%) translateY(-10px)',
                            },
                            '70%': {
                                transform: 'translateX(-50%) translateY(-5px)',
                            },
                            '90%': {
                                transform: 'translateX(-50%) translateY(-2px)',
                            },
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: 24,
                            height: 40,
                            border: '2px solid white',
                            borderRadius: 12,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            pt: 1,
                        }}
                    >
                        <Box
                            sx={{
                                width: 4,
                                height: 12,
                                backgroundColor: 'white',
                                borderRadius: 2,
                                animation: 'pulse 2s infinite',
                            }}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Header;