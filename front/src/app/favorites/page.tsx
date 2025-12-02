"use client";
import React, { useState, useEffect } from 'react';
import { Heart, Star, Eye, Clock, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import HeaderComponent from '@/views/layouts/Header';
import { api } from '@/lib/api/client';
import { apiRoutes } from '@/lib/api/endoints';
import { toast } from "sonner";
import { Movie } from '@/models/types/movie';
import { formatDurationString } from '@/lib/utils/helper';
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
                                <motion.div
                                    key={movie.id}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    className="group relative bg-[#0f0f1a]/80 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/20"
                                >
                                    {/* Image principale */}
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <img
                                            src={movie.thumbnail}
                                            alt={movie.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />

                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-[#0f0f1a]/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                        {/* Play button overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handlePlay(movie.id)}
                                                className="p-4 bg-[#e50914] text-white rounded-full hover:scale-110 transition-transform shadow-lg"
                                            >
                                                <Play size={32} fill="white" />
                                            </button>
                                        </div>

                                        {/* Duration badge */}
                                        <span className="absolute top-3 right-3 bg-black/90 text-white text-sm px-3 py-1 rounded-md font-semibold">
                                            {formatDurationString(movie.duration_second)}
                                        </span>

                                        {/* Heart icon */}
                                        <button className="absolute top-3 left-3 p-2 bg-black/90 rounded-full hover:bg-[#e50914] transition-all">
                                            <Heart className="w-5 h-5 text-[#e50914] fill-[#e50914]" />
                                        </button>
                                    </div>

                                    {/* Contenu */}
                                    <div className="p-5">
                                        {/* Titre */}
                                        <h3 className="text-white text-xl font-bold mb-2 line-clamp-1 group-hover:text-[#e50914] transition-colors">
                                            {movie.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                            {movie.description || "Aucune description disponible"}
                                        </p>

                                        {/* Genres */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {movie.genres?.slice(0, 3).map((genre) => (
                                                <span
                                                    key={genre.id}
                                                    className="px-3 py-1 bg-white/5 text-gray-300 text-xs rounded-full border border-white/10"
                                                >
                                                    {genre.name}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1.5">
                                                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                                    <span className="text-white font-semibold">{movie.rating}</span>
                                                </div>

                                                <div className="flex items-center gap-1.5">
                                                    <Eye size={16} className="text-gray-400" />
                                                    <span className="text-gray-300">{movie.views.toLocaleString()}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1 text-gray-400">
                                                <Clock size={14} />
                                                <span>{movie.year}</span>
                                            </div>
                                        </div>

                                        {/* Bouton play */}
                                        <button
                                            onClick={() => handlePlay(movie.id)}
                                            className="w-full mt-4 py-3 bg-white/5 hover:bg-[#e50914] text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-[#e50914]"
                                        >
                                            <Play size={18} />
                                            Regarder maintenant
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </>
                )}
            </div>
        </div>
    );
}
