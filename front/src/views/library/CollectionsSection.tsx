"use client";
import React, { useState, useEffect } from 'react';
import { FolderHeart, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import { Movie } from '@/models/types/movie';
import { getUserCollections, createCollection, deleteCollection } from '@/models/services/collectionsService';
import MovieCard from '@/views/components/home/MovieCard';

interface Collection {
    id: number;
    name: string;
    user_id: number;
    created_at: string;
    movies: Movie[];
}

interface CollectionsSectionProps {
    searchQuery: string;
}

export default function CollectionsSection({ searchQuery }: CollectionsSectionProps) {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [filteredCollections, setFilteredCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState('');

    useEffect(() => {
        fetchCollections();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = collections.filter(collection =>
                collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                collection.movies.some(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setFilteredCollections(filtered);
        } else {
            setFilteredCollections(collections);
        }
    }, [searchQuery, collections]);

    const fetchCollections = async () => {
        try {
            const response = await getUserCollections();
            setCollections(response);
            setFilteredCollections(response);
        } catch (error) {
            console.error('Erreur lors de la récupération des collections:', error);
            toast.error('Impossible de charger vos collections');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCollection = async () => {
        if (!newCollectionName.trim()) {
            toast.error('Veuillez entrer un nom pour la collection');
            return;
        }

        try {
            await createCollection(newCollectionName);
            toast.success('Collection créée avec succès');
            setNewCollectionName('');
            setShowCreateModal(false);
            fetchCollections();
        } catch (error) {
            console.error('Erreur lors de la création de la collection:', error);
            toast.error('Impossible de créer la collection');
        }
    };

    const handleDeleteCollection = async (collectionId: number, collectionName: string) => {
        if (confirm(`Voulez-vous vraiment supprimer la collection "${collectionName}" ?`)) {
            try {
                await deleteCollection(collectionId);
                toast.success('Collection supprimée');
                fetchCollections();
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                toast.error('Impossible de supprimer la collection');
            }
        }
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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-white text-xl">Chargement...</div>
            </div>
        );
    }

    return (
        <>
            {/* Bouton Créer une collection */}
            <div className="mb-8">
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-6 py-3 bg-[#e50914] hover:bg-[#c4070f] text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                    <Plus size={20} />
                    Créer une collection
                </button>
            </div>

            {/* Modal de création */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-[#1a1a24] rounded-xl p-8 max-w-md w-full mx-4"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">Nouvelle collection</h2>
                        <input
                            type="text"
                            value={newCollectionName}
                            onChange={(e) => setNewCollectionName(e.target.value)}
                            placeholder="Nom de la collection"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#e50914] mb-6"
                            autoFocus
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={handleCreateCollection}
                                className="flex-1 px-6 py-3 bg-[#e50914] hover:bg-[#c4070f] text-white font-semibold rounded-lg transition-all"
                            >
                                Créer
                            </button>
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setNewCollectionName('');
                                }}
                                className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg transition-all"
                            >
                                Annuler
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {filteredCollections.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <FolderHeart className="w-20 h-20 text-gray-600 mb-4" />
                    <h2 className="text-2xl text-white mb-2">Aucune collection</h2>
                    <p className="text-gray-400">Créez des collections pour organiser vos films</p>
                </div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-8"
                >
                    {filteredCollections.map((collection) => (
                        <motion.div
                            key={collection.id}
                            variants={itemVariants}
                            className="bg-[#0f0f1a]/80 rounded-xl p-6"
                        >
                            {/* Header de la collection */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <FolderHeart className="w-6 h-6 text-[#e50914]" />
                                    <h2 className="text-2xl font-bold text-white">{collection.name}</h2>
                                    <span className="text-gray-400 text-sm">
                                        ({collection.movies?.length || 0} film{(collection.movies?.length || 0) > 1 ? 's' : ''})
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleDeleteCollection(collection.id, collection.name)}
                                    className="p-2 hover:bg-red-500/20 rounded-lg transition-all group"
                                >
                                    <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                                </button>
                            </div>

                            {/* Films de la collection */}
                            {collection.movies && collection.movies.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                    {collection.movies.map((movie) => (
                                        <MovieCard key={movie.id} video={movie} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-400">
                                    Cette collection est vide
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </>
    );
}
