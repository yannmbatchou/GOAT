import React, { useState, useEffect } from 'react';
import { APK_PRODUCTS } from '../data/apkData';
import { ApkProduct, UserAccount } from '../types';
import { AuthService } from '../services/authService';
import {
  Download,
  Sparkles,
  Plane,
  Bot,
  Scan,
  Crown,
  Lock,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Zap,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../services/languageContext';

interface MarketplaceSectionProps {
  currentUser: UserAccount | null;
  onRequireAuth: () => void;
  onOpenMyFiles: () => void;
  onBuyApk: (apk: ApkProduct) => void;
}

export const MarketplaceSection: React.FC<MarketplaceSectionProps> = ({
  currentUser,
  onRequireAuth,
  onOpenMyFiles,
  onBuyApk,
}) => {
  const { lang, t } = useLanguage();

  // Aviator Demo State
  const [multiplier, setMultiplier] = useState(1.0);
  const [isFlying, setIsFlying] = useState(false);
  const [hasCrashed, setHasCrashed] = useState(false);
  const [cashedOutAt, setCashedOutAt] = useState<number | null>(null);
  const [demoBet, setDemoBet] = useState(2000);
  const [demoGain, setDemoGain] = useState(0);

  // Aviator loop simulation
  useEffect(() => {
    let interval: any;
    if (isFlying && !hasCrashed) {
      interval = setInterval(() => {
        setMultiplier((prev) => {
          const next = +(prev + 0.05 + prev * 0.02).toFixed(2);
          // Crash trigger between 3.50x and 6.00x
          if (next >= 4.85) {
            setHasCrashed(true);
            setIsFlying(false);
            return next;
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isFlying, hasCrashed]);

  const startFlight = () => {
    setMultiplier(1.0);
    setHasCrashed(false);
    setCashedOutAt(null);
    setDemoGain(0);
    setIsFlying(true);
  };

  const handleCashout = () => {
    if (isFlying && !hasCrashed) {
      setCashedOutAt(multiplier);
      setDemoGain(Math.round(demoBet * multiplier));
      setIsFlying(false);
    }
  };

  const handleAction = (apk: ApkProduct) => {
    if (!currentUser) {
      onRequireAuth();
      return;
    }
    onBuyApk(apk);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'plane':
        return <Plane className="w-5 h-5 text-rose-400 rotate-[-15deg]" />;
      case 'bot':
        return <Bot className="w-5 h-5 text-amber-400" />;
      case 'scanner':
        return <Scan className="w-5 h-5 text-sky-400" />;
      default:
        return <Crown className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <section id="marketplace" className="py-20 bg-[#070A0F] border-b border-amber-500/15 relative overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-rose-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-amber-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-yellow-500/20 border border-amber-400/40 text-amber-300 text-xs font-black shadow-lg">
            <ShoppingBag className="w-4 h-4 text-rose-400" />
            <span>BOUTIQUE APK & JEUX GOAT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {lang === 'fr' ? 'Boutique APK • Jeux GOAT' : 'APK Store • GOAT Games'}
          </h2>

          <p className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 italic">
            « {t('marketplace_slogan')} »
          </p>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            {lang === 'fr'
              ? 'Connectez-vous pour débloquer nos bots de prédiction, nos signaux d\'arbitrage et le bot Aviator. Téléchargement immédiat des fichiers .apk.'
              : 'Log in to unlock our predictor bots, arbitrage signals, and the Aviator bot. Instant download of .apk files.'}
          </p>
        </div>

        {/* ===================== FEATURED GAME: AVIATOR PREDICTOR LIVE DEMO ===================== */}
        <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-[#120810] border-2 border-rose-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left: Aviator Canvas & Multiplier Screen */}
            <div className="w-full lg:w-7/12 rounded-2xl bg-black/90 border border-rose-500/30 p-6 relative min-h-[300px] flex flex-col justify-between overflow-hidden shadow-inner">
              {/* Radar Grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a0815_1px,transparent_1px),linear-gradient(to_bottom,#2a0815_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />

              {/* Top Meta */}
              <div className="relative z-10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="font-black text-rose-400 tracking-wider">JEU AVIATOR GOAT392</span>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold">
                  SIGNAL PRÉDICTIF VIP : 4.85x
                </div>
              </div>

              {/* Central Multiplier & Flying Plane */}
              <div className="relative z-10 my-auto text-center py-6 space-y-2">
                <div className="flex items-center justify-center gap-3">
                  <span
                    className={`font-black font-mono text-5xl sm:text-6xl tracking-tight transition-all duration-100 ${
                      hasCrashed
                        ? 'text-rose-500 animate-pulse'
                        : isFlying
                        ? 'text-white drop-shadow-[0_0_20px_rgba(244,63,94,0.8)]'
                        : 'text-slate-400'
                    }`}
                  >
                    {hasCrashed ? 'FLEW AWAY!' : `${multiplier.toFixed(2)}x`}
                  </span>

                  {isFlying && !hasCrashed && (
                    <div className="animate-bounce">
                      <Plane className="w-10 h-10 text-rose-500 fill-rose-500 rotate-[-25deg]" />
                    </div>
                  )}
                </div>

                {cashedOutAt && (
                  <div className="inline-block px-4 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-sm font-black animate-in fade-in">
                    ✓ Encaissé à {cashedOutAt.toFixed(2)}x (+{demoGain.toLocaleString('fr-FR')} FCFA)
                  </div>
                )}

                {hasCrashed && (
                  <p className="text-xs text-rose-400 font-bold">
                    L'avion s'est envolé à {multiplier.toFixed(2)}x. Relancez le décollage !
                  </p>
                )}
              </div>

              {/* Bottom Flight Controls */}
              <div className="relative z-10 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  Mise Démo : <strong className="text-white font-mono">{demoBet.toLocaleString('fr-FR')} F</strong>
                </div>

                <div className="flex items-center gap-2">
                  {!isFlying ? (
                    <button
                      onClick={startFlight}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 text-white font-black text-xs flex items-center gap-1.5 shadow-lg shadow-rose-500/30 transition cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      Lancer Décollage (Test)
                    </button>
                  ) : (
                    <button
                      onClick={handleCashout}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/40 animate-pulse transition cursor-pointer"
                    >
                      <Zap className="w-4 h-4 fill-white" />
                      Encaisser {Math.round(demoBet * multiplier).toLocaleString('fr-FR')} F
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Aviator Predictor APK Pitch */}
            <div className="w-full lg:w-5/12 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ALGORITHME PREDICTOR EXCLUSIF</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Aviator Predictor GOAT VIP (APK)
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                Ne jouez plus à l'aveugle sur 1xBet ou Melbet ! Notre bot prédit le multiplicateur de crash avant le décollage avec un taux de réussite prouvé de 96.4%.
              </p>

              <div className="p-3.5 rounded-2xl bg-black/60 border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Prix de la licence :</span>
                  <span className="font-black text-rose-400 text-base">15 000 FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Installation :</span>
                  <span className="font-bold text-white">APK Android immédiat</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mises à jour :</span>
                  <span className="text-emerald-400 font-bold">À vie & gratuites</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleAction(APK_PRODUCTS[0])}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 hover:from-rose-400 hover:to-pink-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-rose-500/30 transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  ACHETER L'APK AVIATOR (15 000 F)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===================== CATALOGUE OF APKS ===================== */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-2xl font-black text-white">
              Nos APKs & Bots Disponibles au Téléchargement
            </h3>

            {currentUser && (
              <button
                onClick={onOpenMyFiles}
                className="px-4 py-2 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold hover:bg-amber-400/30 transition flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                Accéder à « Mes fichiers » ({currentUser.purchasedApks.length} débloqué(s))
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {APK_PRODUCTS.map((apk) => {
              const isPurchased = currentUser?.purchasedApks.includes(apk.id);

              return (
                <div
                  key={apk.id}
                  className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 flex flex-col justify-between space-y-5 hover:border-amber-400/40 transition shadow-xl group"
                >
                  <div className="space-y-3">
                    {/* Top Row */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                        {getIcon(apk.iconType)}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        {apk.category}
                      </span>
                    </div>

                    {/* Name & version */}
                    <div>
                      <h4 className="font-black text-white text-base leading-tight group-hover:text-amber-300 transition">
                        {apk.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {apk.version} • {apk.size}
                      </p>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {apk.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-1.5 pt-1 text-[11px] text-slate-300">
                      {apk.features.slice(0, 2).map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Tarif APK :</span>
                      <span className="text-lg font-black text-amber-400 font-mono">
                        {apk.priceFcfa.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>

                    {isPurchased ? (
                      <button
                        onClick={onOpenMyFiles}
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Déjà acheté • Télécharger
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAction(apk)}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
                      >
                        {!currentUser ? (
                          <>
                            <Lock className="w-3.5 h-3.5" />
                            Se connecter pour acheter
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            Payer & Télécharger
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
