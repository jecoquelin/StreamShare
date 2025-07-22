import React from 'react';
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { PlayArrow, InfoOutlined } from '@mui/icons-material';

const movies = [
  {
    id: 1,
    title: 'Inception',
    image: '/images/inception.jpg',
  },
  {
    id: 2,
    title: 'Interstellar',
    image: '/images/interstellar.jpg',
  },
  {
    id: 3,
    title: 'Tenet',
    image: '/images/tenet.jpg',
  },
  {
    id: 4,
    title: 'Avatar',
    image: '/images/avatar.jpg',
  },
];

const MovieCard = ({ title, image }: { title: string; image: string }) => (
  <Box
    sx={{
      minWidth: 180,
      width: { xs: 160, sm: 180, md: 200 },
      borderRadius: 3,
      overflow: 'hidden',
      position: 'relative',
      mx: 1,
    }}
  >
    <Box
      component="img"
      src={image}
      alt={title}
      sx={{
        width: '100%',
        height: { xs: 220, sm: 240 },
        objectFit: 'cover',
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
        color: 'white',
        px: 1,
        py: 1,
      }}
    >
      <Typography variant="subtitle2" fontWeight={600} noWrap>
        {title}
      </Typography>
      <Stack direction="row" spacing={1} mt={0.5}>
        <IconButton size="small" sx={{ color: 'white' }}>
          <PlayArrow />
        </IconButton>
        <IconButton size="small" sx={{ color: 'white' }}>
          <InfoOutlined />
        </IconButton>
      </Stack>
    </Box>
  </Box>
);

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" fontWeight={700} mb={4}>
        Bienvenue sur StreamShare
      </Typography>

      <Box mb={5}>
        <Typography variant="h5" fontWeight={600} mb={2}>
          Films populaires
        </Typography>
        <Stack direction="row" overflow="auto" pb={1}>
          {movies.map((m) => (
            <MovieCard key={m.id} title={m.title} image={m.image} />
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography variant="h5" fontWeight={600} mb={2}>
          Recommandés pour vous
        </Typography>
        <Stack direction="row" overflow="auto" pb={1}>
          {movies.reverse().map((m) => (
            <MovieCard key={m.id} title={m.title} image={m.image} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
