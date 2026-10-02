import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { PAYMENT_CONFIG } from '../data/plansData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Comment s\'effectue l\'activation après un paiement MTN ou Orange Money ?',
      a: 'L\'activation est quasi instantanée. Lorsque vous effectuez votre paiement sur MTN (671 46 00 23) ou Orange (655 24 75 63), notre système valide automatiquement la transaction. Vous recevez immédiatement votre clé VIP personnelle et le lien direct pour intégrer le canal Telegram secret VIP où sont publiés les coupons chaque jour.',
    },
    {
      q: 'Quels sont les numéros et noms officiels pour régler mon abonnement ?',
      a: `Les coordonnées officielles uniques de GOAT392 PRONOSTICS sont :
• MTN MOBILE MONEY : ${PAYMENT_CONFIG.mtn.number} (${PAYMENT_CONFIG.mtn.accountName})
• ORANGE MONEY : ${PAYMENT_CONFIG.orange.number} (${PAYMENT_CONFIG.orange.accountName})
• CARTE VISA : 4834 •••• •••• 5839 (Simeon G. - Chiffrée & Floutée). N'envoyez jamais vos fonds à aucun autre numéro non listé sur cette page.`,
    },
    {
      q: 'Sur quels bookmakers puis-je parier avec vos pronostics ?',
      a: 'Nos pronostics et combinés sont optimisés pour les plus grands bookmakers : 1xBet, Betwinner, Melbet, 1win, Premier Bet, Bet365, Unibet. Nous fournissons systématiquement les codes de coupon 1xBet / Betwinner pour vous permettre de recharger le pari en 1 seul clic sans devoir chercher chaque match manuellement.',
    },
    {
      q: 'Quel est le capital (bankroll) minimum conseillé ?',
      a: 'Vous pouvez commencer avec une bankroll de 20 000 FCFA à 50 000 FCFA. Grâce à nos protocoles de gestion de bankroll stricts (mises conseillées entre 3% et 7% par coupon), votre capital est protégé des séries négatives et croît de façon constante.',
    },
    {
      q: 'Que faire si la notification USSD ne s\'affiche pas automatiquement ?',
      a: 'Si la notification USSD n\'apparaît pas directement sur votre smartphone après avoir cliqué sur "Initier le débit", composez directement *126# (pour MTN) ou *150# (pour Orange) pour valider l\'opération en attente. Vous pouvez également effectuer un transfert classique vers nos numéros et entrer la référence SMS reçue dans la case "Dépôt Manuel".',
    },
    {
      q: 'Comment contacter directement l\'assistance VIP ?',
      a: 'Notre équipe est joignable 24h/24 et 7j/7 directement sur WhatsApp au +237 683 11 18 04 ainsi que sur notre canal officiel Telegram https://t.me/maximecartercoupondujour.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-[#080B11] border-b border-amber-500/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <HelpCircle className="w-4 h-4 text-yellow-400" />
            <span>RÉPONSES À VOS QUESTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Foire Aux Questions (FAQ)
          </h2>

          <p className="text-slate-400 text-sm sm:text-base">
            Tout ce que vous devez savoir avant de rejoindre l'académie GOAT392.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-extrabold text-white text-sm sm:text-base cursor-pointer hover:text-amber-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3 whitespace-pre-line">
                    {faq.a}
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
