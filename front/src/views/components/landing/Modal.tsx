"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/views/components/ui/Dialog"; // Assurez-vous d'importer correctement votre fichier de dialog
import { Play, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiRoutes } from '@/lib/api/endoints';
import { api } from '@/lib/api/client';
import { useAuth } from '@/models/store/AuthStore';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
    });
    const [toast, setToast] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({
        open: false,
        message: '',
        severity: 'success',
    });
    const { refreshUser } = useAuth();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setEmailError('');
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailValidationError = verifyEmail(formData.email);
        setEmailError(emailValidationError || '');
        if (emailValidationError) {
            setToast({ open: true, message: emailValidationError, severity: 'error' });
            return;
        }

        if (isLogin) {
            // Connexion
            try {
                await api(apiRoutes.auth.login, undefined, {
                    body: {
                        email: formData.email,
                        password: formData.password,
                    },
                });
                await refreshUser();
                setToast({ open: true, message: 'Connexion réussie !', severity: 'success' });
                onClose();
                router.push('/home');
            } catch (error: any) {
                const message = error.status === 401 ? 'Email ou mot de passe incorrect' : error.message;
                setToast({ open: true, message, severity: 'error' });
            }
        } else {
            // Inscription
            if (formData.password !== formData.confirmPassword) {
                setToast({ open: true, message: 'Les mots de passe ne correspondent pas', severity: 'error' });
                return;
            }

            api(apiRoutes.auth.register, undefined, {
                body: {
                    email: formData.email,
                    password: formData.password,
                },
            })
                .then(() => {
                    setIsLogin(true);
                })
                .catch((error) => {
                    setToast({ open: true, message: 'Erreur d\'inscription', severity: 'error' });
                });
        }
    };

    const verifyEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return "L'email est requis";
        if (!emailRegex.test(email)) return "Format d'email invalide";
        return null;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="p-6">
        <DialogTitle className="text-2xl font-bold text-white">
          {isLogin ? "Connexion" : "Créer un compte"}
        </DialogTitle>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Nom complet"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="border border-gray-600 bg-[#0F0F1A] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#E50914]"
            />
          )}
          <div className={`flex items-center border rounded ${emailError ? 'border-red-500' : 'border-gray-600'} focus-within:ring-2 focus-within:ring-[#E50914]`}>
            <Mail className="w-5 h-5 text-gray-400 ml-2" />
            <input
              type="email"
              name="email"
              placeholder="Adresse email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="flex-1 bg-[#0F0F1A] text-white p-2 rounded focus:outline-none"
            />
          </div>
          <div className={`flex items-center border rounded ${emailError ? 'border-red-500' : 'border-gray-600'} focus-within:ring-2 focus-within:ring-[#E50914]`}>
            <Lock className="w-5 h-5 text-gray-400 ml-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="flex-1 bg-[#0F0F1A] text-white p-2 rounded focus:outline-none"
            />
            <button
              type="button"
              onClick={handleTogglePasswordVisibility}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {!isLogin && (
            <div className={`flex items-center border rounded ${emailError ? 'border-red-500' : 'border-gray-600'} focus-within:ring-2 focus-within:ring-[#E50914]`}>
              <Lock className="w-5 h-5 text-gray-400 ml-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirmer le mot de passe"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="flex-1 bg-[#0F0F1A] text-white p-2 rounded focus:outline-none"
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-[#E50914] text-white rounded py-2 font-semibold hover:bg-[#FF4757] transition duration-300"
          >
            {isLogin ? "Se connecter" : "Créer le compte"}
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-300">
            {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
          </span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#E50914] font-semibold ml-1 hover:underline"
          >
            {isLogin ? "Créer un compte" : "Se connecter"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;