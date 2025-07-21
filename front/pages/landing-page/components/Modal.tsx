import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Box,
    Typography,
    IconButton,
    Stack,
    InputAdornment,
    Slide,
    Fade,
} from '@mui/material';
import {
    Close,
    Email,
    Lock,
    Person,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';
import { apiRoutes } from '../../../network/apiRoutes';
import { api } from '../../../network/apiClient';


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown, string>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isLogin) {
        // Connexion
            // Remplace par ton appel API login
            api(apiRoutes.auth.login, undefined, {
                body: {
                    email: formData.email,
                    password: formData.password,
                }
            })
            .then(() => {
                console.log("coucou login")
            })
            .catch((error) => {
                console.error('Erreur de connexion', error);
            });
                // Gère la connexion (fermer la modal, stocker le token, etc.)
            // await api(apiRoutes.login, undefined, {
            //     body: {
            //         email: formData.email,
            //         password: formData.password,
            //     },
            //     method: 'POST',
            // });
            // // Gère la connexion (fermer la modal, stocker le token, etc.)
            // onClose();

    } else {
        // Inscription
        api(apiRoutes.auth.register, undefined, {
                body: {
                    email: formData.email,
                    password: formData.password,
                }
            })
            .then(() => {
                console.log("coucou inscription")
            })
            .catch((error) => {
                console.error('Erreur d\'inscription', error);
            });
    }
        console.log('Form submitted:', formData);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            slots={{ transition: Transition }}
            maxWidth="sm"
            fullWidth
            slotProps={{
                transition : { timeout: 300 },
                paper: {
                    sx: {
                        backgroundColor: 'background.paper',
                        borderRadius: 3,
                        p: 2,
                    },
                },
            }}
        >
            <DialogTitle sx={{ p: 0, mb: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h3" fontWeight={700}>
                        {isLogin ? 'Connexion' : 'Créer un compte'}
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: 'text.secondary',
                            '&:hover': {
                                color: 'text.primary',
                            },
                        }}
                    >
                        <Close />
                    </IconButton>
                </Stack>
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        {!isLogin && (
                            <Fade in={!isLogin} timeout={300}>
                                <TextField
                                    fullWidth
                                    name="name"
                                    placeholder="Nom complet"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person sx={{ color: 'text.secondary' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Fade>
                        )}

                        <TextField
                            fullWidth
                            type="email"
                            name="email"
                            placeholder="Adresse email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email sx={{ color: 'text.secondary' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Mot de passe"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock sx={{ color: 'text.secondary' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleTogglePasswordVisibility}
                                            edge="end"
                                            sx={{ color: 'text.secondary' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {!isLogin && (
                            <Fade in={!isLogin} timeout={300}>
                                <TextField
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    placeholder="Confirmer le mot de passe"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock sx={{ color: 'text.secondary' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Fade>
                        )}

                        <Button
                        
                            type="submit"
                            variant="contained"
                            size="medium"
                            
                            sx={{
                                py: 2,
                                fontSize: '1.115rem',
                                padding: '8px 20px',
                                width: '90%',
                                fontWeight: 600,  
                                display: 'flex', 
                                alignSelf: 'center',
                            }}
                        >
                            {isLogin ? 'Se connecter' : 'Créer le compte'}
                        </Button>
                    </Stack>
                </Box>

                <Box textAlign="center" sx={{ mt: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                        {isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
                        <Button
                            variant="text"
                            onClick={() => setIsLogin(!isLogin)}
                            sx={{
                                ml: 1,
                                color: 'primary.main',
                                fontWeight: 600,
                                textTransform: 'none',
                                transition: 'all 0.3s',
                                '&:hover': {
                                    transform: 'scale(1)', // Pas d'agrandissement au hover
                                    backgroundColor: 'transparent',
                                    color: 'primary.light',
                                },
                            }}
                        >
                            {isLogin ? 'Créer un compte' : 'Se connecter'}
                        </Button>
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;