import { useState, useEffect, useRef, useCallback } from 'react';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export default function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isBypassed, setIsBypassed] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const isRevealedRef = useRef(false);

  const reveal = useCallback(() => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;

    // Instantly pause and hide video element so end frames never display
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
      // Cutoff earlier (2.8 seconds before end) to trim the tail end of the animation
      if (video.duration && video.currentTime >= video.duration - 2.8) {
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

    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        reveal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete, reveal]);

  if (isBypassed || isFinished) return null;

  return (
    <section
      className={`cinematic-loader is-playing ${isLeaving ? 'is-leaving' : ''}`}
      aria-label="Loading Owandrila Ghosh's portfolio"
      aria-live="polite"
    >
      {/* Background Atmosphere */}
      <div className="atmosphere" aria-hidden="true" />

      {/* Brighter Film Video */}
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

      {/* Minimal Skip Button */}
      <button className="skip" type="button" onClick={reveal}>
        Skip intro
      </button>
    </section>
  );
}
