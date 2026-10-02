/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBanner } from './components/StatsBanner';
import { BookmakersSection } from './components/BookmakersSection';
import { WinningTicketsSection } from './components/WinningTicketsSection';
import { DailyPronos } from './components/DailyPronos';
import { VipPricing } from './components/VipPricing';
import { MarketplaceSection } from './components/MarketplaceSection';
import { PaymentSection } from './components/PaymentSection';
import { BankrollCalculator } from './components/BankrollCalculator';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingContact } from './components/FloatingContact';
import { PaymentModal } from './components/PaymentModal';
import { AuthModal } from './components/AuthModal';
import { MyFilesModal } from './components/MyFilesModal';
import { PaymentService, VipSubscriptionState } from './services/paymentService';
import { AuthService } from './services/authService';
import { UserAccount, ApkProduct } from './types';
import { PAYMENT_CONFIG } from './data/plansData';
import { LanguageProvider, useLanguage } from './services/languageContext';
import { CheckCircle2, Zap, Send, PhoneCall } from 'lucide-react';

function AppContent() {
  const { lang, t } = useLanguage();
  const [vipStatus, setVipStatus] = useState<VipSubscriptionState | null>(null);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  // Modals state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('vip-3-mois');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [isMyFilesModalOpen, setIsMyFilesModalOpen] = useState(false);
  const [selectedApkToBuy, setSelectedApkToBuy] = useState<ApkProduct | null>(null);

  useEffect(() => {
    // Check initial VIP and Auth status
    const existingVip = PaymentService.getVipStatus();
    if (existingVip) {
      setVipStatus(existingVip);
    }

    const existingUser = AuthService.getCurrentUser();
    if (existingUser) {
      setCurrentUser(existingUser);
    }
  }, []);

  const handleOpenPayment = (planId?: string) => {
    if (planId) {
      setSelectedPlanId(planId);
    }
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (sub: VipSubscriptionState) => {
    setVipStatus(sub);
    // If buying an APK
    if (selectedApkToBuy && currentUser) {
      const updated = AuthService.addPurchasedApk(selectedApkToBuy.id);
      if (updated) {
        setCurrentUser(updated);
      }
      setSelectedApkToBuy(null);
    }
  };

  const handleOpenAuth = (mode: 'LOGIN' | 'REGISTER' = 'LOGIN') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    // If user was attempting to buy an APK
    if (selectedApkToBuy) {
      handleOpenPayment(selectedApkToBuy.id);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
  };

  const handleBuyApk = (apk: ApkProduct) => {
    setSelectedApkToBuy(apk);
    if (!currentUser) {
      handleOpenAuth('LOGIN');
      return;
    }
    // Open payment modal
    handleOpenPayment('pack-semaine'); // Use standard gateway
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Active VIP notification banner if user is logged in as VIP */}
      {vipStatus?.isActive && (
        <div className="w-full bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-900 border-b border-emerald-500/40 py-2.5 px-4 text-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-extrabold text-emerald-300">
                STATUT VIP ACTIF ({vipStatus.planName})
              </span>
              <span className="text-slate-400">
                — Clé : <strong className="text-white font-mono">{vipStatus.vipToken}</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={PAYMENT_CONFIG.support.telegramVipChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-bold text-[11px] flex items-center gap-1.5 transition"
              >
                <Send className="w-3 h-3" />
                Accéder au Canal Telegram VIP
              </a>
              <button
                onClick={() => {
                  PaymentService.revokeVip();
                  setVipStatus(null);
                }}
                className="text-slate-400 hover:text-rose-400 text-[11px] underline cursor-pointer"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation matching requested menu: Accueil, Coupon du jour, Pronos gagnants, Abonnements, Marketplace, Bookmakers, Contact */}
      <Navbar
        vipStatus={vipStatus}
        currentUser={currentUser}
        onOpenPaymentModal={handleOpenPayment}
        onOpenAuthModal={handleOpenAuth}
        onOpenMyFiles={() => setIsMyFilesModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenPaymentModal={() => handleOpenPayment()}
          onScrollToTickets={() => scrollToSection('preuves-tickets')}
        />

        {/* Live Performance & Proof Stats Banner */}
        <StatsBanner />

        {/* 1. Coupon du jour */}
        <DailyPronos
          vipStatus={vipStatus}
          onOpenPaymentModal={() => handleOpenPayment()}
        />

        {/* 2. Pronos gagnants: Derniers pronostics gagnants / Coupons gagnés en diaporama balayer horizontal */}
        <WinningTicketsSection onOpenPaymentModal={() => handleOpenPayment()} />

        {/* 3. Marketplace: Boutique APK & Jeux GOAT (Aviator Demo, Bots 1xBet, Melbet) */}
        <MarketplaceSection
          currentUser={currentUser}
          onRequireAuth={() => handleOpenAuth('LOGIN')}
          onOpenMyFiles={() => setIsMyFilesModalOpen(true)}
          onBuyApk={handleBuyApk}
        />

        {/* 4. Bookmakers Officiels (1XBET, MELBET, MEGAPARI) with Code Promo 15MAR */}
        <BookmakersSection />

        {/* 5. Abonnements VIP */}
        <VipPricing onSelectPlan={(planId) => handleOpenPayment(planId)} />

        {/* 6. Passerelle Mobile Money (MTN, Orange, Visa Floutée) */}
        <PaymentSection onOpenPaymentModal={() => handleOpenPayment()} />

        {/* 7. Simulateur de Bankroll */}
        <BankrollCalculator onOpenPaymentModal={() => handleOpenPayment()} />

        {/* 8. Avis Membres Certifiés */}
        <Testimonials />

        {/* 9. FAQ */}
        <FaqSection />
      </main>

      {/* Footer & Contact */}
      <Footer />

      {/* Floating Action WhatsApp & Telegram */}
      <FloatingContact onOpenPaymentModal={() => handleOpenPayment()} />

      {/* Modals */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        initialPlanId={selectedPlanId}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authModalMode}
      />

      <MyFilesModal
        isOpen={isMyFilesModalOpen}
        onClose={() => setIsMyFilesModalOpen(false)}
        currentUser={currentUser}
        onGoToMarketplace={() => scrollToSection('marketplace')}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
