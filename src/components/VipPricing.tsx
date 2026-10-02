import React from 'react';
import { VIP_PLANS, PAYMENT_CONFIG } from '../data/plansData';
import { Check, Shield, Smartphone, CreditCard } from 'lucide-react';

interface VipPricingProps {
  onSelectPlan: (planId: string) => void;
}

export const VipPricing: React.FC<VipPricingProps> = ({ onSelectPlan }) => {
  return (
    <section id="tarifs-vip" className="py-24 bg-black border-b border-amber-500/15 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        {/* Exact Header matching image.png */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-[#E5A83B] uppercase">
            ABONNEMENTS
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Choisis ton abonnement et devient VIP
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-normal">
            Pronostics analysés chaque jour. Sans engagement — tu restes libre.
          </p>
        </div>

        {/* The 3 Cards Grid exactly as in image.png */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
          {VIP_PLANS.map((plan) => {
            const isPopular = Boolean(plan.isPopular);

            return (
              <div
                key={plan.id}
                className={`relative rounded-[28px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-[#10131B] border-2 border-[#E5A83B] shadow-[0_0_50px_rgba(229,168,59,0.18)] -translate-y-1'
                    : 'bg-[#0E1117] border border-slate-800/90 hover:border-slate-700'
                }`}
              >
                {/* Populaire Badge on Top Border */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-5 py-1 rounded-full text-xs font-bold text-slate-950 bg-[#E5A83B] shadow-md tracking-wide">
                      Populaire
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="space-y-1">
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#E5A83B] tracking-tight">
                      {plan.priceFcfa.toLocaleString('fr-FR')} FCFA
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 font-normal">
                      Sans engagement
                    </p>
                  </div>

                  {/* Features List with checkmarks */}
                  <ul className="space-y-3.5 pt-2 text-xs sm:text-sm text-slate-200">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className="text-slate-400 font-bold shrink-0">✓</span>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Button: Pill style */}
                <div className="pt-8">
                  <button
                    onClick={() => onSelectPlan(plan.id)}
                    className={`w-full py-4 rounded-full font-bold text-sm sm:text-base text-center transition cursor-pointer active:scale-95 ${
                      isPopular
                        ? 'bg-[#E5A83B] hover:bg-[#F3B74E] text-slate-950 font-black shadow-lg shadow-amber-500/20'
                        : 'bg-[#181D27] hover:bg-[#222836] text-white border border-slate-700/80'
                    }`}
                  >
                    Souscrire
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Support Guarantee */}
        <div className="max-w-4xl mx-auto p-5 rounded-2xl bg-[#0D1016] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="font-extrabold text-white">Activation Instantanée 24h/24</p>
              <p className="text-slate-400">
                Paiement direct sécurisé via MTN Mobile Money, Orange Money ou Carte VISA.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400 shrink-0">
            <Smartphone className="w-4 h-4 text-yellow-400" />
            <span>MTN</span>
            <span>•</span>
            <Smartphone className="w-4 h-4 text-orange-400" />
            <span>Orange</span>
            <span>•</span>
            <CreditCard className="w-4 h-4 text-blue-400" />
            <span>Visa</span>
          </div>
        </div>
      </div>
    </section>
  );
};
