import React from 'react';
import { DAILY_PRONOS } from '../data/pronosData';
import { VipSubscriptionState } from '../services/paymentService';
import { Lock, Unlock, Sparkles, CheckCircle2, ShieldCheck, Flame, ExternalLink, Zap } from 'lucide-react';

interface DailyPronosProps {
  vipStatus: VipSubscriptionState | null;
  onOpenPaymentModal: () => void;
}

export const DailyPronos: React.FC<DailyPronosProps> = ({
  vipStatus,
  onOpenPaymentModal,
}) => {
  const isVip = Boolean(vipStatus?.isActive);

  return (
    <section id="pronos-jour" className="py-20 bg-[#0B0F17] border-b border-amber-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>SESSION DU JOUR EN COURS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Les Pronostics d'Aujourd'hui
          </h2>

          <p className="text-slate-400 text-base sm:text-lg">
            Profitez de notre analyse offerte pour tester notre fiabilité, et débloquez la sélection VIP exclusive pour maximiser votre capital.
          </p>
        </div>

        {/* Pronos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DAILY_PRONOS.map((prono) => {
            const canView = prono.isFree || isVip;

            return (
              <div
                key={prono.id}
                className={`relative rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 ${
                  prono.isFree
                    ? 'bg-slate-900/90 border border-emerald-500/40 shadow-xl'
                    : isVip
                    ? 'bg-slate-900/90 border border-amber-500/40 shadow-xl'
                    : 'bg-slate-950/80 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border ${
                      prono.isFree
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    {prono.vipTag}
                  </span>

                  <span className="text-xs text-slate-400 font-mono">
                    {prono.dateTime}
                  </span>
                </div>

                {/* Match title */}
                <div className="space-y-1 mb-4">
                  <p className="text-xs text-amber-400/90 font-medium">{prono.competition}</p>
                  <h3 className="text-lg font-black text-white leading-tight">
                    {prono.match}
                  </h3>
                </div>

                {/* Main Content (Revealed or Locked) */}
                {canView ? (
                  <div className="space-y-4 flex-1">
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">{prono.betType}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold text-[10px]">
                          Confiance {prono.confidence}%
                        </span>
                      </div>

                      <div className="text-sm font-extrabold text-white">
                        {prono.selection}
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                        <span className="text-xs text-slate-400">Cote Bookmaker</span>
                        <span className="text-lg font-black text-amber-400 font-mono">
                          {prono.odds}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                      <p className="font-semibold text-slate-200 mb-1">💡 Analyse de l'expert :</p>
                      <p className="text-slate-400">{prono.analysis}</p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-amber-300/90 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
                      <span>{prono.bankrollAdvice}</span>
                      {prono.code1xBet && (
                        <span className="font-mono font-bold text-white bg-slate-900 px-1.5 py-0.5 rounded">
                          Code : {prono.code1xBet}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Blurred / Locked preview for non-VIP */
                  <div className="space-y-4 flex-1 flex flex-col justify-between">
                    <div className="relative p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 overflow-hidden text-center space-y-3">
                      {/* Blurred backdrop content */}
                      <div className="filter blur-md select-none opacity-40 pointer-events-none space-y-2">
                        <p className="text-xs text-slate-400">{prono.betType}</p>
                        <p className="text-sm font-bold text-white">Choix Secret VIP Cote {prono.odds}</p>
                        <div className="h-4 bg-amber-400/20 rounded mx-auto w-3/4"></div>
                        <p className="text-xs text-slate-400">Confiance estimée 97%</p>
                      </div>

                      {/* Lock overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 bg-black/60 backdrop-blur-[2px]">
                        <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center mb-2">
                          <Lock className="w-5 h-5 text-amber-400" />
                        </div>
                        <p className="text-xs font-black text-white">RÉSERVÉ AUX MEMBRES VIP</p>
                        <p className="text-[10px] text-slate-400 mt-1">Cote : {prono.odds} • Confiance {prono.confidence}%</p>
                      </div>
                    </div>

                    <button
                      onClick={onOpenPaymentModal}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 transition cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 fill-slate-950" />
                      DÉBLOQUER CE PRONO MAINTENANT
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
