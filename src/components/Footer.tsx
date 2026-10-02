import React from 'react';
import { BrandLogo } from './BrandLogo';
import { PAYMENT_CONFIG } from '../data/plansData';
import { ShieldCheck, PhoneCall, Send, Smartphone, CreditCard, Lock, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="footer-contacts" className="bg-[#05070B] border-t border-amber-500/20 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo size="md" />

            <p className="text-amber-300 font-extrabold italic text-sm font-serif">
              « Ne pariez plus au hasard, misez sur l'expertise »
            </p>

            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Le service numéro un en analyses sportives football et gestion de bankroll. Des combinés certifiés au quotidien pour faire passer vos paris sportifs au niveau supérieur.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
              <a
                href={PAYMENT_CONFIG.support.whatsappUrl1}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 font-bold hover:bg-emerald-600/30 transition flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                WhatsApp VIP Officiel (+237 683 11 18 04)
              </a>

              <a
                href={PAYMENT_CONFIG.support.telegramVipChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-300 font-bold hover:bg-sky-500/30 transition flex items-center gap-2"
              >
                <Send className="w-4 h-4 text-sky-400" />
                Canal Telegram VIP (@maximecartercoupondujour)
              </a>
            </div>
          </div>

          {/* Col 2: Official Payment Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-amber-400" />
              Coordonnées Officielles de Paiement
            </h4>

            <div className="space-y-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-900">
                <span className="text-yellow-400 font-bold block">MTN Mobile Money :</span>
                <span className="text-white font-mono font-bold text-xs">{PAYMENT_CONFIG.mtn.number}</span>
                <span className="text-slate-400 block">{PAYMENT_CONFIG.mtn.accountName}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-900">
                <span className="text-orange-400 font-bold block">Orange Money :</span>
                <span className="text-white font-mono font-bold text-xs">{PAYMENT_CONFIG.orange.number}</span>
                <span className="text-slate-400 block">{PAYMENT_CONFIG.orange.accountName}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-900">
                <span className="text-blue-400 font-bold block">Carte VISA :</span>
                <span className="text-white font-mono font-bold text-xs">4834 •••• •••• 5839 (Floutée/Cryptée)</span>
                <span className="text-slate-400 block">Titulaire : Simeon G. (Protégé) • Exp : ••/••</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">
              Navigation Rapide
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#preuves-tickets" className="hover:text-amber-400 transition">
                  • Les 6 Preuves de Gains Réels
                </a>
              </li>
              <li>
                <a href="#pronos-jour" className="hover:text-amber-400 transition">
                  • Pronostics du Jour (Gratuit & VIP)
                </a>
              </li>
              <li>
                <a href="#tarifs-vip" className="hover:text-amber-400 transition">
                  • Formules d'Abonnement VIP
                </a>
              </li>
              <li>
                <a href="#paiements-mobile" className="hover:text-amber-400 transition">
                  • Passerelle Mobile Money
                </a>
              </li>
              <li>
                <a href="#simulateur-bankroll" className="hover:text-amber-400 transition">
                  • Simulateur de Bankroll
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition">
                  • Questions Fréquentes
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Responsible Gaming & Disclaimers */}
        <div className="pt-8 border-t border-slate-900 space-y-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-2 text-amber-500/80 font-bold uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4" />
            Jeu Responsable • Interdit aux moins de 18 ans (+18)
          </div>
          <p className="leading-relaxed">
            Les paris sportifs comportent des risques financiers et des risques d'addiction. Ne misez jamais de sommes dont vous pourriez avoir besoin pour votre subsistance quotidienne. GOAT392 PRONOSTICS fournit des conseils et analyses statistiques rigoureux mais rappelle qu'aucun pronostic sportif n'est garanti à 100%. Jouez avec modération.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 GOAT392 PRONOSTICS — Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Conditions Générales</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Politique de Confidentialité</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Mentions Légales</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
