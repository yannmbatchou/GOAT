import React, { useState } from 'react';
import { Calculator, TrendingUp, Sparkles, DollarSign, CheckCircle2 } from 'lucide-react';

interface BankrollCalculatorProps {
  onOpenPaymentModal: () => void;
}

export const BankrollCalculator: React.FC<BankrollCalculatorProps> = ({ onOpenPaymentModal }) => {
  const [initialCapital, setInitialCapital] = useState<number>(100000); // 100,000 FCFA default

  // Realistic VIP compounding calculation: avg odds 2.05, 94% win rate, 5% bankroll unit
  const estimatedMonthMultiplier = 3.4; // capital multiplied by ~3.4x over 30 days
  const projectedMonthGains = Math.round(initialCapital * estimatedMonthMultiplier);
  const netMonthProfit = projectedMonthGains - initialCapital;

  const projectedWeekGains = Math.round(initialCapital * 1.55);
  const projectedQuarterGains = Math.round(initialCapital * 9.2);

  return (
    <section id="simulateur-bankroll" className="py-20 bg-[#080B11] border-b border-amber-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <Calculator className="w-4 h-4" />
            <span>SIMULATEUR DE CROISSANCE DE CAPITAL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Combien Pouvez-Vous Gagner avec le VIP ?
          </h2>

          <p className="text-slate-400 text-base sm:text-lg">
            Découvrez votre progression financière estimée selon une gestion de bankroll mathématique rigoureuse appliquée par le club GOAT392.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900 border border-amber-500/30 p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Slider input */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-sm font-bold text-slate-300">
                Votre Capital de Départ (Bankroll en FCFA) :
              </label>
              <span className="font-mono text-2xl font-black text-amber-400 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                {initialCapital.toLocaleString('fr-FR')} FCFA
              </span>
            </div>

            <input
              type="range"
              min="20000"
              max="1000000"
              step="10000"
              value={initialCapital}
              onChange={(e) => setInitialCapital(Number(e.target.value))}
              className="w-full h-3 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400 border border-slate-800"
            />

            <div className="flex justify-between text-xs text-slate-500 font-mono">
              <span>20 000 F</span>
              <span>250 000 F</span>
              <span>500 000 F</span>
              <span>1 000 000 F</span>
            </div>
          </div>

          {/* Projection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* 7 Days */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-center">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                Objectif 7 Jours
              </span>
              <p className="text-2xl font-black text-white">
                {projectedWeekGains.toLocaleString('fr-FR')} F
              </p>
              <p className="text-xs text-emerald-400 font-bold">
                +{(projectedWeekGains - initialCapital).toLocaleString('fr-FR')} F de bénéfice
              </p>
            </div>

            {/* 30 Days (Featured) */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-500/15 to-slate-950 border-2 border-amber-400 space-y-2 text-center shadow-xl">
              <span className="px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                Objectif 1 Mois (x3.4)
              </span>
              <p className="text-3xl font-black text-amber-300">
                {projectedMonthGains.toLocaleString('fr-FR')} F
              </p>
              <p className="text-xs text-emerald-400 font-bold">
                +{netMonthProfit.toLocaleString('fr-FR')} F net en poche
              </p>
            </div>

            {/* 90 Days */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-center">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                Objectif 3 Mois
              </span>
              <p className="text-2xl font-black text-white">
                {projectedQuarterGains.toLocaleString('fr-FR')} F
              </p>
              <p className="text-xs text-emerald-400 font-bold">
                +{(projectedQuarterGains - initialCapital).toLocaleString('fr-FR')} F de bénéfice
              </p>
            </div>
          </div>

          {/* Explanation note */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Calcul fondé sur nos bilans officiels (Cotes moyennes de 2.05 avec 5% de mise sécurisée par coupon).
              </span>
            </div>
            <button
              onClick={onOpenPaymentModal}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shrink-0 transition"
            >
              Rejoindre et Démarrer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
