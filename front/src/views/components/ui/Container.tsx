"use client";
// components/ui/Container.tsx
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'; // options de largeur
  [key: string]: any; // Pour passer d'autres props si nécessaire
}

const Container: React.FC<ContainerProps> = ({ children, className, maxWidth = 'lg', ...props }) => {

  // Gestion des classes de maxWidth en fonction des options
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className={`${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`} {...props}>
      {children}
    </div>
  );
};

export { Container };
