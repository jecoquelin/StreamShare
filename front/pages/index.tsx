import React, { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Header from './landing-page/components/Header';
import Features from './landing-page/components/Features';
import Benefits from './landing-page/components/Benefits';
import Modal from './landing-page/components/Modal';
import Footer from './landing-page/components/Footer';

export default function LandingPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAuthClick = () => {
        console.log('Auth button clicked');
        setIsModalOpen(true);
    };

    const handleDiscoverClick = () => {
        // Scroll to features section
        const featuresSection = document.querySelector('section');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSignUpClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Header onAuthClick={handleAuthClick} onDiscoverClick={handleDiscoverClick} />
            <Features />
            <Benefits onSignUpClick={handleSignUpClick} />
            <Footer />
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
}