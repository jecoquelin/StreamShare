"use client";
// components/ui/Typography.tsx
import React from 'react';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' |'p';

interface TypographyProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
  className?: string;
  [key: string]: any; // Pour passer d'autres props si nécessaire
}

const Typography: React.FC<TypographyProps> = ({ variant = 'p', children, className, ...props }) => {
  const variants: Record<TypographyVariant, string> = {
    h1: 'text-5xl lg:text-6xl font-bold', // Increased size for h1
    h2: 'text-3xl font-semibold', // Changed size for h2 as desired
    h3: 'text-2xl font-medium',
    h4: 'text-xl font-semibold', // Increased size for h4
    p: 'text-base text-gray-700',
};


  const style = variants[variant];

  return (
    <div className={`${style} ${className}`} {...props}>
      {children}
    </div>
  );
};

export {Typography};
