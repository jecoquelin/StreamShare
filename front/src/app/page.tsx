"use client";
import Benefits from '@/views/components/landing/Benefits';
import Features from '@/views/components/landing/Features';
import Footer from '@/views/components/landing/Footer';
import Header from '@/views/components/landing/Header';
import React, { useState } from 'react';
import Modal from '@/views/components/landing/Modal';

export default function Page() {

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