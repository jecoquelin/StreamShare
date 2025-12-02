"use client";
import React from 'react';
import { Button } from '@/views/components/ui/Button'; // Composant Button ShadCN
import { Typography } from '@/views/components/ui/Typography'; // Composant Typography ShadCN
import { Container } from '@/views/components/ui/Container'; // Composant Container
import { Play, UserRound } from 'lucide-react'; // Utilisation de lucide-react pour les icônes
import { FadeIn } from '@/views/components/ui/FadeIn';
import { SlideIn } from '@/views/components/ui/SlideIn';

interface HeaderProps {
    onAuthClick: () => void;
    onDiscoverClick: () => void;
}

export default function Header({ onAuthClick, onDiscoverClick }: HeaderProps) {
    return (
        <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center filter brightness-30"
                    style={{
                        backgroundImage:
                            'url(https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/70 to-black" />
            </div>

            {/* Content */}
            <Container maxWidth="lg" className="relative z-10 text-center">
                <FadeIn delay={1}>
                    <section>
                        <div className="flex items-center justify-center mb-4 space-x-50">
                            {/* <Play className="text-primary text-5xl md:text-8xl" /> */}
                            <Play className="h-10 w-10 text-red-600 mr-4" /> {/* Increased size */}
                            <Typography
                                variant="h1"
                                className="font-bold bg-gradient-to-br from-white via-red-500 to-red-600 bg-clip-text text-transparent"
                            >
                                StreamShare
                            </Typography>
                        </div>
                    </section>
                </FadeIn>

                <SlideIn direction="up" delay={1.2}>
                    <Typography
                        variant="h2"
                        className="text-base md:text-xl text-gray-400 mb-6 mx-auto max-w-lg leading-relaxed"
                    >
                        Partagez vos films et séries préférés avec vos proches.
                        Créez des liens éphémères pour un streaming privé et sécurisé.
                    </Typography>
                </SlideIn>

                <SlideIn direction="up" delay={1.4}>
                    <section className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 justify-center items-center mt-6">
                        <Button
                            variant="default" // Variante pour le bouton de connexion
                            size="lg" // Taille large
                            onClick={onAuthClick}
                            className="min-w-[200px] flex items-center justify-center" // Flex pour centrer le contenu
                        >
                            <UserRound className="mr-2" /> {/* Icône à gauche */}
                            Connexion
                        </Button>
                        <Button
                            variant="outline" // Variante pour le bouton découvrir
                            size="lg" // Taille large
                            onClick={onDiscoverClick}
                            className="min-w-[200px] text-white hover:bg-white/10 flex items-center justify-center" // Flex pour centrer le contenu
                        >
                            Découvrir
                        </Button>
                    </section>
                </SlideIn>

                {/* Scroll Indicator */}
                <aside className="absolute bottom-[-150px] left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center items-start pt-1">
                        <div className="w-1 h-3 bg-white rounded animate-pulse" />
                    </div>
                </aside>
            </Container>
        </header>
    );
};

