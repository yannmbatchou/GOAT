import React from 'react';
import { UserAccount, ApkProduct } from '../types';
import { APK_PRODUCTS } from '../data/apkData';
import { X, Download, FileText, CheckCircle2, ShieldCheck, Sparkles, Smartphone, ArrowDownToLine } from 'lucide-react';
import { useLanguage } from '../services/languageContext';

interface MyFilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onGoToMarketplace: () => void;
}

export const MyFilesModal: React.FC<MyFilesModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onGoToMarketplace,
}) => {
  const { lang } = useLanguage();
  if (!isOpen) return null;

  const purchasedList = APK_PRODUCTS.filter((apk) =>
    currentUser?.purchasedApks.includes(apk.id)
  );

  const handleDownloadFile = (apk: ApkProduct) => {
    // Generate simulated APK blob download
    const dummyContent = `GOAT392 APK Package: ${apk.name} ${apk.version}\nAuthor: GOAT392 Pronostics\nCertified Authentic`;
    const blob = new Blob([dummyContent], { type: 'application/vnd.android.package-archive' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = apk.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <ArrowDownToLine className="w-4 h-4" />
            <span>{lang === 'fr' ? 'Mes Fichiers & Téléchargements' : 'My Files & Downloads'}</span>
          </div>
          <h3 className="text-2xl font-black text-white">
            {lang === 'fr' ? 'Vos Applications & APKs GOAT392' : 'Your GOAT392 APKs & Applications'}
          </h3>
          <p className="text-xs text-slate-400">
            {lang === 'fr'
              ? 'Téléchargez directement les APKs débloqués sur votre appareil Android.'
              : 'Directly download unlocked APKs to your Android device.'}
          </p>
        </div>

        {purchasedList.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <Smartphone className="w-12 h-12 text-slate-600 mx-auto" />
            <p className="text-sm text-slate-300 font-bold">
              {lang === 'fr' ? 'Vous n\'avez pas encore acheté d\'APK.' : 'You have not purchased any APK yet.'}
            </p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {lang === 'fr'
                ? 'Rendez-vous dans la Boutique APK & Jeux GOAT pour obtenir le bot Aviator ou nos applications automatisées.'
                : 'Visit the APK Store & GOAT Games to get the Aviator bot or our automated applications.'}
            </p>
            <button
              onClick={() => {
                onClose();
                onGoToMarketplace();
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition"
            >
              {lang === 'fr' ? 'Explorer la Boutique APK' : 'Explore APK Store'}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {purchasedList.map((apk) => (
              <div
                key={apk.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-sm">{apk.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      {apk.version}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Taille : {apk.size} • Fichier : <strong className="text-slate-300 font-mono">{apk.fileName}</strong>
                  </p>
                </div>

                <button
                  onClick={() => handleDownloadFile(apk)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{lang === 'fr' ? 'Télécharger APK' : 'Download APK'}</span>
                </button>
              </div>
            ))}

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-300 space-y-1">
              <p className="font-bold text-amber-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                {lang === 'fr' ? 'Guide d\'installation sur Android :' : 'Android installation guide:'}
              </p>
              <p className="text-[11px] text-slate-400">
                1. Ouvrez le fichier .apk téléchargé sur votre smartphone.
                <br />
                2. Si Android le demande, autorisez « Sources inconnues » dans Paramètres → Sécurité.
                <br />
                3. Lancez l'application et connectez-vous avec vos identifiants GOAT392.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
