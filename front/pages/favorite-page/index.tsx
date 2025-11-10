import React, { useEffect, useState } from "react";
import MovieCard from '../../components/movie-card/MovieCard';
import { Box, Button } from "@mui/material";
import { Star } from "@mui/icons-material";
import HeaderComponent from "../../components/header/HeaderComponent";
import { Movie } from "../../interfaces/movie";
import { useAuth } from "../../contexts/AuthContext";
import { fetchFavoriteMovies } from "../../network/movies";

export default function FavoritesPage() {
    function setSearchQuery(query: string): void {
        throw new Error("Function not implemented.");
    }

    const [favoritesMovies, setFavoritesMovies] = useState<Movie[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        retrieveFavoritesMovies();
    }, []);

    function retrieveFavoritesMovies(){
        if (!user) return;

        fetchFavoriteMovies(user.id).then((movies) => {
            if (movies) {
                setFavoritesMovies(movies);
            }
        });
    }

    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
            <HeaderComponent setSearchMovie={setSearchQuery} />

            <Box sx={{ padding: '2rem' }}>
                <Button
                    variant="text"
                    sx={{
                        mb: 4,
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        color: 'text.primary',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        '&:hover': {
                            backgroundColor: 'transparent',
                        },
                    }}
                >
                    <Box component="span" sx={{ lineHeight: 1 }}>Vos favoris</Box>
                    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <Star
                            className="star-icon"
                            sx={{
                                fontSize: '1.25rem',
                                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                marginBottom: '3px',
                            }}
                        />

                    </Box>
                </Button>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: 4,
                    }}
                >
                    {favoritesMovies.map((movie: Movie) => (
                        <MovieCard key={movie.id} video={movie} />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
