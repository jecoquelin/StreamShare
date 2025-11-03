import React, { useState } from 'react';
import {
	Box,
	Typography,
	Stack,
	Card,
	CardMedia,
	IconButton,
	Chip,
} from '@mui/material';
import {
	PlayArrow,
	Star,
	Visibility,
} from '@mui/icons-material';

import MovieDetailsModal from './MovieDetailsModal';
import { Movie } from '../../interfaces/movie';
import { formatDurationString } from '../../utils/helper';

export default function MovieCard({ video }: { video: Movie }) {

	const [modalOpen, setModalOpen] = useState(false);

	const handleCardClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setModalOpen(true);
	};

	const handlePlay = (videoId: number) => {
		// Rediriger vers la page de lecture /watch-page?movieId=1
		window.location.href = `/watch-page?movieId=${videoId}`;
		setModalOpen(false);
	};

	return (
		<>
			<Card
				onClick={handleCardClick}
				sx={{
					backgroundColor: 'rgba(15, 15, 26, 0.8)',
					cursor: 'pointer',
					transition: 'all 0.3s ease',
					'&:hover': {
						transform: 'scale(1.05)',
						boxShadow: '0 8px 32px rgba(229, 9, 20, 0.3)',
					},
				}}
			>
				<Box sx={{ position: 'relative' }}>
					<CardMedia
						component="img"
						height="200"
						image={video.thumbnail}
						alt={video.title}
					/>
					<Box
						sx={{
							position: 'absolute',
							inset: 0,
							background: 'rgba(0, 0, 0, 0.4)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							opacity: 0,
							transition: 'opacity 0.3s ease',
							'&:hover': {
								opacity: 1,
							},
						}}
					>
						<IconButton
							sx={{
								backgroundColor: 'rgba(229, 9, 20, 0.9)',
								color: 'white',
								'&:hover': {
									backgroundColor: 'primary.main',
									transform: 'scale(1.1)',
								},
							}}
						>
							<PlayArrow sx={{ fontSize: 40 }} />
						</IconButton>
					</Box>
					<Chip
						label={formatDurationString(video.duration_second)}
						size="small"
						sx={{
							position: 'absolute',
							bottom: 8,
							right: 8,
							backgroundColor: 'rgba(0, 0, 0, 0.8)',
							color: 'white',
						}}
					/>
				</Box>
				<Box sx={{ p: 2 }}>
					<Typography
						variant="h6"
						sx={{
							fontWeight: 600,
							mb: 1,
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
					>
						{video.title}
					</Typography>
					{video.genres && video.genres.length > 0 && (
						<Stack
							direction="row"
							spacing={1}
							alignItems="center"
							justifyContent="space-between" // Ajout pour aligner les genres à gauche et l'année à droite
							sx={{ mb: 1 }}
						>
							<Chip
								label={
									video.genres
										.map((g) => g.name)
										.join(', ')
										.slice(0, 30) + (video.genres.map((g) => g.name).join(', ').length > 30 ? '...' : '')
								} // Tronque les genres si la longueur dépasse 30 caractères
								size="small"
								sx={{
									backgroundColor: 'rgba(229, 9, 20, 0.1)',
									color: 'primary.main',
									maxWidth: '70%', // Limite la largeur du Chip
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
								}}
							/>
							<Typography variant="caption" color="text.secondary">
								{video.year}
							</Typography>
						</Stack>
					)}

					<Stack direction="row" justifyContent="space-between" alignItems="center">
						<Stack direction="row" spacing={1} alignItems="center">
							<Star sx={{ fontSize: 16, color: '#ffd700' }} />
							<Typography variant="caption">{video.rating}</Typography>
						</Stack>
						<Stack direction="row" spacing={1} alignItems="center">
							<Visibility sx={{ fontSize: 16, color: 'text.secondary' }} />
							<Typography variant="caption" color="text.secondary">
								{video.views}
							</Typography>
						</Stack>
					</Stack>
				</Box>
			</Card>
			<MovieDetailsModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				video={video}
				onPlay={handlePlay}
			/>
		</>
	);
}