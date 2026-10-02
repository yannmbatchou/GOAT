import React, { useState, useRef, useEffect } from 'react';
import { WINNING_TICKETS } from '../data/ticketsData';
import { BetTicket } from '../types';
import { IPhoneCouponScreenshot } from './IPhoneCouponScreenshot';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Sparkles,
  Trophy,
} from 'lucide-react';

interface WinningTicketsSectionProps {
  onOpenPaymentModal: () => void;
}

export const WinningTicketsSection: React.FC<WinningTicketsSectionProps> = ({
  onOpenPaymentModal,
}) => {
  const [modalTicket, setModalTicket] = useState<BetTicket | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Auto scroll effect
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const nextScroll = scrollLeft + 310;

        if (nextScroll >= maxScroll - 50) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainerRef.current.scrollBy({ left: 310, behavior: 'smooth' });
        }
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const scrollLeft = () => {
    setIsAutoScrolling(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -310, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    setIsAutoScrolling(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 310, behavior: 'smooth' });
    }
  };

  return (
    <section id="preuves-tickets" className="py-16 sm:py-20 bg-black border-b border-amber-500/15 relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto space-y-8">
        {/* Section Header exactly as in image.png */}
        <div className="px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5 text-left">
            <p className="text-xs sm:text-sm font-extrabold tracking-[0.2em] text-[#10B981] uppercase">
              DERNIERS PRONOSTICS GAGNANTS
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Coupons gagnés
            </h2>
          </div>

          {/* Navigation Arrows on Top Right */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full bg-[#111622] hover:bg-[#10B981] hover:text-black text-white border border-slate-800 flex items-center justify-center transition cursor-pointer"
              title="Précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 rounded-full bg-[#111622] hover:bg-[#10B981] hover:text-black text-white border border-slate-800 flex items-center justify-center transition cursor-pointer"
              title="Suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Continuous Phone Slider matching image.png */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsAutoScrolling(false)}
          onMouseLeave={() => setIsAutoScrolling(true)}
          className="flex items-center gap-5 sm:gap-6 overflow-x-auto scrollbar-none px-4 sm:px-8 lg:px-12 py-4 snap-x snap-mandatory scroll-smooth"
        >
          {WINNING_TICKETS.map((ticket) => (
            <div
              key={ticket.id}
              className="shrink-0 w-[260px] sm:w-[285px] snap-center transition-transform duration-300 hover:scale-[1.02]"
            >
              <IPhoneCouponScreenshot
                ticket={ticket}
                showBottomOverlay={true}
                onExpand={() => setModalTicket(ticket)}
              />
            </div>
          ))}
        </div>

        {/* Fullscreen Inspector Modal */}
        {modalTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
            <div className="relative max-w-lg w-full bg-slate-950 rounded-3xl border border-emerald-500/40 p-4 sm:p-6 shadow-2xl space-y-4 my-8">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#10B981]" />
                  <span className="font-black text-white text-sm sm:text-base">
                    Capture Reçue : Image #{modalTicket.imageNumber} ({modalTicket.slipNumber})
                  </span>
                </div>
                <button
                  onClick={() => setModalTicket(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 text-sm font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* High-res Phone in Modal */}
              <div className="py-2 flex justify-center">
                <IPhoneCouponScreenshot
                  ticket={modalTicket}
                  showBottomOverlay={false}
                  className="max-w-[340px]"
                />
              </div>

              {/* Details in Modal */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Gain Total Encaissé :</span>
                  <span className="font-black text-[#10B981] text-base">
                    +{modalTicket.payout.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mise investie :</span>
                  <span className="font-bold text-white">
                    {modalTicket.stake.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Cote validée :</span>
                  <span className="font-mono font-bold text-amber-400">
                    {modalTicket.totalOdds}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => {
                    setModalTicket(null);
                    onOpenPaymentModal();
                  }}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 fill-white" />
                  RECEVOIR LES PROCHAINS COUPONS
                </button>
                <button
                  onClick={() => setModalTicket(null)}
                  className="px-5 py-3.5 rounded-xl bg-slate-900 text-slate-300 font-bold text-xs hover:bg-slate-800 cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
