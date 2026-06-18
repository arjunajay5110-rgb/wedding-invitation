"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

interface MusicPlayerProps {
  showControls?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ showControls = true }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const toggleMute = (e?: React.MouseEvent) => {
    if (!audioRef.current) return;
    e?.stopPropagation(); // Prevent triggering window interaction listener
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);

    // If they manually unmute and it was blocked/paused, start it
    if (!newMuted) {
      setHasStarted(true);
      if (audioRef.current.paused) {
        if (audioRef.current.currentTime < 4.0 || audioRef.current.currentTime >= 33.0) {
          audioRef.current.currentTime = 4.0;
        }
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => console.warn("Play failed during unmute:", err));
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
 
    const handleLoadedMetadata = () => {
      if (audio.currentTime < 4.0) {
        audio.currentTime = 4.0;
      }
    };

    const handleTimeUpdate = () => {
      // Loop between 4.0s and 33.0s
      if (audio.currentTime >= 33.0) {
        audio.currentTime = 4.0;
      }

      // Progress percentage relative to 29-second clip
      const clipDuration = 29.0;
      const relativeTime = audio.currentTime - 4.0;
      const percentage = Math.max(0, Math.min(100, (relativeTime / clipDuration) * 100));
      setProgress(percentage);
    };

    const handleAudioEnded = () => {
      audio.currentTime = 4.0;
      audio.play().catch((err) => console.warn("Loop replay failed:", err));
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleAudioEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleAudioEnded);
    };
  }, []);

  // Autoplay and volume control
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || hasStarted) return;

    // Set default volume to a lower, comfortable level (10%)
    audio.volume = 0.10;

    const attemptPlay = () => {
      if (hasStarted) return;

      if (audio.currentTime < 4.0 || audio.currentTime >= 33.0) {
        audio.currentTime = 4.0;
      }

      // Try playing unmuted first
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
          cleanupListeners();
        })
        .catch((err) => {
          console.log("Autoplay unmuted blocked, falling back to muted autoplay:", err);
          // Play muted to bypass browser block
          audio.muted = true;
          setIsMuted(true);
          audio.play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((mutedErr) => {
              console.log("Muted autoplay blocked by browser policy:", mutedErr);
            });
        });
    };

    const handleInteraction = () => {
      if (hasStarted) return;

      // User gesture detected: unmute and play
      audio.muted = false;
      setIsMuted(false);

      if (audio.paused) {
        if (audio.currentTime < 4.0 || audio.currentTime >= 33.0) {
          audio.currentTime = 4.0;
        }
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setHasStarted(true);
            cleanupListeners();
          })
          .catch((err) => console.warn("Play on interaction failed:", err));
      } else {
        setIsPlaying(true);
        setHasStarted(true);
        cleanupListeners();
      }
    };

    const cleanupListeners = () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("wheel", handleInteraction);
    };

    // Attempt immediate play
    attemptPlay();

    // Listen for any form of user gesture to unmute/trigger play
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("pointerdown", handleInteraction);
    window.addEventListener("scroll", handleInteraction);
    window.addEventListener("wheel", handleInteraction);

    return () => {
      cleanupListeners();
    };
  }, [hasStarted]);

  return (
    <div className={`fixed inset-x-0 bottom-0 pointer-events-none z-40 flex justify-center transition-opacity duration-500 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="w-full max-w-lg relative h-[72px] pointer-events-none">
        <div className="absolute bottom-16 right-6 sm:bottom-6 sm:right-6 pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md border border-[#C5A059]/40 rounded-full py-2 px-3 shadow-lg shadow-[#1E3F20]/10 transition-all duration-300 hover:scale-105">
          <audio
            ref={audioRef}
            src={weddingConfig.musicUrl}
            loop
            preload="auto"
          />

          {/* Visualizer bars */}
          {(isPlaying && !isMuted) && (
            <div className="flex items-end gap-[2px] h-3 px-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-[2px] bg-[#C5A059] rounded-full animate-[bounce_1s_infinite]"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    height: `${4 + (i % 2) * 6}px`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Mute/Unmute Button (Primary Control) */}
          <button
            onClick={toggleMute}
            className="w-9 h-9 rounded-full bg-[#1E3F20] text-[#C5A059] border-2 border-[#C5A059] flex items-center justify-center transition-colors duration-200 hover:bg-[#2e5f31] hover:text-white hover:border-white shadow-md shrink-0 animate-mute-pulse"
            aria-label={isMuted ? "Unmute music" : "Mute music"}
          >
            {isMuted ? (
              <VolumeX size={16} className="stroke-[2.5]" />
            ) : (
              <Volume2 size={16} className="stroke-[2.5]" />
            )}
          </button>

          {/* Progress ring or dot */}
          <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] transition-transform duration-200" style={{ transform: `scale(${(isPlaying && !isMuted) ? 1 : 0.5})` }} />
        </div>
      </div>
    </div>
  );
};
export default MusicPlayer;
