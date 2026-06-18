import React from "react";

/**
 * Traditional Kerala Kasavu Border.
 * Typically features a broad gold stripe flanked by thin gold/red/green threads.
 */
export const KasavuBorder: React.FC<{
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}> = ({ position = "top", className = "" }) => {
  const borderStyle =
    position === "top"
      ? "border-t-[6px] border-b-[2px] border-t-[#C5A059] border-b-[#C5A059]/40 border-double py-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/10 to-transparent"
      : position === "bottom"
      ? "border-b-[6px] border-t-[2px] border-b-[#C5A059] border-t-[#C5A059]/40 border-double py-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/10 to-transparent"
      : position === "left"
      ? "border-l-[6px] border-r-[2px] border-l-[#C5A059] border-r-[#C5A059]/40 border-double px-[1px] bg-gradient-to-b from-transparent via-[#C5A059]/10 to-transparent"
      : "border-r-[6px] border-l-[2px] border-r-[#C5A059] border-l-[#C5A059]/40 border-double px-[1px] bg-gradient-to-b from-transparent via-[#C5A059]/10 to-transparent";

  return <div className={`w-full ${borderStyle} pointer-events-none ${className}`} />;
};

/**
 * Detailed SVG of the traditional Kerala Brass Lamp (Nilavilakku)
 */
export const Nilavilakku: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 120, height = 240, className = "" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Flame Glow */}
      <circle cx="50" cy="22" r="12" fill="url(#flameGlow)" opacity="0.6" />

      {/* Flame */}
      <path
        d="M50 10C53 17 56 22 50 28C44 22 47 17 50 10Z"
        fill="url(#flameGrad)"
        filter="drop-shadow(0px 0px 4px rgba(251, 146, 60, 0.8))"
      >
        <animate
          attributeName="d"
          values="M50 10C53 17 56 22 50 28C44 22 47 17 50 10Z;
                  M50 8C54 16 55 21 50 28C45 21 46 16 50 8Z;
                  M50 10C52 18 57 23 50 28C43 23 48 18 50 10Z"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>

      {/* Flame Wick Base */}
      <rect x="49" y="25" width="2" height="4" fill="#331A00" />

      {/* Top Wick Bowl */}
      <path
        d="M30 30C30 30 35 48 50 48C65 48 70 30 70 30C70 30 65 34 50 34C35 34 30 30 30 30Z"
        fill="url(#goldGrad)"
        stroke="#8C6E2D"
        strokeWidth="0.5"
      />
      <ellipse cx="50" cy="30" rx="20" ry="2" fill="#5C4515" />

      {/* Upper Pillar Connector */}
      <path d="M46 32H54V42H46V32Z" fill="url(#goldGrad)" />
      <circle cx="50" cy="42" r="6" fill="url(#goldGrad)" stroke="#8C6E2D" strokeWidth="0.5" />

      {/* Central Pillar (Stem) */}
      <path
        d="M47 42 C 48 70, 48 110, 45 150 L 55 150 C 52 110, 52 70, 53 42 Z"
        fill="url(#goldGrad)"
        stroke="#8C6E2D"
        strokeWidth="0.5"
      />

      {/* Ring details on stem */}
      <ellipse cx="50" cy="75" rx="5" ry="1.5" fill="url(#goldDarkGrad)" />
      <ellipse cx="50" cy="115" rx="5.5" ry="1.5" fill="url(#goldDarkGrad)" />

      {/* Lower Pillar Connector */}
      <circle cx="50" cy="150" r="8" fill="url(#goldGrad)" stroke="#8C6E2D" strokeWidth="0.5" />

      {/* Bottom Oil Bowl / Tray */}
      <path
        d="M20 160C20 160 25 178 50 178C75 178 80 160 80 160C80 160 72 165 50 165C28 165 20 160 20 160Z"
        fill="url(#goldGrad)"
        stroke="#8C6E2D"
        strokeWidth="0.5"
      />
      <ellipse cx="50" cy="160" rx="30" ry="3" fill="#5C4515" />

      {/* Base Pedestal */}
      <path
        d="M38 174 L62 174 L66 195 L34 195 Z"
        fill="url(#goldGrad)"
        stroke="#8C6E2D"
        strokeWidth="0.5"
      />
      <ellipse cx="50" cy="195" rx="18" ry="3" fill="url(#goldDarkGrad)" />

      {/* Under Base shadow */}
      <ellipse cx="50" cy="197" rx="20" ry="3" fill="#1A1005" opacity="0.3" />

      <defs>
        <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="flameGrad" x1="50" y1="10" x2="50" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#FBBF24" />
          <stop offset="70%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="20" y1="100" x2="80" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C5A059" />
          <stop offset="30%" stopColor="#EADBBF" />
          <stop offset="50%" stopColor="#FFF4D4" />
          <stop offset="70%" stopColor="#EADBBF" />
          <stop offset="100%" stopColor="#B28F46" />
        </linearGradient>
        <linearGradient id="goldDarkGrad" x1="20" y1="100" x2="80" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8C6E2D" />
          <stop offset="50%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#70551F" />
        </linearGradient>
      </defs>
    </svg>
  );
};

/**
 * Decorative divider with a golden lotus flower design in the center
 */
export const LotusDivider: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center w-full gap-4 ${className}`}>
      <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-[#C5A059]/60" />
      <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#C5A059]">
        {/* Lotus SVG */}
        <path
          d="M16 2C16 2 13 8 9 9C12 11 14 13 16 19C18 13 20 11 23 9C19 8 16 2 16 2Z"
          fill="currentColor"
        />
        <path
          d="M16 8C16 8 11 11 6 12C9 13 11 15 13 19C14 15 15 13 16 8Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M16 8C16 8 21 11 26 12C23 13 21 15 19 19C18 15 17 13 16 8Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M16 14C16 14 10 16 4 18C7 18.5 9 19.5 10 22C11.5 19.5 13.5 18.5 16 14Z"
          fill="currentColor"
          opacity="0.6"
        />
        <path
          d="M16 14C16 14 22 16 28 18C25 18.5 23 19.5 22 22C20.5 19.5 18.5 18.5 16 14Z"
          fill="currentColor"
          opacity="0.6"
        />
      </svg>
      <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-[#C5A059]/60" />
    </div>
  );
};

/**
 * Hanging Jasmine Garland (Mulla Poo) decoration
 */
export const JasmineGarland: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex justify-around w-full pointer-events-none select-none ${className}`}>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center animate-pulse"
          style={{
            animationDelay: `${i * 0.3}s`,
            animationDuration: "3s",
            height: `${50 + (i % 3) * 15}px`,
          }}
        >
          {/* Thread line */}
          <div className="w-[1px] bg-[#C5A059]/60 flex-grow" />

          {/* Dangling Jasmine Buds */}
          {[...Array(3 + (i % 2))].map((_, j) => (
            <div key={j} className="relative -mt-1">
              {/* Petals */}
              <div className="w-3 h-4 bg-white border border-[#C5A059]/30 rounded-full shadow-sm flex items-center justify-center">
                {/* Yellow/Green base */}
                <div className="w-1 h-2 bg-[#EADBBF] rounded-full absolute bottom-0" />
              </div>
            </div>
          ))}
          {/* Orange marigold flower at the tip */}
          <div className="w-4 h-4 -mt-1 bg-amber-500 rounded-full border border-amber-600 shadow-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Elegant Golden Festival Elephant (Gajam) motif
 */
export const KeralaElephant: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 60, height = 60, className = "" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Decorative Golden Nettipattam (Head Ornament) */}
      <path
        d="M30 20 L70 20 L65 40 C65 40, 50 50, 35 40 Z"
        fill="url(#goldGrad)"
        stroke="#8C6E2D"
        strokeWidth="1"
      />
      {/* Nettipattam details - small dots */}
      <circle cx="50" cy="25" r="2" fill="#B91C1C" />
      <circle cx="43" cy="27" r="1.5" fill="#3F6212" />
      <circle cx="57" cy="27" r="1.5" fill="#3F6212" />
      <circle cx="50" cy="33" r="2.5" fill="#B91C1C" />
      <circle cx="40" cy="35" r="1.5" fill="#B28F46" />
      <circle cx="60" cy="35" r="1.5" fill="#B28F46" />
      <circle cx="50" cy="42" r="3" fill="#B91C1C" />

      {/* Elephant Body Contour */}
      <path
        d="M20 50 
           C 20 40, 30 30, 45 30 
           C 60 30, 75 35, 78 45
           C 80 50, 78 60, 72 65
           C 74 72, 75 80, 75 85
           L 68 85
           C 68 80, 67 72, 65 68
           C 60 70, 55 70, 50 70
           C 40 70, 30 75, 28 85
           L 22 85
           C 22 80, 24 70, 26 65
           C 22 62, 20 56, 20 50 Z"
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth="2"
      />

      {/* Elegant Tusks */}
      <path
        d="M32 55 C22 55, 14 48, 10 38 C12 45, 22 51, 32 51 Z"
        fill="#FDFBF7"
        stroke="#E2E8F0"
        strokeWidth="0.5"
      />
      <path
        d="M68 55 C78 55, 86 48, 90 38 C88 45, 78 51, 68 51 Z"
        fill="#FDFBF7"
        stroke="#E2E8F0"
        strokeWidth="0.5"
      />

      {/* Decorative Umbrella (Muthukkuda) outline behind */}
      <path
        d="M25 15 C 25 5, 75 5, 75 15 Z"
        fill="url(#goldDarkGrad)"
        stroke="#8C6E2D"
        strokeWidth="1"
        opacity="0.8"
      />
      <line x1="50" y1="5" x2="50" y2="20" stroke="#8C6E2D" strokeWidth="2" />

      <defs>
        <linearGradient id="goldGrad" x1="0" y1="50" x2="100" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C5A059" />
          <stop offset="50%" stopColor="#FFF4D4" />
          <stop offset="100%" stopColor="#B28F46" />
        </linearGradient>
        <linearGradient id="goldDarkGrad" x1="0" y1="50" x2="100" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8C6E2D" />
          <stop offset="100%" stopColor="#C5A059" />
        </linearGradient>
      </defs>
    </svg>
  );
};
