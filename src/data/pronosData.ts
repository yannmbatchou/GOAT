export interface DailyProno {
  id: string;
  isFree: boolean;
  competition: string;
  match: string;
  teams: {
    home: string;
    away: string;
    homeLogo?: string;
    awayLogo?: string;
  };
  dateTime: string;
  betType: string;
  selection: string;
  odds: number;
  confidence: number; // e.g. 96
  bankrollAdvice: string; // e.g. "Mise conseillée : 5% du capital"
  analysis: string;
  vipTag?: string;
  code1xBet?: string;
}

export const DAILY_PRONOS: DailyProno[] = [
  {
    id: 'prono-free-1',
    isFree: true,
    competition: 'Ligue des Champions UEFA',
    match: 'Real Madrid vs Bayern Munich',
    teams: {
      home: 'Real Madrid',
      away: 'Bayern Munich',
    },
    dateTime: 'Aujourd\'hui • 21:00 GMT+1',
    betType: 'Double Chance & Total Buts',
    selection: 'Real Madrid ou Nul & Plus de 1.5 Buts',
    odds: 1.68,
    confidence: 94,
    bankrollAdvice: 'Mise recommandée : 5% du capital',
    analysis:
      'Le Real Madrid reste invaincu à domicile sur ses 18 dernières confrontations européennes avec une moyenne de 2.4 buts inscrits par rencontre. Face à une défense bavaroise friable en transition rapide, les Madrilènes ont tous les voyants au vert pour sécuriser ce pronostic.',
    vipTag: 'CADEAU DU JOUR GRATUIT',
    code1xBet: 'GM392F',
  },
  {
    id: 'prono-vip-1',
    isFree: false,
    competition: 'Premier League Anglaise',
    match: 'Arsenal vs Manchester City',
    teams: {
      home: 'Arsenal',
      away: 'Manchester City',
    },
    dateTime: 'Aujourd\'hui • 17:30 GMT+1',
    betType: 'Spécial Buteurs & Corners VIP',
    selection: 'Les 2 Équipes Marquent & Plus de 8.5 Corners',
    odds: 2.25,
    confidence: 97,
    bankrollAdvice: 'Mise recommandée : 8% du capital (Safe Gold)',
    analysis:
      'Choc au sommet décisif pour le titre. Le xG combiné des deux équipes dépasse 3.8 par match. Les statistiques de centres et de pression haute garantissent une avalanche d’occasions franches des deux côtés.',
    vipTag: 'COMBINÉ GOLD VIP',
    code1xBet: 'VIP99G',
  },
  {
    id: 'prono-vip-2',
    isFree: false,
    competition: 'Ligue 1 & Serie A Combiné',
    match: 'PSG vs Marseille & Juventus vs Napoli',
    teams: {
      home: 'Paris SG / Juventus',
      away: 'OM / Napoli',
    },
    dateTime: 'Ce Soir • 20:45 GMT+1',
    betType: 'Combiné Safe Sécurisé x2',
    selection: 'PSG Victoire & Juventus ou Nul',
    odds: 2.65,
    confidence: 96,
    bankrollAdvice: 'Mise recommandée : 7% du capital',
    analysis:
      'Pack combiné calculé par nos algorithmes statistiques. Les cotes réelles estimées sont inférieures à celles proposées par les bookmakers, ce qui en fait une pure value bet.',
    vipTag: 'MONTANTE PALIER 3',
    code1xBet: 'MT392V',
  },
  {
    id: 'prono-vip-3',
    isFree: false,
    competition: 'UEFA Nations League & Qualif',
    match: 'Espagne vs France',
    teams: {
      home: 'Espagne',
      away: 'France',
    },
    dateTime: 'Demain • 20:45 GMT+1',
    betType: 'Score Exact Multichoix VIP',
    selection: 'Victoire Espagne 2-1 ou 3-1',
    odds: 5.40,
    confidence: 88,
    bankrollAdvice: 'Mise recommandée : 2.5% du capital (Gros Gains)',
    analysis:
      'Cote jackpot réservée aux membres VIP pour booster considérablement la bankroll du week-end.',
    vipTag: 'FUN COTES ÉLEVÉES',
    code1xBet: 'JACKPOT392',
  },
];
