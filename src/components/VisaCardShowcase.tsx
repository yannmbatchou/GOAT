import React, { useState } from 'react';
import { PAYMENT_CONFIG } from '../data/plansData';
import { CreditCard, Copy, Check, ShieldCheck, Lock, Eye, EyeOff, Sparkles, Wifi } from 'lucide-react';

interface VisaCardShowcaseProps {
  onPayWithCard?: () => void;
}

export const VisaCardShowcase: React.FC<VisaCardShowcaseProps> = ({ onPayWithCard }) => {
  const [copied, setCopied] = useState<string | null>(null);
  // Default isBlurred = true as requested by user ("enleve les informatiosnde la caret visa ou tu floute")
  const [isBlurred, setIsBlurred] = useState<boolean>(true);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2500);
  };

  const visa = PAYMENT_CONFIG.visa;

  return (
    <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: 3D Luxury Visa Card Graphic (Blurred / Protected) */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-full max-w-[390px] aspect-[1.586] rounded-2xl p-6 bg-gradient-to-tr from-[#1E293B] via-[#0F172A] to-[#020617] border border-amber-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white flex flex-col justify-between overflow-hidden group">
            {/* Metallic Gold Sheen overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-300/15 to-transparent opacity-70 pointer-events-none group-hover:opacity-100 transition duration-500" />
            <div className="absolute -right-16 -top-16 w-40 h-40 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

            {/* Top row: Chip, Contactless & VISA Logo */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Gold EMV Chip */}
                <div className="w-12 h-9 rounded-md bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 p-[1px] shadow-md">
                  <div className="w-full h-full rounded-[5px] bg-[#D97706]/90 grid grid-cols-3 gap-0.5 p-1 border border-yellow-200/50">
                    <div className="border-r border-b border-amber-900/40"></div>
                    <div className="border-b border-amber-900/40"></div>
                    <div className="border-l border-b border-amber-900/40"></div>
                    <div className="border-r border-amber-900/40"></div>
                    <div></div>
                    <div className="border-l border-amber-900/40"></div>
                  </div>
                </div>
                <Wifi className="w-5 h-5 text-amber-300/80 rotate-90" />
              </div>

              {/* Bold VISA lettering */}
              <div className="text-right">
                <span className="text-2xl font-black italic tracking-tighter text-white font-sans drop-shadow-md">
                  VISA
                </span>
                <span className="block text-[8px] tracking-widest text-amber-400 font-bold uppercase">
                  PLATINUM VIP (PROTÉGÉE)
                </span>
              </div>
            </div>

            {/* Card Number (Blurred & Masked) */}
            <div className="relative z-10 my-auto py-2">
              <div
                className={`transition-all duration-300 ${
                  isBlurred ? 'filter blur-[4px] select-none opacity-80' : ''
                }`}
              >
                <p className="font-mono text-xl sm:text-2xl font-bold tracking-[0.2em] text-amber-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {isBlurred ? '4834 •••• •••• 5839' : visa.rawCardNumber}
                </p>
              </div>
              {isBlurred && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="px-2 py-0.5 rounded bg-black/75 text-[10px] text-amber-300 border border-amber-500/40 font-bold">
                    🔒 Informations Floutées
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Row: Holder, Expiration & Network */}
            <div className="relative z-10 flex items-end justify-between text-xs">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">Titulaire</p>
                <p
                  className={`font-bold tracking-widest text-white text-sm uppercase transition ${
                    isBlurred ? 'filter blur-[3px] select-none' : ''
                  }`}
                >
                  {isBlurred ? 'Simeon G.' : visa.cardHolder}
                </p>
              </div>

              <div className="text-right">
                <p className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">Expire Fin</p>
                <p
                  className={`font-mono font-bold tracking-wider text-amber-300 text-sm transition ${
                    isBlurred ? 'filter blur-[3px] select-none' : ''
                  }`}
                >
                  {isBlurred ? '••/••' : visa.rawExpirationDate}
                </p>
              </div>
            </div>
          </div>

          {/* Toggle Blur Button */}
          <button
            onClick={() => setIsBlurred(!isBlurred)}
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
          >
            {isBlurred ? (
              <>
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Afficher les détails de la carte</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                <span>Flouter et masquer les détails</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Explanations & Masked Details */}
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>PAIEMENT INTERNATIONAL SÉCURISÉ & FLOUTÉ</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Carte VISA Officielle GOAT392
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed">
            Par mesure de sécurité et de confidentialité, les coordonnées bancaires sont masquées par défaut. Vous pouvez régler votre abonnement en toute sécurité directement via notre terminal bancaire sécurisé.
          </p>

          {/* Masked Data Cards */}
          <div className="space-y-2.5">
            {/* Number Masked */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <p className="text-[10px] text-slate-400 font-medium uppercase">Numéro de carte VISA</p>
                <p className="font-mono font-bold text-white text-sm">
                  {isBlurred ? '4834 •••• •••• 5839 (Masqué)' : visa.rawCardNumber}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(isBlurred ? '4834 5600 7610 5839' : visa.rawCardNumber, 'number')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                {copied === 'number' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied === 'number' ? 'Copié !' : 'Copier'}
              </button>
            </div>

            {/* Holder & Expiration */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <p className="text-[10px] text-slate-400 font-medium uppercase">Nom</p>
                  <p className="font-bold text-white text-xs">
                    {isBlurred ? 'Simeon G. (Sécurisé)' : visa.cardHolder}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(visa.cardHolder, 'name')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition cursor-pointer"
                  title="Copier le nom"
                >
                  {copied === 'name' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <p className="text-[10px] text-slate-400 font-medium uppercase">Date d'expiration</p>
                  <p className="font-mono font-bold text-amber-400 text-xs">
                    {isBlurred ? '••/••' : visa.rawExpirationDate}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(visa.rawExpirationDate, 'expire')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition cursor-pointer"
                  title="Copier l'expiration"
                >
                  {copied === 'expire' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {onPayWithCard && (
            <button
              onClick={onPayWithCard}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              Payer par Carte VISA via le Terminal Sécurisé
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
