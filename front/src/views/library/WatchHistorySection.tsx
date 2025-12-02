"use client";
import React, { useState, useEffect } from 'react';
import { History } from 'lucide-react';
import { toast } from "sonner";
import { Movie } from '@/models/types/movie';
import { getWatchHistory } from '@/models/services/watchHistoryService';
import MovieCard from '@/views/components/home/MovieCard';

interface WatchHistorySectionProps {
    searchQuery: string;
}

export default function WatchHistorySection({ searchQuery }: WatchHistorySectionProps) {
    const [history, setHistory] = useState<Movie[]>([]);
    const [filteredHistory, setFilteredHistory] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = history.filter(movie =>
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredHistory(filtered);
        } else {
            setFilteredHistory(history);
        }
    }, [searchQuery, history]);

    const fetchHistory = async () => {
        try {
            const response = await getWatchHistory();
            setHistory(response);
            setFilteredHistory(response);
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'historique:', error);
            toast.error('Impossible de charger votre historique');
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

    if (filteredHistory.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <History className="w-20 h-20 text-gray-600 mb-4" />
                <h2 className="text-2xl text-white mb-2">Aucun historique</h2>
                <p className="text-gray-400">Les films que vous regardez apparaîtront ici</p>
            </div>
        );
    }

    return (
        <>
            <p className="text-gray-400 mb-8">
                {filteredHistory.length} film{filteredHistory.length > 1 ? 's' : ''} vu{filteredHistory.length > 1 ? 's' : ''}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredHistory.map((movie) => (
                    <MovieCard key={movie.id} video={movie} />
                ))}
            </div>
        </>
    );
}
