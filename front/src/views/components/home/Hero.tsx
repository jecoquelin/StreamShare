import React from 'react';
import { Play, Plus, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Movie } from '@/models/types/movie';
import { formatDurationString } from '@/lib/utils/helper';

export default function Hero({ featuredVideo }: { featuredVideo: Movie }) {
    return (
        <div
            className="relative h-[60vh] flex items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${featuredVideo.thumbnail})` }}
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f1a]/80 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-[600px]"
                >
                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        {featuredVideo.title}
                    </h1>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 mb-6 flex-wrap">
                        {/* Genre Chip */}
                        <span className="px-3 py-1 rounded-full bg-[#e50914]/20 text-[#e50914] text-sm font-medium">
                            {featuredVideo.genres.map((g) => g.name).join(', ')}
                        </span>

                        {/* Duration */}
                        <span className="text-white text-base">
                            {formatDurationString(featuredVideo.duration_second)}
                        </span>

                        {/* Rating */}
                        <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 text-[#ffd700] fill-[#ffd700]" />
                            <span className="text-white text-base">{featuredVideo.rating}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-base mb-8 leading-relaxed">
                        Découvrez ce contenu exceptionnel qui vous transportera dans un univers unique.
                        Une expérience cinématographique inoubliable vous attend.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-4 flex-wrap">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                window.location.href = `/watch-page?movieId=${featuredVideo.id}`;
                            }}
                            className="flex items-center gap-2 px-8 py-3 bg-[#e50914] text-white text-lg font-semibold rounded hover:bg-[#f40612] transition-colors"
                        >
                            <Play className="w-6 h-6" />
                            Regarder maintenant
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-8 py-3 bg-transparent text-white text-lg font-semibold rounded border-2 border-white/50 hover:border-white hover:bg-white/10 transition-all"
                        >
                            <Plus className="w-6 h-6" />
                            Ma liste
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}