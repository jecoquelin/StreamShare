"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

interface AuthMiddlewareProps {
  children: React.ReactNode;
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  const publicRoutes = ["/", "/register", "/about"];

  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(router.pathname);
    
    if (!loading) {
      // Si l'utilisateur n'est PAS connecté et qu'il est sur une route protégée
      if (!user && !isPublicRoute) {
        router.push("/");
      }
      
      // Si l'utilisateur EST connecté et qu'il est sur la page d'accueil
      // L'utilisateur est redirigé vers la page principale
      if (user && router.pathname === "/") {
        router.push("/home-page"); 
      }
    }
  }, [user, loading, router.pathname]); // Ajoute router.pathname aux dépendances

  if (loading) return <p>Chargement...</p>;
  
  return <>{children}</>;
};

export default AuthMiddleware;