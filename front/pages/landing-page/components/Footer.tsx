import React from 'react';
import {
    Box,
    Container,
    Typography,
    Stack,
    Divider,
} from '@mui/material';
import { PlayArrow } from '@mui/icons-material';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'background.default',
                borderTop: '1px solid #333',
                py: 6,
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={4}
                >
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <PlayArrow sx={{ fontSize: 32, color: 'primary.main' }} />
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                background: 'linear-gradient(45deg, #ffffff 30%, #E50914 90%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            StreamShare
                        </Typography>
                    </Stack>

                    <Box textAlign={{ xs: 'center', md: 'right' }}>
                        <Typography variant="body2" color="text.secondary">
                            © 2024 StreamShare. Tous droits réservés.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            Partagez vos passions, créez des souvenirs.
                        </Typography>
                    </Box>
                </Stack>

                <Divider sx={{ my: 4, borderColor: '#333' }} />

                <Box textAlign="center">
                    <Typography variant="body2" color="text.secondary">
                        Plateforme de streaming communautaire pour le partage privé de contenus audiovisuels.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;