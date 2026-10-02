import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { ShieldCheck, Zap, Menu, X, CreditCard, Sparkles, Send, PhoneCall, Globe, User, Download, LogOut, Lock } from 'lucide-react';
import { VipSubscriptionState } from '../services/paymentService';
import { PAYMENT_CONFIG } from '../data/plansData';
import { useLanguage } from '../services/languageContext';
import { UserAccount } from '../types';

interface NavbarProps {
  vipStatus: VipSubscriptionState | null;
  currentUser: UserAccount | null;
  onOpenPaymentModal: (planId?: string) => void;
  onOpenAuthModal: (mode?: 'LOGIN' | 'REGISTER') => void;
  onOpenMyFiles: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  vipStatus,
  currentUser,
  onOpenPaymentModal,
  onOpenAuthModal,
  onOpenMyFiles,
  onLogout,
}) => {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0B0F17]/95 border-b border-amber-500/15">
      {/* Top Banner Ticker with live contacts and language toggle */}
      <div className="w-full bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 py-1.5 px-4 text-xs border-b border-amber-500/20 text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              GOAT392 DIRECT
            </span>
          </div>

          <div className="truncate text-[11px] text-slate-300 animate-pulse hidden md:block">
            🔥 Coupons du jour disponibles • Code promo <strong className="text-yellow-400 font-mono">15MAR</strong> (1xBet • Melbet • Megapari) • Retraits MTN & Orange Money 100% instantanés
          </div>

          <div className="flex items-center gap-4 shrink-0 text-[11px]">
            {/* Language Switcher Button (FR / EN) */}
            <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-700 rounded-lg px-2 py-0.5">
              <Globe className="w-3 h-3 text-amber-400" />
              <button
                onClick={() => setLang('fr')}
                className={`px-1 py-0.5 rounded text-[10px] font-bold cursor-pointer transition ${
                  lang === 'fr' ? 'text-amber-400 bg-amber-400/20' : 'text-slate-400 hover:text-white'
                }`}
              >
                FR 🇫🇷
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => setLang('en')}
                className={`px-1 py-0.5 rounded text-[10px] font-bold cursor-pointer transition ${
                  lang === 'en' ? 'text-amber-400 bg-amber-400/20' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN 🇬🇧
              </button>
            </div>

            <a
              href={PAYMENT_CONFIG.support.whatsappUrl1}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1 text-emerald-400 font-bold hover:text-white transition"
            >
              <PhoneCall className="w-3 h-3" />
              WhatsApp : {PAYMENT_CONFIG.support.whatsappDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar with exact requested pages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="#" className="hover:opacity-95 transition shrink-0">
          <BrandLogo size="md" />
        </a>

        {/* Desktop Navigation Links matching exact user request:
            Accueil | Coupon du jour | Pronos gagnants | Abonnements | Marketplace | Bookmakers | Contact */}
        <nav className="hidden xl:flex items-center gap-5 text-xs lg:text-sm font-semibold text-slate-300">
          <button
            onClick={() => scrollTo('hero')}
            className="hover:text-amber-400 transition cursor-pointer"
          >
            {t('nav_home')}
          </button>
          <button
            onClick={() => scrollTo('pronos-jour')}
            className="hover:text-amber-400 transition cursor-pointer text-amber-300 font-bold flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            {t('nav_daily_coupon')}
          </button>
          <button
            onClick={() => scrollTo('preuves-tickets')}
            className="hover:text-amber-400 transition cursor-pointer flex items-center gap-1 text-slate-200"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            {t('nav_winning_pronos')}
          </button>
          <button
            onClick={() => scrollTo('tarifs-vip')}
            className="hover:text-amber-400 transition cursor-pointer"
          >
            {t('nav_subscriptions')}
          </button>
          <button
            onClick={() => scrollTo('marketplace')}
            className="px-2.5 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold hover:bg-rose-500/25 transition cursor-pointer flex items-center gap-1"
          >
            <Zap className="w-3 h-3 text-rose-400 fill-rose-400" />
            {t('nav_marketplace')} (APK & Aviator)
          </button>
          <button
            onClick={() => scrollTo('bookmakers-officiels')}
            className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold hover:bg-amber-500/25 transition cursor-pointer"
          >
            {t('nav_bookmakers')}
          </button>
          <button
            onClick={() => scrollTo('footer-contacts')}
            className="hover:text-amber-400 transition cursor-pointer"
          >
            {t('nav_contact')}
          </button>
        </nav>

        {/* Right Auth & VIP CTAs */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {/* User Account / Login & Register */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/40 text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[100px] truncate">{currentUser.name}</span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 space-y-1 z-50 text-xs">
                  <div className="p-2 border-b border-slate-800">
                    <p className="font-bold text-white truncate">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{currentUser.emailOrPhone}</p>
                  </div>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenMyFiles();
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-800 text-amber-300 font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>{t('my_files')} ({currentUser.purchasedApks.length})</span>
                  </button>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-rose-500/10 text-rose-400 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuthModal('LOGIN')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition cursor-pointer flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('login')}</span>
              </button>

              <button
                onClick={() => onOpenAuthModal('REGISTER')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500/25 transition cursor-pointer"
              >
                {t('register')}
              </button>
            </div>
          )}

          {/* VIP Pass CTA */}
          <button
            onClick={() => onOpenPaymentModal()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            REJOINDRE LE VIP
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 xl:hidden">
          {!currentUser ? (
            <button
              onClick={() => onOpenAuthModal('LOGIN')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 text-amber-400 text-xs font-bold border border-slate-800"
            >
              {t('login')}
            </button>
          ) : (
            <button
              onClick={onOpenMyFiles}
              className="p-2 rounded-lg bg-amber-400/20 text-amber-300 text-xs font-bold"
              title="Mes fichiers"
            >
              <Download className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-800 transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-amber-500/20 bg-[#0B0F17] px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => scrollTo('hero')}
              className="p-3 text-left rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold"
            >
              🏠 {t('nav_home')}
            </button>
            <button
              onClick={() => scrollTo('pronos-jour')}
              className="p-3 text-left rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold"
            >
              ⚽ {t('nav_daily_coupon')}
            </button>
            <button
              onClick={() => scrollTo('preuves-tickets')}
              className="p-3 text-left rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold"
            >
              🏆 {t('nav_winning_pronos')}
            </button>
            <button
              onClick={() => scrollTo('tarifs-vip')}
              className="p-3 text-left rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold"
            >
              💎 {t('nav_subscriptions')}
            </button>
            <button
              onClick={() => scrollTo('marketplace')}
              className="p-3 col-span-2 text-left rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-black flex items-center justify-between"
            >
              <span>🎮 {t('nav_marketplace')} (Boutique APK & Aviator)</span>
              <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded font-black">APK</span>
            </button>
            <button
              onClick={() => scrollTo('bookmakers-officiels')}
              className="p-3 col-span-2 text-left rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-black flex items-center justify-between"
            >
              <span>🔥 {t('nav_bookmakers')} (Code 15MAR)</span>
              <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-black">5000 places</span>
            </button>
            <button
              onClick={() => scrollTo('footer-contacts')}
              className="p-3 text-left rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold"
            >
              📞 {t('nav_contact')}
            </button>
            {currentUser && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyFiles();
                }}
                className="p-3 text-left rounded-xl bg-slate-900 border border-slate-800 text-amber-400 font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                {t('my_files')}
              </button>
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPaymentModal();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-center shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              ACCÉDER AU CLUB VIP MAINTENANT
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
