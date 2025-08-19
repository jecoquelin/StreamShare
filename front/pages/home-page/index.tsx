import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
} from '@mui/material';
import {
    Search,
    Star,
    AccessTime,
    Visibility,
} from '@mui/icons-material';

import HeaderComponent from '../../components/header/HeaderComponent';
import Hero from './components/Hero';
import MovieRow from '../../components/video-row/MovieRow';

// Mock data - replace with your actual API calls
const mockVideos = [
    {
        id: 1,
        title: "Le Voyage Extraordinaire",
        thumbnail: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop",
        duration: "2h 15min",
        genre: "Aventure",
        rating: 4.8,
        year: 2023,
        views: 1250,
        isRecent: true
    },
    {
        id: 2,
        title: "Mystères de la Nuit",
        thumbnail: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop",
        duration: "1h 45min",
        genre: "Thriller",
        rating: 4.5,
        year: 2023,
        views: 890,
        isRecent: true
    },
    {
        id: 3,
        title: "Comédie d'Été",
        thumbnail: "https://images.pexels.com/photos/1200450/pexels-photo-1200450.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop",
        duration: "1h 30min",
        genre: "Comédie",
        rating: 4.2,
        year: 2022,
        views: 567,
        isRecent: false
    },
    {
        id: 4,
        title: "Science Fiction 2050",
        thumbnail: "https://images.pexels.com/photos/2832432/pexels-photo-2832432.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop",
        duration: "2h 30min",
        genre: "Sci-Fi",
        rating: 4.9,
        year: 2023,
        views: 2100,
        isRecent: true
    },
    {
        id: 5,
        title: "Romance Parisienne",
        thumbnail: "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop",
        duration: "1h 55min",
        genre: "Romance",
        rating: 4.3,
        year: 2023,
        views: 745,
        isRecent: false
    },
    {
        id: 6,
        title: "Action Héroïque",
        thumbnail: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop",
        duration: "2h 05min",
        genre: "Action",
        rating: 4.7,
        year: 2023,
        views: 1580,
        isRecent: true
    },
    {
        id: 6,
        title: "Action Héroïque",
        thumbnail: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop",
        duration: "2h 05min",
        genre: "Action",
        rating: 4.7,
        year: 2023,
        views: 1580,
        isRecent: true
    }
];

export default function LandingPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
    const [featuredVideo, setFeaturedVideo] = useState(mockVideos[0]);
    
    // Filter videos based on search
    const filteredVideos = mockVideos.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const recentVideos = filteredVideos.filter(video => video.isRecent);
    const popularVideos = filteredVideos.sort((a, b) => b.views - a.views);
    const topRatedVideos = filteredVideos.sort((a, b) => b.rating - a.rating);

    const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setUserMenuAnchor(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setUserMenuAnchor(null);
    };

    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
            <HeaderComponent />

            {/* Hero Section */}

            <Hero featuredVideo={featuredVideo} />
            

            {/* Content Sections */}
            <Container maxWidth="xl" sx={{ py: 6 }}>
                {searchQuery ? (
                    <MovieRow
                        title={`Résultats pour "${searchQuery}"`}
                        videos={filteredVideos}
                        icon={<Search sx={{ fontSize: 32, color: 'primary.main' }} />}
                    />
                ) : (
                    <>
                        <MovieRow
                            title="Récemment ajoutés"
                            videos={recentVideos}
                            icon={<AccessTime sx={{ fontSize: 32, color: 'primary.main' }} />}
                        />
                        <MovieRow
                            title="Populaires"
                            videos={popularVideos}
                            icon={<Visibility sx={{ fontSize: 32, color: 'primary.main' }} />}
                        />
                        <MovieRow
                            title="Mieux notés"
                            videos={topRatedVideos}
                            icon={<Star sx={{ fontSize: 32, color: '#ffd700' }} />}
                        />
                    </>
                )}
            </Container>
        </Box>
    );
};