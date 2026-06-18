"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { AnimatedPhotoCard } from "./AnimatedPhotoCard";

export const PhotoGallery: React.FC = () => {
  const [index, setIndex] = useState<number | null>(null);
  const photos = weddingConfig.photoUrls;
  const lightboxPhotos = photos.slice(1); // Exclude the animated card from lightbox

  const openLightbox = (i: number) => {
    setIndex(i - 1); // map grid index (1 or 2) to lightbox index (0 or 1)
  };

  const closeLightbox = () => {
    setIndex(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (index === null) return;
    setIndex((index + 1) % lightboxPhotos.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (index === null) return;
    setIndex((index - 1 + lightboxPhotos.length) % lightboxPhotos.length);
  };

  return (
    <div className="w-full max-w-lg mx-auto py-6">
      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        {photos.map((url, i) => {
          if (i === 0) {
            return (
              <div
                key={i}
                className="relative col-span-2 max-w-[260px] sm:max-w-[300px] w-full mx-auto"
              >
                {/* Floating Hearts floating around/outside the card */}
                <div className="absolute -inset-x-12 -inset-y-8 pointer-events-none overflow-visible z-25">
                  {[...Array(18)].map((_, idx) => {
                    const size = 10 + (idx % 4) * 4; // sizes 10px to 22px
                    const isLeft = idx % 2 === 0;
                    // Position left or right relative to the card container with a nice spread
                    const offset = (idx % 6) * 4.5;
                    const startX = isLeft 
                      ? -8 - offset 
                      : 98 + offset;
                    
                    // Use negative delays for half the hearts so they start already floating mid-way
                    const duration = 9.0 + (idx % 4) * 2.0;
                    const delay = isLeft
                      ? -((idx / 2) * 1.5) // Starts mid-flight (pre-distributed on mount)
                      : (idx * 0.4); // Staggered spawn from the bottom
                    
                    return (
                      <motion.svg
                        key={idx}
                        viewBox="0 0 24 24"
                        fill="#E11D48" // Rose-red
                        stroke="#FFFFFF" // White outline for high contrast on light backgrounds
                        strokeWidth="1.5"
                        className="absolute"
                        style={{
                          width: size,
                          height: size,
                          left: `${startX}%`,
                          bottom: "-5%",
                        }}
                        initial={{ y: 0, opacity: 0, scale: 0.6 }}
                        animate={{
                          y: -1200, // floats all the way up to the top of the page
                          opacity: [0, 0.9, 0.9, 0], // fades out near the top
                          scale: [0.6, 1.15, 0.9, 0.5],
                          x: isLeft ? [0, 25, -25, 0] : [0, -25, 25, 0], // wider sway pattern
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

                {/* Slideshow Card with rounded borders and overflow-hidden */}
                <div className="relative overflow-hidden rounded-xl border border-[#C5A059]/30 aspect-[3/4] w-full shadow-md z-10">
                  <AnimatedPhotoCard />
                </div>
              </div>
            );
          }

          return (
            <div
              key={i}
              className="relative overflow-hidden rounded-xl border border-[#C5A059]/30 aspect-square cursor-pointer shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-[#C5A059]/10"
              onClick={() => openLightbox(i)}
            >
              <Image
                src={url}
                alt={`Wedding moment ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#1E3F20]/10 hover:bg-[#1E3F20]/0 transition-colors duration-200" />
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white hover:text-[#C5A059] transition-colors duration-200 p-2 z-55"
              aria-label="Close image"
            >
              <X size={28} />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 text-white hover:text-[#C5A059] transition-colors duration-200 p-2 bg-white/10 rounded-full backdrop-blur-sm z-55"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-3xl aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxPhotos[index]}
                alt={`Wedding moment expanded`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 text-white hover:text-[#C5A059] transition-colors duration-200 p-2 bg-white/10 rounded-full backdrop-blur-sm z-55"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default PhotoGallery;
