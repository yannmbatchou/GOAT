import React from 'react';
import { BetTicket } from '../types';
import { ChevronLeft, MoreHorizontal, Check, Flame, Star, Clock, Grid, Ticket } from 'lucide-react';

interface IPhoneCouponScreenshotProps {
  ticket: BetTicket;
  className?: string;
  onExpand?: () => void;
  showBottomOverlay?: boolean;
}

export const IPhoneCouponScreenshot: React.FC<IPhoneCouponScreenshotProps> = ({
  ticket,
  className = '',
  onExpand,
  showBottomOverlay = true,
}) => {
  // Determine mock time from the ticket
  const mockTime = ticket.imageNumber === 2 ? '06:41' : ticket.imageNumber >= 3 && ticket.imageNumber <= 5 ? '06:40' : '06:39';
  const batteryPct = ticket.imageNumber === 2 ? '10' : '11';
  const eventsCount = ticket.eventsCount || ticket.matches.length;

  return (
    <div
      onClick={onExpand}
      className={`relative w-full aspect-[9/19.5] rounded-[38px] sm:rounded-[42px] p-3 bg-black border-[3.5px] border-[#2B3342] shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden text-slate-800 font-sans select-none flex flex-col justify-between cursor-pointer group hover:border-[#10B981] transition-all duration-300 ${className}`}
    >
      {/* Dynamic Island / Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4.5 bg-black rounded-full z-40 flex items-center justify-end pr-2 pointer-events-none">
        <div className="w-2 h-2 rounded-full bg-[#1A1A1A] border border-slate-800" />
      </div>

      {/* Screen Frame Container */}
      <div className="relative w-full h-full rounded-[28px] sm:rounded-[32px] bg-[#EEF3F8] overflow-hidden flex flex-col justify-between">
        {/* ================= TOP IOS STATUS BAR ================= */}
        <div className="pt-2 px-5 flex items-center justify-between text-xs font-semibold text-slate-900 z-20">
          <span className="font-mono text-[12px] font-bold">{mockTime}</span>
          <div className="flex items-center gap-1 text-[10px]">
            {/* Cellular signal bars */}
            <div className="flex items-end gap-0.5 h-2.5">
              <span className="w-0.5 h-1 bg-slate-900 rounded-2xs" />
              <span className="w-0.5 h-1.5 bg-slate-900 rounded-2xs" />
              <span className="w-0.5 h-2 bg-slate-900 rounded-2xs" />
              <span className="w-0.5 h-2.5 bg-slate-900 rounded-2xs" />
            </div>
            {/* Wifi icon */}
            <svg className="w-3 h-3 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zm0 3.5c3.78 0 7.21 1.5 9.73 3.96L12 19.34 2.27 11.46C4.79 9 8.22 7.5 12 7.5z" />
            </svg>
            {/* Battery pill */}
            <div className="flex items-center">
              <div className="w-5 h-2.5 rounded-full bg-amber-300 text-[8px] font-black text-slate-950 flex items-center justify-center font-mono">
                {batteryPct}
              </div>
            </div>
          </div>
        </div>

        {/* ================= APP HEADER: "Informations sur le pari" ================= */}
        <div className="px-3.5 py-1.5 flex items-center justify-between z-20 text-[#1E3A8A]">
          <button className="p-0.5 text-[#2563EB]">
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <h4 className="text-xs font-bold text-[#1E293B] tracking-tight">
            Informations sur le pari
          </h4>
          <button className="p-0.5 text-[#2563EB]">
            <MoreHorizontal className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* ================= SCROLLABLE SLIP CONTENT ================= */}
        <div className="flex-1 overflow-y-auto px-3 py-1 space-y-2.5 scrollbar-none z-10 pb-20">
          {/* Slip Type Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white shadow-xs border border-slate-200/80 flex items-center justify-center">
                <Ticket className="w-3.5 h-3.5 text-[#1E3A8A]" />
              </div>
              <div>
                <p className="text-[9px] text-slate-500 font-medium">{ticket.dateBet}</p>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-[#0F172A] leading-none">
                    {ticket.type}
                  </span>
                  <span className="w-3 h-3 rounded-full bg-[#10B981] flex items-center justify-center text-white text-[8px]">
                    <Check className="w-2 h-2 stroke-[3]" />
                  </span>
                </div>
                <p className="text-[9px] font-mono text-slate-600 font-medium">
                  {ticket.slipNumber}
                </p>
              </div>
            </div>

            {ticket.tag && (
              <span className="px-1.5 py-0.5 rounded bg-[#3B82F6] text-white text-[9px] font-bold">
                {ticket.tag}
              </span>
            )}
          </div>

          {ticket.eventsCompleted && (
            <div className="flex items-center justify-between text-[10px] font-bold text-[#1E293B] pt-0.5">
              <span>Événements : {eventsCount}</span>
              <span className="text-slate-700">{ticket.eventsCompleted}</span>
            </div>
          )}

          {/* 4 Line Key Metrics Table */}
          <div className="space-y-0.5 text-[11px]">
            <div className="flex justify-between items-center text-slate-700">
              <span className="font-semibold text-slate-600 text-[10px]">Cotes:</span>
              <span className="font-extrabold text-[#0F172A] text-xs font-mono">
                {ticket.totalOdds}
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-700">
              <span className="font-semibold text-slate-600 text-[10px]">Mise:</span>
              <span className="font-extrabold text-[#0F172A] text-xs">
                {ticket.stake.toLocaleString('fr-FR')} F
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-600 text-[10px]">Gains:</span>
              <span className="font-black text-[#10B981] text-xs">
                {ticket.payout.toLocaleString('fr-FR')} F
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-600 text-[10px]">Statut:</span>
              <span className="font-black text-[#10B981] text-[11px]">
                Payé
              </span>
            </div>
          </div>

          {/* Matches List inside White Rounded Cards */}
          <div className="space-y-2 pt-1">
            {ticket.matches.map((m, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-2.5 shadow-xs border border-slate-100 space-y-1.5 text-[11px]"
              >
                {/* Competition row */}
                <div className="flex items-center justify-between text-[8px] text-slate-500 font-medium">
                  <div className="flex items-center gap-1 truncate max-w-[180px]">
                    <span className="shrink-0">⚽</span>
                    <span className="truncate">{m.competition}</span>
                  </div>
                  <span className="shrink-0">{m.time}</span>
                </div>

                {/* Match Teams and Scores */}
                <div className="flex items-center justify-between font-bold text-[#0F172A] text-[10px] py-0.5">
                  <span className="truncate max-w-[80px] text-right">{m.homeTeam}</span>
                  <div className="px-1.5 py-0.5 rounded bg-slate-100 text-[#0F172A] font-black text-xs tracking-wider shrink-0 mx-1">
                    {m.homeTeamScore}:{m.awayTeamScore}
                  </div>
                  <span className="truncate max-w-[80px] text-left">{m.awayTeam}</span>
                </div>

                {m.periodScores && (
                  <p className="text-center text-[8px] font-mono text-slate-400">
                    {m.periodScores}
                  </p>
                )}

                {/* Bet selection & Odds */}
                <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px]">
                  <span className="font-bold text-[#0F172A] truncate max-w-[160px]">
                    {m.betLabel}
                  </span>
                  <span className="font-mono font-bold text-[#0F172A]">{m.odds}</span>
                </div>

                {/* Gain status */}
                <div className="flex items-center justify-between text-[9px] text-slate-500">
                  <span>Statut:</span>
                  <span className="font-black text-[#10B981]">Gain</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= BOTTOM 1XBET APP TAB BAR ================= */}
        <div className="bg-white border-t border-slate-200/80 px-2 py-1 flex items-center justify-around text-[8px] font-medium text-slate-500 z-10">
          <div className="flex flex-col items-center gap-0.5 text-slate-600">
            <Flame className="w-3.5 h-3.5 text-blue-500" />
            <span>Populaire</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 text-slate-600">
            <Star className="w-3.5 h-3.5 text-blue-500" />
            <span>Favoris</span>
          </div>

          <div className="relative -top-1.5 flex flex-col items-center">
            <div className="relative w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-md">
              <Ticket className="w-4 h-4 rotate-[-20deg]" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[7px] font-black flex items-center justify-center">
                10
              </span>
            </div>
            <span className="text-[8px] font-bold text-slate-800 mt-0.5">Coupon</span>
          </div>

          <div className="flex flex-col items-center gap-0.5 text-slate-600">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>Historique</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 text-slate-600 relative">
            <Grid className="w-3.5 h-3.5 text-slate-600" />
            <span className="absolute top-0 right-0 w-1 h-1 rounded-full bg-emerald-500" />
            <span>Menu</span>
          </div>
        </div>

        {/* ================= DARK GRADIENT OVERLAY AT BOTTOM (MATCHING IMAGE.PNG) ================= */}
        {showBottomOverlay && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/90 to-transparent pt-14 pb-3.5 px-3 flex flex-col items-center justify-end text-center z-30 pointer-events-none">
            {/* ✓ PAYÉ Badge */}
            <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[#10B981] text-[10px] font-black tracking-wider uppercase mb-0.5">
              <span>✓</span>
              <span>PAYÉ</span>
            </div>

            {/* Payout amount */}
            <p className="text-lg sm:text-xl font-black text-[#10B981] font-mono tracking-tight leading-tight drop-shadow-md">
              {ticket.payout.toLocaleString('fr-FR')} F
            </p>

            {/* Subline: e.g. "1 événement · cote 2.510 · mise 500 000 F" */}
            <p className="text-[10px] text-slate-300 font-medium truncate max-w-full opacity-90 mt-0.5">
              {eventsCount} événement{eventsCount > 1 ? 's' : ''} · cote {ticket.totalOdds} · mise {ticket.stake.toLocaleString('fr-FR')} F
            </p>
          </div>
        )}
      </div>

      {/* Hover Overlay Hint */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center rounded-[38px] sm:rounded-[42px] pointer-events-none z-40">
        <span className="px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-[11px] shadow-xl">
          🔍 Agrandir le Coupon
        </span>
      </div>
    </div>
  );
};
