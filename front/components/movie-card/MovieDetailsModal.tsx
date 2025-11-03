import React, { useState } from 'react';
import {
	Box,
	Typography,
	Stack,
	Card,
	CardMedia,
	IconButton,
	Chip,
	Dialog,
	DialogContent,
	DialogTitle,
	Button,
	Divider,
	Avatar,
	Grid,
	Slide,
	Fade,
} from '@mui/material';
import {
	PlayArrow,
	Star,
	Visibility,
	Close,
	AccessTime,
	CalendarToday,
	Person,
	Movie,
	Info,
} from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';
import { Movie as MovieInterface } from '../../interfaces/movie';
import { formatDurationString } from '../../utils/helper';


const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

// Modal de détails
interface MovieDetailsModalProps {
	open: boolean;
	onClose: () => void;
	video: MovieInterface;
	onPlay: (videoId: number) => void;
}

export default function MovieDetailsModal({ open, onClose, video, onPlay }: MovieDetailsModalProps) {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			TransitionComponent={Transition}
			maxWidth="md"
			fullWidth
			PaperProps={{
				sx: {
					backgroundColor: 'rgba(15, 15, 26, 0.95)',
					backdropFilter: 'blur(20px)',
					borderRadius: 3,
					border: '1px solid rgba(255, 255, 255, 0.1)',
				},
			}}
		>
			<DialogTitle sx={{ p: 0 }}>
				<Box sx={{ position: 'relative' }}>
					{/* Hero Image */}
					<Box
						sx={{
							height: 300,
							backgroundImage: `url(${video.thumbnail})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							position: 'relative',
							'&::before': {
								content: '""',
								position: 'absolute',
								inset: 0,
								background: 'linear-gradient(transparent 0%, rgba(15, 15, 26, 0.8) 70%, rgba(15, 15, 26, 1) 100%)',
							},
						}}
					>
						{/* Close Button */}
						<IconButton
							onClick={onClose}
							sx={{
								position: 'absolute',
								top: 16,
								right: 16,
								backgroundColor: 'rgba(0, 0, 0, 0.5)',
								color: 'white',
								'&:hover': {
									backgroundColor: 'rgba(0, 0, 0, 0.7)',
								},
							}}
						>
							<Close />
						</IconButton>

						{/* Play Button */}
						<Box
							sx={{
								position: 'absolute',
								bottom: 24,
								left: 24,
								zIndex: 2,
							}}
						>
							<Button
								variant="contained"
								size="large"
								startIcon={<PlayArrow />}
								onClick={() => onPlay(video.id)}
								sx={{
									px: 4,
									py: 1.5,
									fontSize: '1.1rem',
									fontWeight: 600,
									backgroundColor: 'primary.main',
									'&:hover': {
										backgroundColor: 'primary.dark',
									},
								}}
							>
								Regarder maintenant
							</Button>
						</Box>
					</Box>

					{/* Title Overlay */}
					<Box
						sx={{
							position: 'absolute',
							bottom: 80,
							left: 24,
							right: 24,
							zIndex: 2,
						}}
					>
						<Typography
							variant="h3"
							sx={{
								fontWeight: 700,
								color: 'white',
								textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
								mb: 1,
							}}
						>
							{video.title}
						</Typography>
						
						
						<Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
							{video.genres && video.genres.length > 0 && (
								<Chip
									label={video.genres.map(g => g.name).join(', ')}
									sx={{
										backgroundColor: 'rgba(229, 9, 20, 0.2)',
										color: 'primary.main',
										fontWeight: 600,
									}}
								/>
							)}
							<Typography variant="body1" sx={{ color: 'white' }}>
								{video.year}
							</Typography>
							<Stack direction="row" spacing={0.5} alignItems="center">
								<Star sx={{ fontSize: 20, color: '#ffd700' }} />
								<Typography variant="body1" sx={{ color: 'white' }}>
									{video.rating}
								</Typography>
							</Stack>
						</Stack>
					</Box>
				</Box>
			</DialogTitle>

			<DialogContent sx={{ p: 3 }}>
				<Grid container spacing={3}>
					{/* Left Column - Main Info */}
					<Grid item xs={12} md={8}>
						<Box sx={{ mb: 3 }}>
							<Typography
								variant="h6"
								sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}
							>
								Synopsis
							</Typography>
							<Typography
								variant="body1"
								sx={{
									color: 'text.secondary',
									lineHeight: 1.6,
								}}
							>
								{video.description ||
									"Découvrez cette œuvre captivante qui vous transportera dans un univers unique. Une expérience cinématographique inoubliable vous attend avec des personnages mémorables et une intrigue passionnante."
								}
							</Typography>
						</Box>

					</Grid>

					{/* Right Column - Details */}
					<Grid item xs={12} md={4}>
						<Stack spacing={3}>
							<Box>
								<Typography
									variant="h6"
									sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}
								>
									Détails
								</Typography>

								<Stack spacing={2}>
									{/* Director */}
									{video.director && (
										<Stack direction="row" alignItems="center" spacing={1}>
											<Movie sx={{ fontSize: 20, color: 'text.secondary' }} />
											<Box>
												<Typography variant="caption" color="text.secondary">
													Réalisateur
												</Typography>
												<Typography variant="body2" sx={{ fontWeight: 500 }}>
													{video.director}
												</Typography>
											</Box>
										</Stack>
									)}

									{/* Duration */}
									<Stack direction="row" alignItems="center" spacing={1}>
										<AccessTime sx={{ fontSize: 20, color: 'text.secondary' }} />
										<Box>
											<Typography variant="caption" color="text.secondary">
												Durée
											</Typography>
											<Typography variant="body2" sx={{ fontWeight: 500 }}>
												{formatDurationString(video.duration_second)}
											</Typography>
										</Box>
									</Stack>

									{/* Release Date */}
									{video.year && (
										<Stack direction="row" alignItems="center" spacing={1}>
											<CalendarToday sx={{ fontSize: 20, color: 'text.secondary' }} />
											<Box>
												<Typography variant="caption" color="text.secondary">
													Sortie
												</Typography>
												<Typography variant="body2" sx={{ fontWeight: 500 }}>
													{video.year}
												</Typography>
											</Box>
										</Stack>
									)}

									{/* Views */}
									<Stack direction="row" alignItems="center" spacing={1}>
										<Visibility sx={{ fontSize: 20, color: 'text.secondary' }} />
										<Box>
											<Typography variant="caption" color="text.secondary">
												Vues
											</Typography>
											<Typography variant="body2" sx={{ fontWeight: 500 }}>
												{video.views.toLocaleString()}
											</Typography>
										</Box>
									</Stack>
								</Stack>
							</Box>
						</Stack>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
};