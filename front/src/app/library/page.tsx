"use client";
import React, { useState } from 'react';
import { Heart, FolderHeart, History, Library } from 'lucide-react';
import { motion } from 'framer-motion';
import HeaderComponent from '@/views/layouts/Header';
import FavoritesSection from '@/views/library/FavoritesSection';
import CollectionsSection from '@/views/library/CollectionsSection';
import WatchHistorySection from '@/views/library/WatchHistorySection';

type TabType = 'favorites' | 'collections' | 'history';

export default function LibraryPage() {
    const [activeTab, setActiveTab] = useState<TabType>('favorites');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const tabs = [
        { id: 'favorites' as TabType, label: 'Favoris', icon: Heart },
        { id: 'collections' as TabType, label: 'Collections', icon: FolderHeart },
        { id: 'history' as TabType, label: 'Films vus', icon: History },
    ];

    return (
        <div className="bg-[#0a0a0f] min-h-screen">
            <HeaderComponent setSearchMovie={setSearchQuery} />

            <div className="max-w-[1920px] mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-8">
                    <Library className="w-10 h-10 text-[#e50914]" />
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-[#e50914] bg-clip-text text-transparent">
                        Ma Bibliothèque
                    </h1>
                </div>

                {/* Tabs - Style Epic Games */}
                <div className="flex gap-2 mb-8 border-b border-white/10">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    relative px-6 py-4 flex items-center gap-2 font-semibold text-base
                                    transition-all duration-200
                                    ${isActive 
                                        ? 'text-white' 
                                        : 'text-gray-400 hover:text-white'
                                    }
                                `}
                            >
                                <Icon size={20} />
                                {tab.label}
                                
                                {/* Indicateur actif */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e50914]"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Content Section */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'favorites' && <FavoritesSection searchQuery={searchQuery} />}
                    {activeTab === 'collections' && <CollectionsSection searchQuery={searchQuery} />}
                    {activeTab === 'history' && <WatchHistorySection searchQuery={searchQuery} />}
                </motion.div>
            </div>
        </div>
    );
}
