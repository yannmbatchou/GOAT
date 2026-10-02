import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    nav_home: 'Accueil',
    nav_daily_coupon: 'Coupon du jour',
    nav_winning_pronos: 'Pronos gagnants',
    nav_subscriptions: 'Abonnements',
    nav_marketplace: 'Marketplace',
    nav_bookmakers: 'Bookmakers',
    nav_contact: 'Contact',
    login: 'Connexion',
    register: 'Inscription',
    my_account: 'Mon Compte',
    my_files: 'Mes fichiers',
    logout: 'Déconnexion',
    slogan: "Ne pariez plus au hasard, misez sur l'expertise",
    hero_title_sub: "L'Excellence du Pari Sportif",
    tickets_title: 'Derniers pronostics gagnants',
    tickets_sub: 'Coupons gagnés',
    marketplace_title: 'Boutique APK & Jeux GOAT',
    marketplace_slogan: 'Paie en ligne → télécharge tes APK tout de suite dans Mes fichiers.',
    must_login_to_buy: 'Veuillez vous connecter pour acheter et télécharger cet APK.',
    bookmakers_title: 'Inscriptions Bookmakers',
    promo_code: 'Code Promo',
  },
  en: {
    nav_home: 'Home',
    nav_daily_coupon: 'Daily Coupon',
    nav_winning_pronos: 'Winning Tips',
    nav_subscriptions: 'Subscriptions',
    nav_marketplace: 'Marketplace',
    nav_bookmakers: 'Bookmakers',
    nav_contact: 'Contact',
    login: 'Login',
    register: 'Register',
    my_account: 'My Account',
    my_files: 'My Files',
    logout: 'Logout',
    slogan: 'Stop betting randomly, bet on expertise',
    hero_title_sub: 'Excellence in Sports Betting',
    tickets_title: 'Latest Winning Tips',
    tickets_sub: 'Winning Coupons',
    marketplace_title: 'APK Store & GOAT Games',
    marketplace_slogan: 'Pay online → download your APKs instantly in My Files.',
    must_login_to_buy: 'Please log in to purchase and download this APK.',
    bookmakers_title: 'Bookmakers Registration',
    promo_code: 'Promo Code',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'fr',
  setLang: () => {},
  t: (k) => k,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('fr');

  useEffect(() => {
    const saved = localStorage.getItem('goat392_lang') as Language;
    if (saved === 'fr' || saved === 'en') {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('goat392_lang', newLang);
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations.fr[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
