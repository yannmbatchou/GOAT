import React from 'react';
import { TOTAL_PROOF_GAINS, NET_PROOF_PROFIT } from '../data/ticketsData';
import { TrendingUp, Users, ShieldCheck, Zap, DollarSign } from 'lucide-react';

export const StatsBanner: React.FC = () => {
  return (
    <div className="relative z-10 -mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-900/90 border border-amber-500/25 shadow-2xl backdrop-blur-xl">
        {/* Stat 1 */}
        <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-emerald-400">94.8%</p>
            <p className="text-xs text-slate-400 font-medium">Taux de réussite certifié</p>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-amber-300">
              +{TOTAL_PROOF_GAINS.toLocaleString('fr-FR')} F
            </p>
            <p className="text-xs text-slate-400 font-medium">Gains des 6 tickets présentés</p>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-white">15 480+</p>
            <p className="text-xs text-slate-400 font-medium">Membres VIP actifs</p>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="w-11 h-11 rounded-xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-yellow-400">100%</p>
            <p className="text-xs text-slate-400 font-medium">Instantané MTN & Orange</p>
          </div>
        </div>
      </div>
    </div>
  );
};
