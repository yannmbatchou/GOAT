import React from 'react';
import { BrandLogo } from './BrandLogo';
import { TOTAL_PROOF_GAINS } from '../data/ticketsData';
import { ShieldCheck, Zap, ArrowRight, Trophy, Smartphone, Lock, CheckCircle2 } from 'lucide-react';
import { PAYMENT_CONFIG } from '../data/plansData';

interface HeroProps {
  onOpenPaymentModal: () => void;
  onScrollToTickets: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenPaymentModal,
  onScrollToTickets,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-amber-500/15">
      {/* Background Stadium Glow & Ambient Highlights */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_stadium_vip_1790849655172.jpg"
          alt="Atmosphère Stade VIP"
          className="w-full h-full object-cover opacity-20 filter saturate-150 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/90 to-[#0B0F17]/70" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Slogan & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-lg shadow-amber-500/10">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>N°1 EN AFRIQUE CENTRALE & EUROPÉENNE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-emerald-400 font-extrabold">+94.8% DE RÉUSSITE</span>
            </div>

            {/* Main Title with brand & exact slogan */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
                  GOAT392
                </span>{' '}
                <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                  PRONOSTICS
                </span>
              </h1>

              {/* Exact User Slogan */}
              <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold italic text-amber-300 tracking-wide font-serif">
                « Ne pariez plus au hasard, misez sur l'expertise »
              </p>
            </div>

            {/* Subtitle Description */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Accédez chaque jour aux combinés safes analysés par des professionnels, aux montantes sécurisées et à une gestion de bankroll sans faille. Arrêtez de perdre vos mises, rejoignez l’élite dès aujourd'hui.
            </p>

            {/* Special Promo Code Bookmaker Alert */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 border border-amber-400/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                  VIP
                </span>
                <div className="text-xs">
                  <p className="text-white font-black">
                    Comptes 1XBET • MELBET • MEGAPARI
                  </p>
                  <p className="text-amber-300/90 font-medium text-[11px]">
                    Code Promo Officiel : <strong className="font-mono font-black text-white bg-black/60 px-1.5 py-0.5 rounded border border-amber-400/50">15MAR</strong> • 5000 places limitées
                  </p>
                </div>
              </div>
              <a
                href="#bookmakers-officiels"
                className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shrink-0 transition shadow-md shadow-amber-400/20"
              >
                Activer mon compte
              </a>
            </div>

            {/* Payment methods quick highlights */}
            <div className="pt-1 pb-1 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs">
              <span className="text-slate-400 font-medium">Paiements acceptés :</span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-yellow-500/15 border border-yellow-500/40 text-yellow-300 font-bold">
                <Smartphone className="w-3.5 h-3.5" />
                MTN MoMo (671 46 00 23)
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-500/15 border border-orange-500/40 text-orange-400 font-bold">
                <Smartphone className="w-3.5 h-3.5" />
                Orange Money (655 24 75 63)
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/15 border border-blue-500/40 text-blue-300 font-bold">
                <Lock className="w-3.5 h-3.5" />
                Carte VISA
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenPaymentModal}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-base shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 transition cursor-pointer"
              >
                <Zap className="w-5 h-5 fill-slate-950 text-slate-950" />
                REJOINDRE LE VIP MAINTENANT
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onScrollToTickets}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/30 text-amber-300 font-bold text-base flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Voir les 6 Preuves ({TOTAL_PROOF_GAINS.toLocaleString('fr-FR')} F)
              </button>
            </div>

            {/* Guarantee points */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-400 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Validation instantanée</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Canal Telegram privé 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Conseils de mise stricts</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card (Ticket 1 & 2 Preview + Official Logo) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glowing back element */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-3xl opacity-30 blur-xl animate-pulse" />

              {/* Main Container Card */}
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-amber-500/30 p-5 shadow-2xl backdrop-blur-md space-y-4">
                {/* Header with Logo */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <BrandLogo size="md" />
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-black tracking-wide">
                    COUPON GAGNANT
                  </span>
                </div>

                {/* Bet Summary Banner */}
                <div className="bg-slate-950/90 rounded-xl p-3.5 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Coupon № 87960815923</span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      ✓ Statut : PAYÉ
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center pt-1">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <p className="text-[10px] text-slate-400 font-medium">Cote Totale</p>
                      <p className="text-lg font-black text-amber-400">2.51</p>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <p className="text-[10px] text-slate-400 font-medium">Mise VIP</p>
                      <p className="text-sm font-black text-white">500 000 F</p>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30">
                      <p className="text-[10px] text-emerald-400 font-bold">Gain Récolté</p>
                      <p className="text-sm font-black text-emerald-400">1 255 000 F</p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 pt-1 flex items-center justify-between bg-slate-900/60 p-2 rounded-lg">
                    <span className="font-semibold text-slate-200">Fortaleza EC 2:2 Athletic Club</span>
                    <span className="text-emerald-400 font-bold">2 Équipes marquent : Oui ✓</span>
                  </div>
                </div>

                {/* 2nd mini preview card */}
                <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-200">Combiné Serie A & Premier League</p>
                    <p className="text-[11px] text-slate-400">Roma 2:2 Inter + Everton 1:0 Ipswich</p>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-emerald-400 text-sm">+1 335 700 F</span>
                    <p className="text-[10px] text-amber-400 font-semibold">Cote 2.671</p>
                  </div>
                </div>

                {/* Total Proof Accumulator */}
                <div className="rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 p-3 border border-amber-500/40 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-amber-200 font-semibold uppercase tracking-wider">
                      Total 6 Derniers Coupons
                    </p>
                    <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-yellow-400">
                      {TOTAL_PROOF_GAINS.toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                  <button
                    onClick={onScrollToTickets}
                    className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition"
                  >
                    Examiner les 6
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
