import React from "react";
import { Movie as MovieInterface } from "@/models/types/movie";
import { X, Play, Star, Eye, Clock, Calendar, Film } from "lucide-react";
import { formatDurationString } from "@/lib/utils/helper";
import { useRouter } from "next/navigation";

interface Props {
	open: boolean;
	onClose: () => void;
	video: MovieInterface;
	onPlay: (id: number) => void;
}

export default function MovieDetailsModal({ open, onClose, video, onPlay }: Props) {
	if (!open) return null;

	const router = useRouter();

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/60 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal */}
			<div className="relative bg-[#0f0f1a]/95 text-white w-full max-w-3xl rounded-t-3xl border border-white/10 animate-slideUp">
				{/* Header Image */}
				<div className="relative h-72 w-full">
					<img
						src={video.thumbnail}
						className="w-full h-full object-cover rounded-t-3xl"
					/>

					<div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a]/95 via-transparent" />

					<button
						onClick={onClose}
						className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
					>
						<X />
					</button>

					<button
						onClick={() => router.push(`/watch/${video.id}`)}
						className="absolute bottom-6 left-6 bg-red-600 px-6 py-2 text-lg font-semibold rounded-xl hover:bg-red-700 transition flex items-center gap-2"
					>
						<Play size={20} /> Regarder maintenant
					</button>

					<button className="absolute bottom-6 right-6 bg-black/50 p-3 rounded-full hover:bg-black/70 transition">
						<Star />
					</button>
				</div>

				{/* Content */}
				<div className="p-6">
					{/* Title */}
					<h2 className="text-3xl font-bold mb-3">{video.title}</h2>

					<div className="flex items-center gap-3 mb-4 text-gray-300 flex-wrap">
						{video.genres?.length > 0 && (
							<span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm font-semibold">
								{video.genres.map((g) => g.name).join(", ")}
							</span>
						)}

						<span>{video.year}</span>

						<div className="flex items-center gap-1">
							<Star className="text-yellow-400" size={18} />
							<span>{video.rating}</span>
						</div>
					</div>

					{/* Synopsis */}
					<div className="mb-6">
						<h3 className="text-red-500 font-semibold mb-2">Synopsis</h3>
						<p className="text-gray-400 leading-relaxed">
							{video.description ||
								"Aucune description disponible pour ce contenu."}
						</p>
					</div>

					{/* Details */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{/* Director */}
						{video.director && (
							<DetailItem
								icon={<Film size={18} />}
								label="Réalisateur"
								value={video.director}
							/>
						)}

						<DetailItem
							icon={<Clock size={18} />}
							label="Durée"
							value={formatDurationString(video.duration_second)}
						/>

						<DetailItem
							icon={<Calendar size={18} />}
							label="Sortie"
							value={video.year}
						/>

						<DetailItem
							icon={<Eye size={18} />}
							label="Vues"
							value={video.views.toLocaleString()}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function DetailItem({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: string | number;
}) {
	return (
		<div className="flex items-center gap-3">
			<div className="text-gray-400">{icon}</div>
			<div>
				<p className="text-xs text-gray-400">{label}</p>
				<p className="font-medium">{value}</p>
			</div>
		</div>
	);
}
