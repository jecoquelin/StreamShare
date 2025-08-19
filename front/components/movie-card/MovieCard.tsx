import React, { useState, useEffect } from 'react';
import {
	Box,
	Container,
	Typography,
	Button,
	Stack,
	Card,
	CardMedia,
	Grid,
	IconButton,
	Avatar,
	Menu,
	MenuItem,
	Chip,
	TextField,
	InputAdornment,
	Fade,
	Slide,
} from '@mui/material';
import {
	PlayArrow,
	Add,
	Search,
	AccountCircle,
	Logout,
	Settings,
	History,
	Favorite,
	Star,
	AccessTime,
	Visibility,
} from '@mui/icons-material';

interface HomeCardProps {
	id: number;
	title: string;
	thumbnail: string;
	duration: string;
	genre: string;
	rating: number;
	year: number;
	views: number;
	isRecent: boolean;
}


export default function MovieCard({ video }: { video: HomeCardProps }) {

	return (
		<Card
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
					label={video.duration}
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
				<Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
					<Chip
						label={video.genre}
						size="small"
						sx={{
							backgroundColor: 'rgba(229, 9, 20, 0.1)',
							color: 'primary.main',
						}}
					/>
					<Typography variant="caption" color="text.secondary">
						{video.year}
					</Typography>
				</Stack>
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
	);
}