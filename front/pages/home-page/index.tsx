import React, { useState, useEffect } from 'react';
import {
    Box,
    Chip,
    Container,
    Stack,
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
import { api } from '../../network/apiClient';
import { apiRoutes } from '../../network/apiRoutes';
import { useSnackbar } from '../../components/snackbar-context/SnackbarContext';
import { Genre } from '../../interfaces/genre';
import { Movie } from '../../interfaces/movie';

export default function LandingPage() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
    const [featuredVideo, setFeaturedVideo] = useState<Movie>();
    const [genres, setGenres] = useState<Genre[]>([]);
    const [moviesList, setMoviesList] = useState<Movie[]>();
    const [selectedGenre, setSelectedGenre] = useState<Genre>(); // État pour le genre sélectionné
    const [moviesByGenre, setMoviesByGenre] = useState<Movie[]>([]); // État pour les films filtrés par genre
    const { showSnackbar } = useSnackbar(); // Utiliser le hook pour afficher la Snackbar
    const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);

    const [recentMovie, setRecentMovie] = useState<Movie[]>();
    const [popularVideos, setPopularVideos] = useState<Movie[]>();
    const [topRatedVideos, setTopRatedVideos] = useState<Movie[]>();



    const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setUserMenuAnchor(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setUserMenuAnchor(null);
    };

    const handleGenreSelect = (genre: Genre) => {
        filterMovieByGenre(genre.id);
        setSelectedGenre(prev => genre);
    };

    useEffect(() => {
        retireveAllGenres();
    }, []);

    useEffect(() => {
        retireveAllMovies();
    }, []);

    useEffect(() => {
        filterMovieByName();
    }, [searchQuery]);

    function retireveAllMovies() {
        api(apiRoutes.movies.list)
            .then((movies: Movie[]) => {
                if (movies.length > 0) {
                    setMoviesList(movies);
                    const filteredVideos = movies.filter(video => {
                        const query = searchQuery.toLowerCase();
                        const titleMatch = video.title.toLowerCase().includes(query);
                        const genreMatch = Array.isArray(video.genres)
                            ? video.genres.some(g => g.name.toLowerCase().includes(query))
                            : (video.genres && (video.genres as any).name
                                ? (video.genres as any).name.toLowerCase().includes(query)
                                : false);
                        return titleMatch || genreMatch;
                    });
                    setSearchedMovies(filteredVideos);

                    const randomMovie: Movie = movies[Math.floor(Math.random() * movies.length)];
                    setFeaturedVideo(randomMovie);

                    setRecentMovie(prev => movies.slice(0, 5));
                    setPopularVideos(prev => filteredVideos.sort((a, b) => b.views - a.views));
                    setTopRatedVideos(prev => filteredVideos.sort((a, b) => b.rating - a.rating));

                }
            }).catch(error => {
                console.error('Error fetching movies:', error);
                showSnackbar('Erreur lors de la récupération des films.');
            });
    }

    function retireveAllGenres() {
        api(apiRoutes.genres.list)
            .then((genres: Genre[]) => {
                setGenres(genres);
            }
            ).catch(error => {
                console.error('Error fetching genres:', error);
                showSnackbar('Erreur lors de la récupération des genres.');
            });
    }

    function filterMovieByGenre(genreId: number) {
        setSearchQuery(prev => '');
        if (!moviesList) return;

        // Filtrer les films qui contiennent le genre correspondant
        const filteredMovies = moviesList.filter((movie) =>
            movie.genres.some((genre) => genre.id === genreId)
        );

        // Mettre à jour l'état des films filtrés
        setSearchedMovies(filteredMovies);
    }
    function filterMovieByName(){
        let result : Movie[] = moviesList?.filter(movie =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];
        setSearchedMovies(result);
    }

    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
            <HeaderComponent setSearchMovie={setSearchQuery} />

            {moviesList && moviesList.length > 0 ? (
                <>
                    {/* Hero Section */}
                    {featuredVideo && <Hero featuredVideo={featuredVideo} />}

                    {/* Genre Filter */}
                    <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{
                            overflowX: 'auto',
                            bgcolor: '#14141f',
                            p: 2,
                            pl: 8,
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                            '&::-webkit-scrollbar': { display: 'none' },
                        }}
                    >
                        {genres.map((genre) => (
                            <Chip
                                key={genre.id}
                                label={genre.name}
                                onClick={() => handleGenreSelect(genre)}
                                sx={{
                                    bgcolor: selectedGenre?.id === genre.id ? '#e50914' : '#222', // Rouge si sélectionné, sinon gris
                                    color: selectedGenre?.id === genre.id ? 'white' : 'white', // Texte blanc dans les deux cas
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    py: 2,
                                    px: 1.5,
                                    borderRadius: '25px',
                                    '&:hover': { bgcolor: '#e50914' },
                                }}
                            />
                        ))}
                    </Stack>

                    {/* Content Sections */}
                    <Container maxWidth="xl" sx={{ py: 6 }}>
                        {searchQuery || selectedGenre ? (
                            <MovieRow
                                title={searchQuery ? `Résultats pour "${searchQuery}"` : `Films de genre "${selectedGenre?.name}"`}
                                videos={searchedMovies}
                                icon={<Search sx={{ fontSize: 32, color: 'primary.main' }} />}
                            />
                        ) : (
                            <>
                                <MovieRow
                                    title="Récemment ajoutés"
                                    videos={recentMovie ?? []}
                                    icon={<AccessTime sx={{ fontSize: 32, color: 'primary.main' }} />}
                                />
                                <MovieRow
                                    title="Populaires"
                                    videos={popularVideos ?? []}
                                    icon={<Visibility sx={{ fontSize: 32, color: 'primary.main' }} />}
                                />
                                <MovieRow
                                    title="Mieux notés"
                                    videos={topRatedVideos ?? []}
                                    icon={<Star sx={{ fontSize: 32, color: '#ffd700' }} />}
                                />
                            </>
                        )}
                    </Container>
                </>
            ) : (
                <Container maxWidth="xl" sx={{ py: 6 }}>
                    <Box sx={{ color: 'text.primary' }}>Aucun film disponible pour le moment.</Box>
                </Container>
            )}
        </Box>
    )
};