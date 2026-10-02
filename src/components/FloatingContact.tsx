import React from 'react';
import { PAYMENT_CONFIG } from '../data/plansData';
import { MessageSquare, Send, Zap, PhoneCall } from 'lucide-react';

interface FloatingContactProps {
  onOpenPaymentModal: () => void;
}

export const FloatingContact: React.FC<FloatingContactProps> = ({ onOpenPaymentModal }) => {
  return (
    <aside aria-label="Assistance et accès rapide" className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* WhatsApp Button */}
      <a
        href={PAYMENT_CONFIG.support.whatsappUrl1}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xl shadow-emerald-600/30 transition transform hover:scale-105"
        title="Discuter sur WhatsApp"
      >
        <PhoneCall className="w-4 h-4 fill-white" />
        <span className="hidden sm:inline">WhatsApp VIP</span>
      </a>

      {/* Telegram Button */}
      <a
        href={PAYMENT_CONFIG.support.telegramVipChannel}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-xl shadow-sky-500/30 transition transform hover:scale-105"
        title="Canal Telegram Officiel"
      >
        <Send className="w-4 h-4 fill-white" />
        <span className="hidden sm:inline">Telegram VIP</span>
      </a>

      {/* Floating Instant VIP Unlocker for Mobile */}
      <button
        onClick={onOpenPaymentModal}
        className="sm:hidden flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs shadow-2xl shadow-amber-500/40 animate-pulse"
      >
        <Zap className="w-4 h-4 fill-slate-950" />
        <span>REJOINDRE LE VIP</span>
      </button>
    </aside>
  );
};
