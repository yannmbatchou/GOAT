import React, { useState } from 'react';
import { PAYMENT_CONFIG } from '../data/plansData';
import { VisaCardShowcase } from './VisaCardShowcase';
import { Smartphone, ShieldCheck, Zap, Copy, Check, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

interface PaymentSectionProps {
  onOpenPaymentModal: () => void;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({ onOpenPaymentModal }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copy = (val: string, label: string) => {
    navigator.clipboard.writeText(val);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const mtn = PAYMENT_CONFIG.mtn;
  const orange = PAYMENT_CONFIG.orange;

  return (
    <section id="paiements-mobile" className="py-20 bg-[#0B0F17] border-b border-amber-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>MOYENS DE PAIEMENT SÉCURISÉS & INSTANTANÉS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Paiements Mobiles & Carte VISA
          </h2>

          <p className="text-slate-400 text-base sm:text-lg">
            Rejoignez le VIP GOAT392 en quelques secondes grâce à notre intégration directe <strong className="text-yellow-400">MTN MoMo</strong>, <strong className="text-orange-400">Orange Money</strong> et <strong className="text-blue-400">Carte VISA</strong>.
          </p>
        </div>

        {/* 2 Mobile Money Cards: MTN & Orange */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* MTN Mobile Money Box */}
          <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-yellow-500/30 p-6 sm:p-8 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg shadow-yellow-400/20">
                    MTN
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">MTN Mobile Money</h3>
                    <p className="text-xs text-yellow-400 font-semibold">Cameroun & Afrique Centrale</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 text-[10px] font-bold">
                  Instantané 24/7
                </span>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                {/* Number */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Numéro de Dépôt MTN</span>
                    <span className="font-mono text-lg font-bold text-yellow-400">{mtn.displayNumber}</span>
                  </div>
                  <button
                    onClick={() => copy(mtn.number, 'mtn_num')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-yellow-400 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {copiedField === 'mtn_num' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedField === 'mtn_num' ? 'Copié !' : 'Copier'}
                  </button>
                </div>

                {/* Account Holder Name */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Nom du Bénéficiaire Officiel</span>
                    <span className="font-bold text-white text-xs">{mtn.accountName}</span>
                  </div>
                  <button
                    onClick={() => copy(mtn.accountName, 'mtn_name')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    title="Copier le nom"
                  >
                    {copiedField === 'mtn_name' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* USSD Instruction */}
                <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 text-xs flex items-center justify-between">
                  <span>Code USSD direct :</span>
                  <span className="font-mono font-bold text-white bg-slate-950 px-2 py-0.5 rounded">
                    *126#
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenPaymentModal}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20 transition cursor-pointer"
            >
              <Smartphone className="w-4 h-4 fill-slate-950" />
              Payer avec MTN MoMo (671 46 00 23)
            </button>
          </div>

          {/* Orange Money Box */}
          <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-orange-500/30 p-6 sm:p-8 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white font-black text-sm flex items-center justify-center shadow-lg shadow-orange-500/20">
                    OM
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">Orange Money</h3>
                    <p className="text-xs text-orange-400 font-semibold">Cameroun & Afrique Centrale</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 text-[10px] font-bold">
                  Instantané 24/7
                </span>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                {/* Number */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Numéro de Dépôt Orange</span>
                    <span className="font-mono text-lg font-bold text-orange-400">{orange.displayNumber}</span>
                  </div>
                  <button
                    onClick={() => copy(orange.number, 'om_num')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-orange-400 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {copiedField === 'om_num' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedField === 'om_num' ? 'Copié !' : 'Copier'}
                  </button>
                </div>

                {/* Account Holder Name */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Nom du Bénéficiaire Officiel</span>
                    <span className="font-bold text-white text-xs">{orange.accountName}</span>
                  </div>
                  <button
                    onClick={() => copy(orange.accountName, 'om_name')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    title="Copier le nom"
                  >
                    {copiedField === 'om_name' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* USSD Instruction */}
                <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-200 text-xs flex items-center justify-between">
                  <span>Code USSD direct :</span>
                  <span className="font-mono font-bold text-white bg-slate-950 px-2 py-0.5 rounded">
                    *150#
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenPaymentModal}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition cursor-pointer"
            >
              <Smartphone className="w-4 h-4 fill-white" />
              Payer avec Orange Money (655 24 75 63)
            </button>
          </div>
        </div>

        {/* 3D Carte VISA Section Component */}
        <VisaCardShowcase onPayWithCard={onOpenPaymentModal} />
      </div>
    </section>
  );
};
