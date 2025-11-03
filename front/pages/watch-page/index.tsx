import React from 'react';
import { useRouter } from 'next/router';
import { Box, Typography} from '@mui/material';
import VideoPlayer from '../../components/VideoPlayer';

export default function WatchPage() {
    const router = useRouter();
    const { movieId } = router.query;
    console.log("router.query:", router.query);

    const videoId = parseInt(movieId as string, 10);

    if (isNaN(videoId)) {
        return <Typography variant="h6" color="error">Invalid video ID</Typography>;
    }

    return (
        <Box sx={{ width: 'auto', height: '100vh', backgroundColor: '#000' }}>
            <VideoPlayer movie_id={movieId}/>
        </Box>
    );
}