
import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Stack,
    Chip,
    Fade,
} from '@mui/material';
import {
    PlayArrow,
    Add,
    Star,
} from '@mui/icons-material';
import { Movie } from '../../../interfaces/movie';
import { formatDurationString } from '../../../utils/helper';

export default function Hero({ featuredVideo }: { featuredVideo: Movie }) {
    return (
        <Box
            sx={{
                position: 'relative',
                height: '60vh',
                backgroundImage: `url(${featuredVideo.thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(45deg, rgba(15, 15, 26, 0.8) 0%, transparent 60%)',
                },
            }}
        >
            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
                <Fade in timeout={1000}>
                    <Box sx={{ maxWidth: 600 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                fontSize: { xs: '2rem', md: '3rem' },
                            }}
                        >
                            {featuredVideo.title}
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                            <Chip
                                label={featuredVideo.genres.map((g) => g.name).join(', ')}
                                sx={{
                                    backgroundColor: 'rgba(229, 9, 20, 0.2)',
                                    color: 'primary.main',
                                }}
                            />
                            <Typography variant="body1">{formatDurationString(featuredVideo.duration_second)}</Typography>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <Star sx={{ fontSize: 20, color: '#ffd700' }} />
                                <Typography variant="body1">{featuredVideo.rating}</Typography>
                            </Stack>
                        </Stack>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mb: 4, lineHeight: 1.6 }}
                        >
                            Découvrez ce contenu exceptionnel qui vous transportera dans un univers unique.
                            Une expérience cinématographique inoubliable vous attend.
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<PlayArrow />}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                }}
                                onClick={() => {
                                    window.location.href = `/watch-page?movieId=${featuredVideo.id}`;
                                }}
                            >
                                Regarder maintenant
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<Add />}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    color: 'white',
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                    '&:hover': {
                                        borderColor: 'white',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                Ma liste
                            </Button>
                        </Stack>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
}
