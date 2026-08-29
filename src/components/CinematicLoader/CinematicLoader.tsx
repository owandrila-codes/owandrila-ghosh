import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RoseWebGLCanvas from './RoseWebGLCanvas';
import LoaderTypography from './LoaderTypography';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export default function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [isBypassed, setIsBypassed] = useState(false);

  const handleSkip = useCallback(() => {
    setIsFinished(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  }, [onComplete]);

  useEffect(() => {
    // 1. Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. Check for existing session storage key
    const hasSeenLoader = sessionStorage.getItem('hasSeenRoseCinematicLoader');

    if (prefersReducedMotion || hasSeenLoader === 'true') {
      setIsBypassed(true);
      onComplete();
      return;
    }

    // Save session flag for returning visitors
    sessionStorage.setItem('hasSeenRoseCinematicLoader', 'true');

    // 3. Smooth Progress & Stage Controller Loop (~7.2 seconds total duration)
    const startTime = performance.now();
    const duration = 7200; // ms

    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProgress);

      // Determine stage
      if (currentProgress < 22) {
        setStage(1);
      } else if (currentProgress < 46) {
        setStage(2);
      } else if (currentProgress < 72) {
        setStage(3);
      } else if (currentProgress < 90) {
        setStage(4);
      } else {
        setStage(5);
      }

      if (currentProgress < 100) {
        animId = requestAnimationFrame(tick);
      } else {
        // Complete sequence
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            onComplete();
          }, 700);
        }, 300);
      }
    };

    animId = requestAnimationFrame(tick);

    // 4. Keyboard ESC listener to skip intro
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // 5. Safety Hard Fallback Timer (9 seconds max)
    const safetyTimer = setTimeout(() => {
      handleSkip();
    }, 9000);

    return () => {
      cancelAnimationFrame(animId);
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
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#020202] text-[#f7e9e1] overflow-hidden select-none touch-none"
        >
          {/* 3D WebGL Rose & Falling Petal Canvas */}
          <RoseWebGLCanvas stage={stage} progress={progress} />

          {/* Luxury Editorial Typography Overlay */}
          <LoaderTypography stage={stage} progress={progress} onSkip={handleSkip} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
