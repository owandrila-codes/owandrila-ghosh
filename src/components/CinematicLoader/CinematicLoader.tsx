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

  const handleSkip = useCallback(() => {
    setIsFinished(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  }, [onComplete]);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Smooth 5-Stage Timeline Controller (~7.5 seconds total)
    const startTime = performance.now();
    const duration = 7500; // ms

    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProgress);

      // 5 Stages matching exact reference timeline:
      // Stage 1 (0-20%): Rose Appears
      // Stage 2 (20-45%): Petal Falls
      // Stage 3 (45-70%): Petal Descends
      // Stage 4 (70-90%): Petal Disintegrates
      // Stage 5 (90-100%): Magic Fades
      if (currentProgress < 20) {
        setStage(1);
      } else if (currentProgress < 45) {
        setStage(2);
      } else if (currentProgress < 70) {
        setStage(3);
      } else if (currentProgress < 90) {
        setStage(4);
      } else {
        setStage(5);
      }

      if (currentProgress < 100) {
        animId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 200);
      }
    };

    animId = requestAnimationFrame(tick);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Hard Safety Fallback Timer (9s)
    const safetyTimer = setTimeout(() => {
      handleSkip();
    }, 9000);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(safetyTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete, handleSkip]);

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
          {/* Photorealistic 3D Rose & Disintegrating Petal WebGL Engine */}
          <RoseWebGLCanvas stage={stage} progress={progress} />

          {/* Luxury Editorial Typography Overlay */}
          <LoaderTypography stage={stage} progress={progress} onSkip={handleSkip} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
