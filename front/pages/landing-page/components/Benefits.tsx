import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Button,
    Stack,
    Fade,
    Slide,
} from '@mui/material';
import {
    Favorite,
    History,
    Star,
    Group,
    ArrowForward,
} from '@mui/icons-material';

interface BenefitsProps {
    onSignUpClick: () => void;
}

const Benefits: React.FC<BenefitsProps> = ({ onSignUpClick }) => {
    const benefits = [
        {
            icon: Favorite,
            title: 'Favoris personnalisés',
            description: 'Sauvegardez vos contenus préférés pour un accès rapide.'
        },
        {
            icon: History,
            title: 'Historique de visionnage',
            description: 'Reprenez là où vous vous êtes arrêté, sur tous vos appareils.'
        },
        {
            icon: Star,
            title: 'Recommandations avancées',
            description: 'Obtenez des suggestions personnalisées basées sur vos goûts.'
        },
        {
            icon: Group,
            title: 'Communauté privée',
            description: 'Créez des groupes avec vos amis et famille pour partager facilement.'
        }
    ];

    return (
        <Box
            component="section"
            sx={{
                py: 10,
                background: 'linear-gradient(180deg, #0F0F1A 0%, #1A1A2E 100%)',
            }}
        >
            <Container maxWidth="lg">
                <Fade in timeout={800}>
                    <Box textAlign="center" sx={{ mb: 8 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                mb: 3,
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                fontWeight: 700,
                            }}
                        >
                            Pourquoi créer un compte ?
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                                fontSize: '1.25rem',
                                maxWidth: 600,
                                mx: 'auto',
                            }}
                        >
                            Débloquez toutes les fonctionnalités et profitez d&apos;une expérience personnalisée.
                        </Typography>
                    </Box>
                </Fade>

                <Grid container spacing={4} sx={{ mb: 6 }}>
                    {benefits.map((benefit, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Slide
                                direction="up"
                                in
                                timeout={1000 + index * 150}
                            >
                                <Stack
                                    direction="row"
                                    spacing={3}
                                    sx={{
                                        p: 3,
                                        borderRadius: 2,
                                        backgroundColor: 'rgba(15, 15, 26, 0.5)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: 'rgba(15, 15, 26, 0.8)',
                                            transform: 'translateY(-4px)',
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 60,
                                            height: 60,
                                            borderRadius: 2,
                                            backgroundColor: 'rgba(229, 9, 20, 0.1)',
                                            flexShrink: 0,
                                        }}
                                    >
                                        <benefit.icon
                                            sx={{
                                                fontSize: 28,
                                                color: 'primary.main',
                                            }}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                mb: 1,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {benefit.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                lineHeight: 1.6,
                                            }}
                                        >
                                            {benefit.description}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Slide>
                        </Grid>
                    ))}
                </Grid>

                <Fade in timeout={1500}>
                    <Box textAlign="center">
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<ArrowForward />}
                            onClick={onSignUpClick}
                            sx={{
                                px: 6,
                                py: 2,
                                fontSize: '1.125rem',
                                fontWeight: 600,
                                minWidth: 280,
                                '&:hover .MuiSvgIcon-root': {
                                    transform: 'translateX(4px)',
                                },
                                '& .MuiSvgIcon-root': {
                                    transition: 'transform 0.3s ease',
                                },
                            }}
                        >
                            Créer mon compte gratuit
                        </Button>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
};

export default Benefits;