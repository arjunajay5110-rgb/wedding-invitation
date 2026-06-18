"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const AnimatedPhotoCard: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Step Durations:
    // Step 0 (Intro): 3.0 seconds
    // Steps 1-5 (Slides): 2.2 seconds each
    const stepDurations = [3000, 2200, 2200, 2200, 2200, 2200];

    const timer = setTimeout(() => {
      setStep((prev) => (prev + 1) % 6);
    }, stepDurations[step]);

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#FDFBF7] flex items-center justify-center overflow-hidden">
      {/* Floating Hearts Animation Overlay (Runs continuously over all slides) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {[...Array(4)].map((_, i) => {
          const size = 11 + (i % 3) * 4; // sizes 11px to 19px
          const startX = 15 + (i * 23); // spread across the card
          const delay = i * 0.95;
          const duration = 4.5 + (i % 2) * 1.2; // 4.5s to 5.7s
          
          return (
            <motion.svg
              key={i}
              viewBox="0 0 24 24"
              fill="#E11D48" // Rose-red
              stroke="#FFFFFF" // White outline for visibility
              strokeWidth="1.5"
              className="absolute"
              style={{
                width: size,
                height: size,
                left: `${startX}%`,
                bottom: "-10%",
              }}
              initial={{ y: 0, opacity: 0, scale: 0.6 }}
              animate={{
                y: -400, // float all the way up past the top of the card
                opacity: [0, 0.85, 0.85, 0], // fade in, stay visible, fade out near top
                scale: [0.6, 1.15, 0.9, 0.65],
                x: [0, 12, -12, 0], // sway left and right as they float up
              }}
              transition={{
                repeat: Infinity,
                duration: duration,
                delay: delay,
                ease: "linear",
              }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </motion.svg>
          );
        })}
      </div>

      {/* Step 0: Intro */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: step === 0 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          pointerEvents: step === 0 ? "auto" : "none",
          zIndex: step === 0 ? 10 : 0,
        }}
      >
        {/* Elegant double-border frame background */}
        <div className="absolute inset-3 border border-double border-[#C5A059]/25 rounded-xl pointer-events-none" />

        {/* Intro text */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={step === 0 ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-serif text-[#1E3F20] text-sm sm:text-base italic font-semibold leading-relaxed max-w-xs px-4 z-10"
        >
          "Miles Apart,<br />Yet Connected by Destiny"
        </motion.p>

        {/* Center pulsing love accent */}
        <motion.svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4.5 h-4.5 text-[#C5A059] mt-3.5 z-10"
          initial={{ scale: 1 }}
          animate={step === 0 ? { scale: [1, 1.25, 1] } : { scale: 1 }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut", delay: 0.5 }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </motion.svg>
      </motion.div>

      {/* Steps 1-5: Slides */}
      {[1, 2, 3, 4, 5].map((s) => (
        <motion.div
          key={s}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: step === s ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            pointerEvents: step === s ? "auto" : "none",
            zIndex: step === s ? 10 : 0,
          }}
        >
          <Image
            src={`/images/slide_${s}.jpg`}
            alt={`Wedding moment ${s}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
            priority={s === 1}
          />
        </motion.div>
      ))}
    </div>
  );
};
export default AnimatedPhotoCard;
