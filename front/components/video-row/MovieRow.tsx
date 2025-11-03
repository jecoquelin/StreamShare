import React from 'react';
import {
    Box,
    Typography,
    Stack,
    Grid,
} from '@mui/material';
import MovieCard from '../movie-card/MovieCard';
import { Movie } from '../../interfaces/movie';

export default function MovieRow({ title, videos, icon } : {title: string, videos: Movie[], icon: React.ReactNode} ) {
    return (
        <Box sx={{ mb: 6 }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                {icon}
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #ffffff 70%, #E50914 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    {title}
                </Typography>
            </Stack>
            <Grid container spacing={3}>
                {videos.slice(0, 6).map((video) => (
                    <Grid item xs={12} sm={6} md={4} lg={2} key={video.id}>
                        <MovieCard video={video} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}