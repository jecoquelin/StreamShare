// models/store/AuthStore.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api/client";
import { apiRoutes } from "@/lib/api/endoints";

interface User {
  id: number;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  refreshUser: () => Promise<void>; 
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      console.log('🔄 [AuthStore] Tentative de récupération de l\'utilisateur...');
      const u = await api(apiRoutes.auth.me);
      console.log('✅ [AuthStore] Utilisateur récupéré:', u);
      setUser(u);
    } catch (error) {
      console.error('❌ [AuthStore] Erreur lors de la récupération de l\'utilisateur:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    console.log('🚀 [AuthStore] Initialisation...');
    refreshUser().finally(() => {
      setLoading(false);
      console.log('🏁 [AuthStore] Chargement terminé');
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);