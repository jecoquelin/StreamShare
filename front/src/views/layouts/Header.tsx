import React, { useState } from 'react';
import { Play, Plus, Search, User, Settings, History, LogOut, Heart, Library } from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/views/components/ui/Avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/views/components/ui/dropdown-menu';
import router from 'next/router';

interface Props {
    setSearchMovie: (query: string) => void;
}

export default function HeaderComponent({ setSearchMovie }: Props) {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        console.log("Search Query:", query);
        setSearchQuery(query);
        setSearchMovie(query);
    };

    return (
        <header className="sticky top-0 z-50 bg-[#0f0f1a]/95 backdrop-blur-md border-b border-white/10">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-4">
                    {/* Logo and Navigation */}
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <Play className="w-10 h-10 text-[#e50914]" />
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-white to-[#e50914] bg-clip-text text-transparent">
                                StreamShare
                            </h1>
                        </div>

                        {/* Library Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.href = '/library'}
                            className="group flex items-center gap-2 text-white hover:text-[#e50914] transition-colors relative"
                        >
                            <Library className="w-5 h-5 transition-all duration-400 group-hover:text-[#e50914] group-hover:drop-shadow-[0_0_8px_rgba(229,9,20,0.8)]" />
                            <span className="leading-none font-medium">Ma Bibliothèque</span>
                        </motion.button>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-md mx-8">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher films, séries..."
                                value={searchQuery}
                                onChange={handleQueryChange}
                                className="w-full pl-10 pr-4 py-2 bg-white/5 hover:bg-white/8 border border-transparent rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e50914]/50 transition-all"
                            />
                        </div>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center gap-4">
                        {/* Add Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 text-white border border-white/30 rounded hover:border-[#e50914] hover:bg-[#e50914]/10 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Ajouter
                        </motion.button>

                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="focus:outline-none focus:ring-2 focus:ring-[#e50914]/50 rounded-full">
                                    <Avatar className="w-10 h-10 bg-[#e50914] cursor-pointer hover:ring-2 hover:ring-[#e50914]/50 transition-all">
                                        <AvatarFallback className="bg-[#e50914] text-white">
                                            <User className="w-6 h-6" />
                                        </AvatarFallback>
                                    </Avatar>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-56 bg-[#0f0f1a]/95 backdrop-blur-md border border-white/10 text-white"
                            >
                                <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
                                    <Settings className="w-5 h-5 mr-3" />
                                    Paramètres
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
                                    <History className="w-5 h-5 mr-3" />
                                    Historique
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
                                    <LogOut className="w-5 h-5 mr-3" />
                                    Déconnexion
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
}