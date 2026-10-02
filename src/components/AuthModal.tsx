import React, { useState } from 'react';
import { AuthService } from '../services/authService';
import { UserAccount } from '../types';
import { X, Lock, Mail, Phone, User, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../services/languageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserAccount) => void;
  initialMode?: 'LOGIN' | 'REGISTER';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = 'LOGIN',
}) => {
  const { lang } = useLanguage();
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>(initialMode);
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'LOGIN') {
        const res = AuthService.login(emailOrPhone, password);
        if (res.success && res.user) {
          onAuthSuccess(res.user);
          onClose();
        } else {
          setErrorMsg(res.message || 'Identifiants invalides.');
        }
      } else {
        const res = AuthService.register(name, emailOrPhone, password);
        if (res.success && res.user) {
          onAuthSuccess(res.user);
          onClose();
        } else {
          setErrorMsg(res.message || 'Erreur lors de l\'inscription.');
        }
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab switchers: Connexion / Inscription */}
        <div className="flex border-b border-slate-800 pb-2 gap-4">
          <button
            type="button"
            onClick={() => {
              setMode('LOGIN');
              setErrorMsg('');
            }}
            className={`pb-2 text-base font-black transition ${
              mode === 'LOGIN'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'fr' ? 'Connexion' : 'Login'}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('REGISTER');
              setErrorMsg('');
            }}
            className={`pb-2 text-base font-black transition ${
              mode === 'REGISTER'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'fr' ? 'Créer un Compte' : 'Register'}
          </button>
        </div>

        {/* Header subtitle */}
        <div className="space-y-1">
          <h3 className="text-xl font-black text-white">
            {mode === 'LOGIN'
              ? lang === 'fr' ? 'Bon retour parmi l\'élite VIP' : 'Welcome back to the VIP club'
              : lang === 'fr' ? 'Rejoignez la communauté GOAT392' : 'Join the GOAT392 community'}
          </h3>
          <p className="text-xs text-slate-400">
            {lang === 'fr'
              ? 'Connectez-vous pour acheter vos APKs et les retrouver dans "Mes fichiers".'
              : 'Log in to buy your APKs and download them in "My Files".'}
          </p>
        </div>

        {/* Error message if any */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'REGISTER' && (
            <div className="space-y-1">
              <label className="text-slate-300 font-bold block">
                {lang === 'fr' ? 'Nom complet' : 'Full Name'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Simeon Gabriel"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-slate-300 font-bold block">
              {lang === 'fr' ? 'Téléphone ou Adresse Email' : 'Phone or Email Address'}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="Ex: 683111804 ou email@gmail.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-bold block">
              {lang === 'fr' ? 'Mot de passe' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
          >
            {isLoading ? (
              <span>{lang === 'fr' ? 'Traitement en cours...' : 'Processing...'}</span>
            ) : (
              <>
                <span>{mode === 'LOGIN' ? (lang === 'fr' ? 'Se Connecter' : 'Log In') : (lang === 'fr' ? 'Créer Mon Compte' : 'Create Account')}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-[11px] text-slate-500">
            {lang === 'fr'
              ? 'Sécurisé par protocole cryptographique GOAT392'
              : 'Secured by GOAT392 cryptographic protocol'}
          </p>
        </div>
      </div>
    </div>
  );
};
