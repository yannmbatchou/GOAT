export type ProviderType = 'MTN' | 'ORANGE' | 'VISA';
export type Language = 'fr' | 'en';

export interface UserAccount {
  id: string;
  name: string;
  emailOrPhone: string;
  avatarUrl?: string;
  createdAt: number;
  purchasedApks: string[]; // IDs of purchased APKs
}

export interface ApkProduct {
  id: string;
  name: string;
  category: 'Jeu' | 'Bot' | 'App';
  version: string;
  size: string;
  priceFcfa: number;
  priceEur: number;
  rating: number;
  downloadsCount: number;
  description: string;
  features: string[];
  badge?: string;
  iconType: 'plane' | 'bot' | 'scanner' | 'crown';
  fileName: string;
}

export interface BetMatch {
  competition: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamScore: number;
  awayTeamScore: number;
  periodScores?: string;
  betLabel: string;
  odds: number;
  status: 'Gain' | 'En cours' | 'Perdu';
}

export interface BetTicket {
  id: string;
  imageNumber: number;
  slipNumber: string;
  dateBet: string;
  type: 'Simple' | 'Combiné';
  tag?: string;
  eventsCount?: number;
  eventsCompleted?: string;
  totalOdds: number;
  stake: number;
  payout: number;
  status: 'Payé';
  matches: BetMatch[];
}

export interface VipPlan {
  id: string;
  name: string;
  duration: string;
  priceFcfa: number;
  priceEur: number;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  color: string;
}

export interface PaymentTransaction {
  transactionId: string;
  provider: ProviderType;
  amount: number;
  planId: string;
  planName: string;
  phoneNumber?: string;
  senderName?: string;
  customerEmail?: string;
  recipientName: string;
  recipientNumber: string;
  ussdCode: string;
  status: 'INITIATED' | 'PENDING_USSD' | 'PROCESSING' | 'SUCCESS' | 'FAILED';
  createdAt: number;
  vipToken?: string;
  apkId?: string;
  receiptSentTo?: string;
  receiptSentMethod?: 'EMAIL' | 'SMS_WHATSAPP';
  receiptSentAt?: number;
}
