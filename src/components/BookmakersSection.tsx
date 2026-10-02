import React, { useState } from 'react';
import { BOOKMAKERS_CONFIG, PAYMENT_CONFIG } from '../data/plansData';
import { ExternalLink, Copy, Check, Sparkles, Flame, ShieldCheck, ArrowRight, Gift, AlertCircle, PhoneCall } from 'lucide-react';

export const BookmakersSection: React.FC = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const spotsLeft = BOOKMAKERS_CONFIG.totalSpots - BOOKMAKERS_CONFIG.claimedSpots;
  const progressPercent = Math.round((BOOKMAKERS_CONFIG.claimedSpots / BOOKMAKERS_CONFIG.totalSpots) * 100);

  return (
    <section id="bookmakers-officiels" className="py-20 bg-gradient-to-b from-[#080B11] via-[#0D131F] to-[#080B11] border-b border-amber-500/15 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-400/20 to-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black shadow-lg shadow-amber-500/10 animate-pulse">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>ACCÈS VIP OFFERT PAR NOS PARTENAIRES OFFICIELS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Activez Vos Comptes Bookmakers avec le Code Promo{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 font-mono">
              15MAR
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Uniquement pour les comptes <strong className="text-white">1XBET</strong>, <strong className="text-white">MELBET</strong> et <strong className="text-white">MEGAPARI</strong> créés avec le code promo officiel ➡️ <strong className="text-yellow-400 font-mono font-black">15MAR</strong>.
          </p>

          {/* Limited Spots Gauge Bar */}
          <div className="max-w-lg mx-auto pt-3 pb-1">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                Places limitées : <strong className="text-white">5 000 personnes</strong>
              </span>
              <span className="text-rose-400 font-extrabold font-mono">
                Plus que {spotsLeft} places restantes !
              </span>
            </div>

            <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 p-0.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-right text-[10px] text-slate-400 mt-1 font-mono">
              {BOOKMAKERS_CONFIG.claimedSpots} / {BOOKMAKERS_CONFIG.totalSpots} places réservées ({progressPercent}%)
            </p>
          </div>
        </div>

        {/* Universal Promo Code Golden Banner */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-r from-amber-500/20 via-yellow-500/25 to-amber-500/20 border-2 border-amber-400 p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-amber-300 text-xs font-black uppercase tracking-widest">
            <Gift className="w-4 h-4 text-yellow-300" />
            <span>CODE PROMO UNIVERSEL OFFICIEL</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="px-6 py-3 rounded-2xl bg-black/80 border-2 border-amber-400/80 shadow-inner flex items-center gap-3">
              <span className="text-xs text-slate-400 font-bold uppercase">Code Promo :</span>
              <span className="text-3xl sm:text-4xl font-black font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-400">
                {BOOKMAKERS_CONFIG.promoCode}
              </span>
            </div>

            <button
              onClick={() => copyText(BOOKMAKERS_CONFIG.promoCode, 'universal_promo')}
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/30 transition active:scale-95 cursor-pointer"
            >
              {copiedItem === 'universal_promo' ? (
                <>
                  <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                  CODE COPIÉ (15MAR) !
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-950" />
                  COPIER LE CODE 15MAR
                </>
              )}
            </button>
          </div>

          {/* Activation condition */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-amber-200 bg-black/40 py-2.5 px-4 rounded-xl border border-amber-500/20 max-w-xl mx-auto">
            <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0" />
            <span>
              Après l'inscription, fais un premier dépôt de <strong className="text-white">5 000 F</strong> ou <strong className="text-white">10$ minimum</strong> pour activer ton compte authentique.
            </span>
          </div>
        </div>

        {/* 3 Bookmakers Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {BOOKMAKERS_CONFIG.list.map((bm) => (
            <div
              key={bm.id}
              className="relative rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-400/50 p-6 flex flex-col justify-between space-y-6 shadow-2xl transition duration-300 group hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-white text-xs font-black tracking-wide">
                    {bm.badge}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    Lien Certifié ✓
                  </span>
                </div>

                {/* Name */}
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    {bm.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {bm.description}
                  </p>
                </div>

                {/* Bonus highlight */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    Avantage VIP Inclus
                  </p>
                  <p className="text-xs font-extrabold text-white">
                    {bm.bonus}
                  </p>
                </div>

                {/* Coupon Code for this bookmaker */}
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Code coupon {bm.name} :
                    </span>
                    <span className="font-mono font-black text-amber-300 text-sm">
                      {bm.couponCode}
                    </span>
                  </div>
                  <button
                    onClick={() => copyText(bm.couponCode, bm.id + '_code')}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold transition flex items-center gap-1"
                    title="Copier le code coupon"
                  >
                    {copiedItem === bm.id + '_code' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span className="text-[10px]">
                      {copiedItem === bm.id + '_code' ? 'Copié' : 'Copier'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <a
                  href={bm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 rounded-xl font-black text-xs text-center flex items-center justify-center gap-2 text-white shadow-lg transition duration-200 cursor-pointer bg-gradient-to-r ${bm.accentColor} hover:brightness-110`}
                >
                  <span>S'INSCRIRE SUR {bm.name}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <p className="text-center text-[10px] text-slate-500">
                  N'oublie pas d'entrer le code promo <strong className="text-amber-400 font-mono">15MAR</strong>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Help Banner */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-white">
                Besoin d'aide pour votre inscription ou dépôt de 5 000 F ?
              </p>
              <p className="text-xs text-slate-400">
                Contactez notre support VIP direct sur WhatsApp au <strong className="text-emerald-400">{PAYMENT_CONFIG.support.whatsappDisplay}</strong>.
              </p>
            </div>
          </div>

          <a
            href={PAYMENT_CONFIG.support.whatsappUrl2}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 shrink-0 transition"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            Écrire au 683 11 18 04 sur WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
