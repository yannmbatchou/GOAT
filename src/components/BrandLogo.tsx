import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { img: 'w-9 h-9', title: 'text-base', sub: 'text-[9px]' },
    md: { img: 'w-12 h-12', title: 'text-xl', sub: 'text-[10px]' },
    lg: { img: 'w-20 h-20', title: 'text-2xl', sub: 'text-xs' },
    xl: { img: 'w-32 h-32', title: 'text-4xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 3D Shield Badge with Logo */}
      <div className={`relative ${currentSize.img} shrink-0 group`}>
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600 opacity-60 blur-sm group-hover:opacity-100 transition duration-300" />
        <div className="relative w-full h-full rounded-xl overflow-hidden border border-amber-400/40 bg-black/80 shadow-2xl flex items-center justify-center p-0.5">
          <img
            src="/src/assets/images/goat392_logo_1790849672150.jpg"
            alt="GOAT392 PRONOSTICS Logo"
            className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(234,179,8,0.4)]"
            onError={(e) => {
              // Fallback to high quality SVG if image not yet loaded
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 ${currentSize.title}`}>
              GOAT392
            </span>
            <span className={`font-black tracking-widest text-white uppercase ${currentSize.title}`}>
              PRONOS
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              VIP
            </span>
          </div>
          <span className={`font-medium tracking-wide text-amber-400/80 uppercase ${currentSize.sub}`}>
            L'Excellence du Pari Sportif
          </span>
        </div>
      )}
    </div>
  );
};
