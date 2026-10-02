import React from 'react';
import { Star, ShieldCheck, CheckCircle2, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Ibrahim K.',
      city: 'Douala, Cameroun',
      payment: 'MTN Mobile Money (+237)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      gain: '+950 000 FCFA',
      text: 'J\'ai souscrit au pack Pro Mensuel par MTN MoMo au 671460023. En moins de 2 minutes mon compte était activé et j\'ai validé le combiné Serie A du 19 septembre. C\'est du vrai professionnalisme.',
      date: 'Il y a 3 jours',
    },
    {
      name: 'Cédric T.',
      city: 'Yaoundé, Cameroun',
      payment: 'Orange Money (+237)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      gain: '+1 335 700 FCFA',
      text: 'Le combiné Roma/Inter avec Everton était incroyable ! C\'était la première fois que je gagnais plus d\'un million en un seul jour. Simeon Daniel gère sa bankroll avec une rigueur absolue.',
      date: 'Il y a 1 semaine',
    },
    {
      name: 'Yannick M.',
      city: 'Abidjan, Côte d\'Ivoire',
      payment: 'Carte VISA',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      gain: '+780 000 FCFA',
      text: 'Paiement direct avec la carte VISA sans aucun problème. Les coupons 1xBet et Betwinner arrivent à l\'heure chaque matin sur Telegram. Très satisfait du service !',
      date: 'Il y a 4 jours',
    },
  ];

  return (
    <section id="avis-clients" className="py-20 bg-[#0B0F17] border-b border-amber-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>COMMUNAUTÉ DE PLUS DE 15 000 GAGNANTS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Ce Que Disent Nos Parieurs VIP
          </h2>

          <p className="text-slate-400 text-base sm:text-lg">
            Retours d'expérience authentiques vérifiés après validation de coupons et retraits Mobile Money.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="relative rounded-3xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between space-y-4 shadow-xl hover:border-amber-500/40 transition"
            >
              <div className="space-y-4">
                {/* Header review */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-extrabold text-xs">
                    {r.gain}
                  </span>
                </div>

                <p className="text-slate-300 text-sm italic leading-relaxed">
                  « {r.text} »
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-white text-sm flex items-center gap-1.5">
                    {r.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <p className="text-xs text-slate-400">{r.city}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-amber-400/90 font-semibold block">
                    {r.payment}
                  </span>
                  <span className="text-[10px] text-slate-500">{r.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
