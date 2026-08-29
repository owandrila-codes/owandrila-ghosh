import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export default function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const [isFinished, setIsFinished] = useState(false);
  const [isBypassed, setIsBypassed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSkip = useCallback(() => {
    setIsFinished(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  }, [onComplete]);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      // Cutoff 2.2 seconds before video end to completely eliminate generic website video frames
      if (video.duration && video.currentTime >= video.duration - 2.2) {
        handleSkip();
      }
    }
  }, [handleSkip]);

  useEffect(() => {
    // 1. Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsBypassed(true);
      onComplete();
      return;
    }

    // 2. Play video automatically
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback if autoplay is blocked
      });
    }

    // 3. Keyboard ESC listener to skip intro
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // 4. Safety Hard Fallback Timer (10 seconds max)
    const safetyTimer = setTimeout(() => {
      handleSkip();
    }, 10000);

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete, handleSkip]);

  if (isBypassed) return null;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="cinematic-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#020202] text-[#f7e9e1] flex items-center justify-center overflow-hidden select-none touch-none"
        >
          {/* User's Exact Rose Animation Video */}
          <div className="relative w-full h-full flex items-center justify-center">
            <video
              ref={videoRef}
              src="/rose-loader.mp4"
              autoPlay
              muted
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleSkip}
              className="w-full h-full object-contain max-w-5xl max-h-[90vh]"
            />

            {/* Subtle Vignette & Dark Gradient Edges */}
            <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-[#020202]/30 to-[#020202]" />
          </div>

          {/* Minimal Skip Button */}
          <div className="absolute bottom-8 z-30 pointer-events-auto">
            <button
              onClick={handleSkip}
              className="text-[10px] font-grotesk tracking-[0.25em] text-[#f7e9e1]/50 hover:text-[#c83d4a] transition-colors uppercase cursor-pointer bg-black/60 px-4 py-2 rounded-full border border-white/10 shadow-lg backdrop-blur-md"
            >
              [ SKIP INTRO ]
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
