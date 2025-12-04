"use client";
import React, { useState, useEffect } from 'react';
import { Search, Star, Clock, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/views/components/ui/ScrollArea';
import HeaderComponent from '@/views/layouts/Header';
import Hero from '@/views/components/home/Hero';
import MovieRow from '@/views/components/home/MovieRow';
import { api } from '@/lib/api/client';
import { apiRoutes } from '@/lib/api/endoints';
import { toast } from "sonner"
import { Genre } from '@/models/types/genre';
import { Movie } from '@/models/types/movie';
import { useAuth } from "@/models/store/AuthStore";

export default function LandingPage() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
    const [featuredVideo, setFeaturedVideo] = useState<Movie>();
    const [genres, setGenres] = useState<Genre[]>([]);
    const [moviesList, setMoviesList] = useState<Movie[]>();
    const [selectedGenre, setSelectedGenre] = useState<Genre>();
    const [moviesByGenre, setMoviesByGenre] = useState<Movie[]>([]);
    const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);

    const [recentMovie, setRecentMovie] = useState<Movie[]>();
    const [popularVideos, setPopularVideos] = useState<Movie[]>();
    const [topRatedVideos, setTopRatedVideos] = useState<Movie[]>();
    const { user, loading } = useAuth();

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
                toast.error('Erreur lors de la récupération des films.');
            });
    }

    function retireveAllGenres() {
        api(apiRoutes.genres.list)
            .then((genres: Genre[]) => {
                setGenres(genres);
            }).catch(error => {
                console.error('Error fetching genres:', error);
                toast.error('Erreur lors de la récupération des genres.');
            });
    }

    function filterMovieByGenre(genreId: number) {
        setSearchQuery(prev => '');
        if (!moviesList) return;

        const filteredMovies = moviesList.filter((movie) =>
            movie.genres.some((genre) => genre.id === genreId)
        );

        setSearchedMovies(filteredMovies);
    }

    function filterMovieByName() {
        let result: Movie[] = moviesList?.filter(movie =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];
        setSearchedMovies(result);
    }

    return (
        <div className="bg-[#0a0a0f] min-h-screen">
            <HeaderComponent setSearchMovie={setSearchQuery} />
            {loading ? (
                <div className="max-w-[1920px] mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="text-white">Chargement...</div>
                </div>
            ) : (
                moviesList && moviesList.length > 0 ? (
                    <>
                        {/* Hero Section */}
                        {featuredVideo && <Hero featuredVideo={featuredVideo} />}

                        {/* Genre Filter */}
                        <ScrollArea className="w-full">
                            <div className="flex gap-3 bg-[#14141f] p-4 pl-8 border-b border-white/10 overflow-x-auto scrollbar-hide">
                                {genres.map((genre) => (
                                    <motion.button
                                        key={genre.id}
                                        onClick={() => handleGenreSelect(genre)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`px-6 py-2 rounded-full text-base font-semibold whitespace-nowrap transition-colors ${selectedGenre?.id === genre.id
                                            ? 'bg-[#e50914] text-white'
                                            : 'bg-[#222] text-white hover:bg-[#e50914]'
                                            }`}
                                    >
                                        {genre.name}
                                    </motion.button>
                                ))}
                            </div>
                        </ScrollArea>

                        {/* Content Sections */}
                        <div className="max-w-[1920px] mx-auto py-12 px-4 sm:px-6 lg:px-8">
                            {searchQuery || selectedGenre ? (
                                <MovieRow
                                    title={searchQuery ? `Résultats pour "${searchQuery}"` : `Films de genre "${selectedGenre?.name}"`}
                                    videos={searchedMovies}
                                    icon={<Search className="w-8 h-8 text-[#e50914]" />}
                                />
                            ) : (
                                <>
                                    <MovieRow
                                        title="Récemment ajoutés"
                                        videos={recentMovie ?? []}
                                        icon={<Clock className="w-8 h-8 text-[#e50914]" />}
                                    />
                                    <MovieRow
                                        title="Populaires"
                                        videos={popularVideos ?? []}
                                        icon={<Eye className="w-8 h-8 text-[#e50914]" />}
                                    />
                                    <MovieRow
                                        title="Mieux notés"
                                        videos={topRatedVideos ?? []}
                                        icon={<Star className="w-8 h-8 text-[#ffd700]" />}
                                    />
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="max-w-[1920px] mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <div className="text-white">Aucun film disponible pour le moment.</div>
                    </div>
                )
            )}
        </div>
    );
}

