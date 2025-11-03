
import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Stack,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    TextField,
    InputAdornment,
} from '@mui/material';
import {
    PlayArrow,
    Add,
    Search,
    AccountCircle,
    Logout,
    Settings,
    History,
} from '@mui/icons-material';

interface Props {
    setSearchMovie: (query: string) => void;
}

export default function HeaderComponent({setSearchMovie}: Props) {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
    const isUserMenuOpen = Boolean(userMenuAnchor);

    const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setUserMenuAnchor(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setUserMenuAnchor(null);
    };

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const query = e.target.value;
        console.log("Search Query:", query);
        setSearchQuery(query);
        setSearchMovie(query);
    };

    return (
        <><Box
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: 'rgba(15, 15, 26, 0.95)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
        >
            <Container maxWidth="xl">
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ py: 2 }}
                >
                    {/* Logo */}
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <PlayArrow sx={{ fontSize: 40, color: 'primary.main' }} />
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

                    {/* Search Bar */}
                    <Box sx={{ flexGrow: 1, maxWidth: 400, mx: 4 }}>
                        <TextField
                            fullWidth
                            placeholder="Rechercher films, séries..."
                            value={searchQuery}
                            onChange={(e) => handleQueryChange(e)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search sx={{ color: 'text.secondary' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                    },
                                },
                            }} />
                    </Box>

                    {/* User Menu */}
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Button
                            variant="outlined"
                            startIcon={<Add />}
                            sx={{
                                color: 'white',
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    backgroundColor: 'rgba(229, 9, 20, 0.1)',
                                },
                            }}
                        >
                            Ajouter
                        </Button>
                        <IconButton onClick={handleUserMenuOpen}>
                            <Avatar sx={{ backgroundColor: 'primary.main' }}>
                                <AccountCircle />
                            </Avatar>
                        </IconButton>
                    </Stack>
                </Stack>
            </Container>
        </Box>
        <Menu
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
            sx={{
                '& .MuiPaper-root': {
                    backgroundColor: 'rgba(15, 15, 26, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            }}
        >
                <MenuItem onClick={handleUserMenuClose}>
                    <Settings sx={{ mr: 2 }} />
                    Paramètres
                </MenuItem>
                <MenuItem onClick={handleUserMenuClose}>
                    <History sx={{ mr: 2 }} />
                    Historique
                </MenuItem>
                <MenuItem onClick={handleUserMenuClose}>
                    <Logout sx={{ mr: 2 }} />
                    Déconnexion
                </MenuItem>
            </Menu>
        </>
    )
}