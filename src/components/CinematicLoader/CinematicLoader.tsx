import { useState, useEffect, useRef, useCallback } from 'react';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export default function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isBypassed, setIsBypassed] = useState(false);

  const [currentStage, setCurrentStage] = useState({
    number: '01 / 05',
    title: '01. Rose Appears',
    copy: 'The rose slowly emerges from the darkness.',
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const isRevealedRef = useRef(false);

  const stages = useRef([
    ['01 / 05', '01. Rose Appears', 'The rose slowly emerges from the darkness.'],
    ['02 / 05', '02. Petal Falls', 'A petal gently separates and begins to fall.'],
    ['03 / 05', '03. Petal Descends', 'The petal falls, swirling through the air.'],
    ['04 / 05', '04. Petal Disintegrates', 'The petal turns into tiny particles.'],
    ['05 / 05', '05. Magic Fades', 'The particles vanish, revealing the journey.'],
  ]).current;

  const reveal = useCallback(() => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;

    // Immediately pause and hide video element so end frames never display
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.style.opacity = '0';
      videoRef.current.style.display = 'none';
    }

    setIsLeaving(true);
    onComplete();
    setTimeout(() => {
      setIsFinished(true);
    }, 1400);
  }, [onComplete]);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      // Cutoff 2.5 seconds before video end to completely eliminate end picture frames
      if (video.duration && video.currentTime >= video.duration - 2.5) {
        reveal();
      }
    }
  }, [reveal]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setIsBypassed(true);
      onComplete();
      return;
    }

    const duration = 7800; // ms (smooth 7.8s loader progression)
    const startAt = performance.now();
    let animFrameId: number;

    const tick = (now: number) => {
      const progressValue = Math.min(1, (now - startAt) / duration);
      const stageIdx = Math.min(4, Math.floor(progressValue * 5));
      const stageData = stages[stageIdx];

      setCurrentStage({
        number: stageData[0],
        title: stageData[1],
        copy: stageData[2],
      });

      if (progressValue < 1) {
        animFrameId = requestAnimationFrame(tick);
      } else {
        reveal();
      }
    };

    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    animFrameId = requestAnimationFrame(tick);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        reveal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete, reveal, stages]);

  if (isBypassed || isFinished) return null;

  return (
    <section
      className={`cinematic-loader is-playing ${isLeaving ? 'is-leaving' : ''}`}
      aria-label="Loading Owandrila Ghosh's portfolio"
      aria-live="polite"
    >
      {/* Background Atmosphere */}
      <div className="atmosphere" aria-hidden="true" />

      {/* Cinematic Film Video */}
      <video
        ref={videoRef}
        className="film"
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={reveal}
      >
        <source src="/assets/rose-loader.mp4" type="video/mp4" />
      </video>

      {/* Vignette & Ambient Dust */}
      <div className="vignette" aria-hidden="true" />
      <div className="dust" aria-hidden="true" />

      {/* Chapter Editorial Typography */}
      <header className="chapter">
        <p className="chapter-number">{currentStage.number}</p>
        <h1>{currentStage.title}</h1>
        <p className="chapter-copy">{currentStage.copy}</p>
      </header>

      {/* Skip Button */}
      <button className="skip" type="button" onClick={reveal}>
        Skip intro
      </button>
    </section>
  );
}
