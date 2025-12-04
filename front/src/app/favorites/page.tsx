"use client";
import React, { useState, useEffect } from 'react';
import { Heart, Star, Eye, Clock, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import HeaderComponent from '@/views/layouts/Header';
import { toast } from "sonner";
import { Movie } from '@/models/types/movie';
import MovieCard from "@/views/components/home/MovieCard";
import { getAllFavorites } from '@/models/services/favoritesService';

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
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
            console.log('Favoris récupérés:', response);
            setFilteredFavorites(response);
        } catch (error) {
            console.error('Erreur lors de la récupération des favoris:', error);
            toast.error('Impossible de charger vos favoris');
        } finally {
            setLoading(false);
        }
    };

    const handlePlay = (movieId: number) => {
        window.location.href = `/watch/${movieId}`;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="bg-[#0a0a0f] min-h-screen">
            <HeaderComponent setSearchMovie={setSearchQuery} />

            <div className="max-w-[1920px] mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-8">
                    <Heart className="w-10 h-10 text-[#e50914] fill-[#e50914]" />
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-[#e50914] bg-clip-text text-transparent">
                        Vos Favoris
                    </h1>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-white text-xl">Chargement...</div>
                    </div>
                ) : filteredFavorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <Heart className="w-20 h-20 text-gray-600 mb-4" />
                        <h2 className="text-2xl text-white mb-2">Aucun favori pour le moment</h2>
                        <p className="text-gray-400">Ajoutez des films à vos favoris pour les retrouver ici</p>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-400 mb-8">
                            {filteredFavorites.length} film{filteredFavorites.length > 1 ? 's' : ''} favori{filteredFavorites.length > 1 ? 's' : ''}
                        </p>

                        {/* Grid de favoris style Epic Games */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                        >
                            {filteredFavorites.map((movie) => (
                                MovieCard({ video: movie })
                            ))}
                        </motion.div>
                    </>
                )}
            </div>
        </div>
    );
}
