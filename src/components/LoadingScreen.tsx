"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleTap = () => {
    setIsVisible(false);
  };

  const initials = `${weddingConfig.brideNameShort} & ${weddingConfig.groomNameShort}`;

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          onClick={handleTap}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDFBF7] px-6 text-center cursor-pointer select-none"
        >
          {/* Top Kasavu Border */}
          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#C5A059] via-[#FFF4D4] to-[#B28F46] border-b border-[#8C6E2D]/40" />

          {/* Relative Wrapper for Card and Blooming Petals Wreath */}
          <div className="relative flex items-center justify-center">
            
            {/* Blooming Golden Flower Petals around the circle (Behind the Card) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              {[...Array(12)].map((_, i) => {
                const angle = i * 30; // 12 petals spaced at 30 degrees
                return (
                  <div
                    key={i}
                    className="blooming-petal"
                    style={{ "--angle": `${angle}deg` } as React.CSSProperties}
                  >
                    <motion.svg
                      viewBox="0 0 60 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: 1.05, 
                        opacity: 0.95,
                        transition: {
                          type: "spring",
                          stiffness: 70,
                          damping: 14,
                          delay: 0.15 + i * 0.06, // circular staggered bloom ripple
                        }
                      }}
                      className="w-[40px] h-[65px] sm:w-[52px] sm:h-[85px] text-[#C5A059]/35"
                      style={{
                        transformOrigin: "center bottom",
                      }}
                    >
                      {/* Petal Silhouette */}
                      <path
                        d="M30 100 C10 75 0 45 30 5 C60 45 50 75 30 100Z"
                        fill="url(#petalGrad)"
                        stroke="rgba(197, 160, 89, 0.45)"
                        strokeWidth="1.2"
                      />
                      <defs>
                        <linearGradient id="petalGrad" x1="30" y1="100" x2="30" y2="5" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#B28F46" stopOpacity="0.35" />
                          <stop offset="50%" stopColor="#C5A059" stopOpacity="0.75" />
                          <stop offset="100%" stopColor="#FFF4D4" stopOpacity="0.95" />
                        </linearGradient>
                      </defs>
                    </motion.svg>
                  </div>
                );
              })}
            </div>

            {/* Central Ornament Card */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{
                scale: [0.95, 1, 0.95],
                opacity: 1,
                boxShadow: [
                  "0 4px 20px rgba(197, 160, 89, 0.04)",
                  "0 4px 30px rgba(197, 160, 89, 0.12)",
                  "0 4px 20px rgba(197, 160, 89, 0.04)"
                ]
              }}
              transition={{
                scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                boxShadow: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                opacity: { duration: 0.8, ease: "easeOut" }
              }}
              className="flex flex-col items-center justify-center p-8 bg-white/50 backdrop-blur-md rounded-full border border-[#C5A059]/20 w-[310px] h-[310px] sm:w-[370px] sm:h-[370px] relative shadow-xl z-10"
            >
            {/* Outer Dotted Ring: Spinning Clockwise */}
            <div className="absolute inset-2 border-2 border-dashed border-[#C5A059]/35 rounded-full animate-[spin_35s_linear_infinite]" />

            {/* Inner Ring: Spinning Counter-Clockwise */}
            <div className="absolute inset-4 border border-dotted border-[#C5A059]/55 rounded-full animate-[spin_20s_linear_infinite_reverse]" />

            {/* Solid Double Ring */}
            <div className="absolute inset-5 border-2 border-double border-[#C5A059]/40 rounded-full" />

            {/* Orbiting Golden Lotus Flower Garland around the circle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-[spin_40s_linear_infinite]">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
                <div
                  key={angle}
                  className={`orbiting-flower orbiting-flower-${angle}`}
                >
                  <svg
                    width="26"
                    height="20"
                    viewBox="0 0 32 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#C5A059] animate-flower-bloom drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
                    style={{
                      animationDelay: `${index * 0.375}s`,
                    }}
                  >
                    <path
                      d="M16 2C16 2 13 8 9 9C12 11 14 13 16 19C18 13 20 11 23 9C19 8 16 2 16 2Z"
                      fill="currentColor"
                    />
                    <path
                      d="M16 8C16 8 11 11 6 12C9 13 11 15 13 19C14 15 15 13 16 8Z"
                      fill="currentColor"
                      opacity="0.85"
                    />
                    <path
                      d="M16 8C16 8 21 11 26 12C23 13 21 15 19 19C18 15 17 13 16 8Z"
                      fill="currentColor"
                      opacity="0.85"
                    />
                  </svg>
                </div>
              ))}
            </div>

            {/* Animated Lord Ganesha Image (Enlarged for Ganesha silhouette detail) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2.8,
                ease: "easeInOut"
              }}
              className="mb-2 relative w-[130px] h-[160px] sm:w-[150px] sm:h-[185px]"
            >
              <Image
                src="/images/lord_ganesha.png"
                alt="Lord Ganesha"
                fill
                className="object-contain ganesha-gold"
                priority
              />
            </motion.div>

            {/* Initials */}
            <motion.h1
              initial={{ letterSpacing: "0.25em", opacity: 0 }}
              animate={{ letterSpacing: "0.08em", opacity: 1, transition: { delay: 0.4, duration: 0.8 } }}
              className="font-serif text-4.5xl sm:text-5.5xl font-extrabold text-[#1E3F20] tracking-wide leading-none"
            >
              {initials}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.8, duration: 0.5 } }}
              className="mt-2.5 text-xs sm:text-sm font-extrabold tracking-widest text-[#C5A059] uppercase"
            >
              Keerthana & Sreerag
            </motion.p>
          </motion.div>
        </div>

        {/* Tap to Open Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.7, 1.0, 0.7] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute bottom-16 text-[#1E3F20] text-xs sm:text-sm font-black uppercase tracking-[0.25em]"
        >
          Open Invitation • തുറക്കുക
        </motion.div>

          {/* Bottom Kasavu Border */}
          <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-[#B28F46] via-[#FFF4D4] to-[#C5A059] border-t border-[#8C6E2D]/40" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default LoadingScreen;
