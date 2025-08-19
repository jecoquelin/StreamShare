import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Stack,
    Card,
    CardMedia,
    Grid,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Chip,
    TextField,
    InputAdornment,
    Fade,
    Slide,
} from '@mui/material';
import {
    PlayArrow,
    Add,
    Search,
    AccountCircle,
    Logout,
    Settings,
    History,
    Favorite,
    Star,
    AccessTime,
    Visibility,
} from '@mui/icons-material';

interface VideoProps {
    // title: string;
    // content: string;
    id: number;
    title: string;
    thumbnail: string;
    duration: string;
    genre: string;
    rating: number;
    year: number;
    views: number;
    isRecent: boolean;
}

import MovieCard from '../movie-card/MovieCard';

export default function MovieRow({ title, videos, icon } : {title: string, videos: VideoProps[], icon: React.ReactNode} ) {
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