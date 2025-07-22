import { Card, CardMedia, CardContent, Typography } from '@mui/material';

interface MovieCardProps {
  title: string;
  image: string;
}

export const MovieCard = ({ title, image }: MovieCardProps) => (
  <Card sx={{ width: 160, mx: 1, backgroundColor: '#1c1c1c' }}>
    <CardMedia component="img" height="240" image={image} alt={title} />
    <CardContent>
      <Typography variant="body2" color="white">{title}</Typography>
    </CardContent>
  </Card>
);
