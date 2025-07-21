import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Fade,
    Slide,
} from '@mui/material';
import {
    Security,
    Link,
    Search,
    AutoAwesome,
} from '@mui/icons-material';

const Features: React.FC = () => {
    const features = [
        {
            icon: Security,
            title: 'Streaming Privé',
            description: 'Partagez en toute sécurité avec vos proches grâce à nos liens privés et chiffrés.'
        },
        {
            icon: Link,
            title: 'Liens Éphémères',
            description: 'Créez des liens temporaires qui expirent automatiquement pour une sécurité optimale.'
        },
        {
            icon: Search,
            title: 'Recherche Rapide',
            description: 'Trouvez instantanément vos films et séries grâce à notre moteur de recherche avancé.'
        },
        {
            icon: AutoAwesome,
            title: 'Recommandations IA',
            description: 'Découvrez de nouveaux contenus grâce à nos recommandations personnalisées (bientôt disponible).'
        }
    ];

    return (
        <Box
            component="section"
            sx={{
                py: 10,
                backgroundColor: 'background.default',
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
                            Pourquoi choisir StreamShare ?
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
                            Une plateforme conçue pour le partage sécurisé et l&apos;expérience utilisateur optimale.
                        </Typography>
                    </Box>
                </Fade>

                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} lg={3} key={index}>
                            <Slide
                                direction="up"
                                in
                                timeout={1000 + index * 200}
                            >
                                <Card
                                    sx={{
                                        height: '100%',
                                        textAlign: 'center',
                                        p: 3,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 12px 40px rgba(229, 9, 20, 0.2)',
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Box
                                            sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 80,
                                                height: 80,
                                                borderRadius: '50%',
                                                backgroundColor: 'rgba(229, 9, 20, 0.1)',
                                                mb: 3,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(229, 9, 20, 0.2)',
                                                    transform: 'scale(1.1)',
                                                },
                                            }}
                                        >
                                            <feature.icon
                                                sx={{
                                                    fontSize: 40,
                                                    color: 'primary.main',
                                                }}
                                            />
                                        </Box>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                mb: 2,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                lineHeight: 1.6,
                                            }}
                                        >
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Slide>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Features;