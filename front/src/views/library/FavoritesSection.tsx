"use client";
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import { Movie } from '@/models/types/movie';
import { getAllFavorites } from '@/models/services/favoritesService';
import MovieCard from '@/views/components/home/MovieCard';

interface FavoritesSectionProps {
    searchQuery: string;
}

export default function FavoritesSection({ searchQuery }: FavoritesSectionProps) {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [filteredFavorites, setFilteredFavorites] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFavorites();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = favorites.filter(movie =>
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredFavorites(filtered);
        } else {
            setFilteredFavorites(favorites);
        }
    }, [searchQuery, favorites]);

    const fetchFavorites = async () => {
        try {
            const response = await getAllFavorites();
            setFavorites(response);
            setFilteredFavorites(response);
        } catch (error) {
            console.error('Erreur lors de la récupération des favoris:', error);
            toast.error('Impossible de charger vos favoris');
        } finally {
            setLoading(false);
        }
    };



    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-white text-xl">Chargement...</div>
            </div>
        );
    }

    if (filteredFavorites.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <Heart className="w-20 h-20 text-gray-600 mb-4" />
                <h2 className="text-2xl text-white mb-2">Aucun favori pour le moment</h2>
                <p className="text-gray-400">Ajoutez des films à vos favoris pour les retrouver ici</p>
            </div>
        );
    }

    return (
        <>
            <p className="text-gray-400 mb-8">
                {filteredFavorites.length} film{filteredFavorites.length > 1 ? 's' : ''} favori{filteredFavorites.length > 1 ? 's' : ''}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredFavorites.map((movie) => (
                    <MovieCard key={movie.id} video={movie} />
                ))}
            </div>
        </>
    );
}
