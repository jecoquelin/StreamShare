"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // ← Changement ici
import { useAuth } from "@/models/store/AuthStore";

interface AuthMiddlewareProps {
  children: React.ReactNode;
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname(); // ← Utiliser usePathname au lieu de router.pathname
  const { user, loading } = useAuth();
  
  const publicRoutes = ["/"];

  useEffect(() => {
    if (loading) return; // Ne rien faire pendant le chargement
    
    const isPublicRoute = publicRoutes.includes(pathname);
    
    if (!user && !isPublicRoute) {
      router.replace("/");
    } else if (user && (pathname === "/")) {
      router.replace("/home");
    }
  }, [user, loading, router]);

  // Afficher un loader pendant la vérification
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  // Bloquer l'affichage des pages protégées si non authentifié
  const isPublicRoute = publicRoutes.includes(pathname);
  if (!user && !isPublicRoute) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Redirection...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthMiddleware;