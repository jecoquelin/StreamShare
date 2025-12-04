import React, { useState } from "react";
import MovieDetailsModal from "@/views/components/home/MovieDetailModal";
import MovieCardPreview from "@/views/components/home/MovieCardPreview";
import { Movie } from "@/models/types/movie";
import { formatDurationString } from "@/lib/utils/helper";
import { Play, Star, Eye, Clock, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { addFavorite, removeFavorite } from "@/models/services/favoritesService";

export default function MovieCard({ video }: { video: Movie }) {
	const [open, setOpen] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isFavorite, setIsFavorite] = useState(video.isFavorite || false);

	const handlePlay = (id: number) => {
		window.location.href = `/watch-page?movieId=${id}`;
		setOpen(false);
	};

	const toggleFavorite = async (e: React.MouseEvent) => {
		e.stopPropagation();

		try {
			if (isFavorite) {
				removeFavorite(video.id);
				setIsFavorite(false);
				toast.success('Film retiré des favoris');
			} else {
				addFavorite(video.id);
				setIsFavorite(true);
				toast.success('Film ajouté aux favoris');
			}
		} catch (error) {
			console.error('Erreur lors de la modification des favoris:', error);
			toast.error('Une erreur est survenue');
		}
	};

	return (
		<>
			<motion.div
				whileHover={{ scale: 1.03 }}
				onClick={() => setOpen(true)}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className="group bg-[#0f0f1a]/80 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/20"
			>
				{/* Image principale */}
				<div className="relative h-48 w-full overflow-hidden">
					<img
						src={video.thumbnail}
						alt={video.title}
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
					/>

					{/* Preview vidéo au hover */}
					<MovieCardPreview movie_id={video.id} isHovered={isHovered} />

					{/* Overlay gradient */}
					<div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-[#0f0f1a]/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

					{/* Play button overlay */}
					<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
						<button className="p-3 bg-[#e50914] text-white rounded-full hover:scale-110 transition-transform shadow-lg">
							<Play size={28} fill="white" />
						</button>
					</div>

					{/* Duration badge */}
					<span className="absolute top-2 right-2 bg-black/90 text-white text-xs px-2 py-1 rounded-md font-semibold">
						{formatDurationString(video.duration_second)}
					</span>

					{/* Favorite button */}
					<button
						onClick={toggleFavorite}
						className="absolute top-2 left-2 p-2 bg-black/90 rounded-full hover:scale-110 transition-all z-10"
					>
						<Heart
							size={18}
							className={`transition-all duration-300 ${isFavorite
								? 'text-[#e50914] fill-[#e50914]'
								: 'text-white hover:text-[#e50914]'
								}`}
						/>
					</button>
				</div>

				{/* Contenu */}
				<div className="p-3">
					{/* Titre */}
					<h3 className="text-white text-base font-bold mb-2 line-clamp-1 group-hover:text-[#e50914] transition-colors">
						{video.title}
					</h3>

					{/* Genres */}
					<div className="flex flex-wrap gap-1 mb-2">
						{video.genres?.slice(0, 2).map((genre) => (
							<span
								key={genre.id}
								className="px-2 py-0.5 bg-white/5 text-gray-300 text-xs rounded border border-white/10"
							>
								{genre.name}
							</span>
						))}
					</div>

					{/* Stats */}
					<div className="flex items-center justify-between text-xs">
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-1">
								<Star size={14} className="text-yellow-400 fill-yellow-400" />
								<span className="text-white font-semibold">{video.rating}</span>
							</div>

							<div className="flex items-center gap-1">
								<Eye size={14} className="text-gray-400" />
								<span className="text-gray-300">{video.views}</span>
							</div>
						</div>

						<div className="flex items-center gap-1 text-gray-400">
							<Clock size={12} />
							<span>{video.year}</span>
						</div>
					</div>
				</div>
			</motion.div>

			<MovieDetailsModal
				open={open}
				onClose={() => setOpen(false)}
				video={video}
				onPlay={handlePlay}
			/>
		</>
	);
}
