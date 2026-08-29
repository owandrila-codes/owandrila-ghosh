import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Configuration Constant: Set true to show loading animation on every page refresh for testing
const ALWAYS_SHOW_LOADING = true;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
  glow: boolean;
}

export default function EnchantedRoseLoader({ onComplete }: { onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<'darkness' | 'reveal' | 'detach' | 'descend' | 'disintegrate' | 'hero' | 'done'>('darkness');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Session Storage Check if ALWAYS_SHOW_LOADING is false
    if (!ALWAYS_SHOW_LOADING) {
      const hasSeen = sessionStorage.getItem('hasSeenEnchantedRose');
      if (hasSeen) {
        setIsVisible(false);
        if (onComplete) onComplete();
        return;
      }
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 1000);
      return;
    }

    // Sequence Timeline Timers
    const timer1 = setTimeout(() => setPhase('reveal'), 400);       // Phase 1: 0.0s - 0.4s
    const timer2 = setTimeout(() => setPhase('detach'), 1200);      // Phase 2: 0.4s - 1.2s
    const timer3 = setTimeout(() => setPhase('descend'), 1700);     // Phase 3: 1.2s - 1.7s
    const timer4 = setTimeout(() => setPhase('disintegrate'), 2400); // Phase 4: 1.7s - 2.4s
    const timer5 = setTimeout(() => setPhase('hero'), 3200);        // Phase 5: 2.4s - 3.2s
    const timer6 = setTimeout(() => {
      setPhase('done');
      setIsVisible(false);
      if (!ALWAYS_SHOW_LOADING) {
        sessionStorage.setItem('hasSeenEnchantedRose', 'true');
      }
      if (onComplete) onComplete();
    }, 3800);                                                        // Phase 6: 3.2s - 3.8s

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, [onComplete]);

  // Particle System Canvas Animation during Disintegration Phase
  useEffect(() => {
    if (phase !== 'disintegrate' && phase !== 'hero') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Particle Emitter Origin (Lower-middle of screen where petal disintegrates)
    const emitterX = width / 2 + 25;
    const emitterY = height * 0.58;

    const particleColors = [
      '#c83d4a', // Crimson accent
      '#8b1e27', // Deep wine
      '#4a0e14', // Dark burgundy
      '#f7e9e1', // Warm ivory highlight
      '#e65c69', // Bright rose glow
    ];

    const isMobile = width < 768;
    const particleCount = isMobile ? 180 : 350;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.8 + 0.5;
      particles.push({
        x: emitterX + (Math.random() - 0.5) * 30,
        y: emitterY + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed * 0.8 + (Math.random() - 0.5) * 1.2,
        vy: Math.sin(angle) * speed * 0.6 + Math.random() * 1.5 + 0.3,
        size: Math.random() * 2.5 + 0.8,
        alpha: Math.random() * 0.9 + 0.1,
        decay: Math.random() * 0.015 + 0.01,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        glow: Math.random() > 0.75,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        if (p.alpha <= 0) return;

        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.vx *= 0.98; // Friction

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);

        if (p.glow) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (particles.some((p) => p.alpha > 0)) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [phase]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="enchanted-loader"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'hero' || phase === 'done' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-[9999] bg-[#0c0406] flex flex-col items-center justify-between py-12 px-6 overflow-hidden pointer-events-none select-none"
      >
        {/* Subtle Background Radial Ambient Glow */}
        <motion.div
          animate={{
            opacity: phase === 'darkness' ? 0.2 : 0.65,
            scale: phase === 'reveal' ? 1.1 : 1,
          }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(200,61,74,0.18)_0%,_rgba(139,30,39,0.08)_45%,_transparent_70%)] pointer-events-none"
        />

        {/* Ambient Floating Dust Particles Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" />

        {/* Top Spacer */}
        <div className="w-full h-8" />

        {/* Center Suspended Enchanted Rose Container */}
        <div className="relative w-full max-w-sm h-[360px] flex items-center justify-center my-auto z-10">
          
          {/* Main Swaying Rose Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, filter: 'blur(10px)' }}
            animate={{
              opacity: phase === 'darkness' ? 0 : 1,
              scale: phase === 'darkness' ? 0.88 : 1,
              filter: phase === 'darkness' ? 'blur(10px)' : 'blur(0px)',
              y: [0, -6, 0],
              rotate: [0, 1, -1, 0],
            }}
            transition={{
              opacity: { duration: 0.8 },
              scale: { duration: 0.8 },
              filter: { duration: 0.8 },
              y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="relative w-52 h-64 flex items-center justify-center"
          >
            {/* Soft Ambient Aura behind Rose */}
            <div className="absolute inset-0 rounded-full bg-[#c83d4a]/20 blur-3xl scale-110 pointer-events-none" />

            {/* High-Detail Enchanted Rose SVG Render */}
            <svg
              viewBox="0 0 200 240"
              className="w-full h-full drop-shadow-[0_15px_30px_rgba(200,61,74,0.35)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Petal Gradients */}
                <radialGradient id="roseCore" cx="50%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="#f7e9e1" />
                  <stop offset="35%" stopColor="#e63946" />
                  <stop offset="75%" stopColor="#8b1e27" />
                  <stop offset="100%" stopColor="#3a0c11" />
                </radialGradient>

                <linearGradient id="roseStem" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2b472a" />
                  <stop offset="50%" stopColor="#1a3019" />
                  <stop offset="100%" stopColor="#0f1f0e" />
                </linearGradient>

                <linearGradient id="petalGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c83d4a" />
                  <stop offset="60%" stopColor="#8b1e27" />
                  <stop offset="100%" stopColor="#4a0e14" />
                </linearGradient>

                <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Stem & Leaves */}
              <path d="M100 130 Q98 170 102 220" stroke="url(#roseStem)" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M100 160 Q75 150 60 162 Q80 175 100 168" fill="#1e381c" stroke="#375e34" strokeWidth="1" />
              <path d="M101 175 Q125 168 140 180 Q120 192 101 182" fill="#1e381c" stroke="#375e34" strokeWidth="1" />

              {/* Outer Layer Petals */}
              <path d="M60 110 C50 80 80 50 100 65 C120 50 150 80 140 110 C130 145 70 145 60 110 Z" fill="url(#petalGlow)" />
              <path d="M70 100 C62 72 90 55 100 68 C110 55 138 72 130 100 C120 130 80 130 70 100 Z" fill="#8b1e27" opacity="0.95" />

              {/* Core Layer Bloom Petals */}
              <path d="M80 92 C76 75 92 64 100 72 C108 64 124 75 120 92 C112 115 88 115 80 92 Z" fill="url(#roseCore)" />
              <path d="M88 88 C85 76 96 70 100 75 C104 70 115 76 112 88 C108 102 92 102 88 88 Z" fill="#c83d4a" />
              <ellipse cx="100" cy="80" rx="6" ry="4" fill="#f7e9e1" opacity="0.85" filter="url(#softGlow)" />

              {/* Dew Highlight Drops */}
              <circle cx="85" cy="98" r="1.5" fill="#f7e9e1" opacity="0.7" />
              <circle cx="112" cy="105" r="1.2" fill="#f7e9e1" opacity="0.6" />
            </svg>

            {/* Attached Petal (Before Detaching) */}
            {(phase === 'darkness' || phase === 'reveal') && (
              <motion.div className="absolute top-[108px] right-[42px] w-9 h-11 pointer-events-none">
                <svg viewBox="0 0 40 50" className="w-full h-full drop-shadow-md">
                  <path
                    d="M10 5 C25 -2 38 12 30 32 C20 45 2 35 10 5 Z"
                    fill="url(#petalGlow)"
                  />
                </svg>
              </motion.div>
            )}
          </motion.div>

          {/* Falling Petal Motion (Phases 3 & 4: Detach & Descend) */}
          {(phase === 'detach' || phase === 'descend') && (
            <motion.div
              initial={{ x: 25, y: -20, opacity: 1, rotate: 0, scale: 1 }}
              animate={{
                x: [25, 40, 15, 30],
                y: phase === 'detach' ? 10 : 130,
                rotate: [0, 25, -15, 40],
                opacity: phase === 'descend' ? 0.95 : 1,
                scale: phase === 'descend' ? 0.9 : 1,
              }}
              transition={{
                duration: phase === 'detach' ? 0.5 : 0.8,
                ease: 'easeInOut',
              }}
              className="absolute top-[108px] left-1/2 w-9 h-11 z-30 pointer-events-none"
            >
              <svg viewBox="0 0 40 50" className="w-full h-full drop-shadow-[0_4px_12px_rgba(200,61,74,0.6)]">
                <defs>
                  <linearGradient id="fallingPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e63946" />
                    <stop offset="60%" stopColor="#c83d4a" />
                    <stop offset="100%" stopColor="#5c1219" />
                  </linearGradient>
                </defs>
                <path
                  d="M10 5 C25 -2 38 12 30 32 C20 45 2 35 10 5 Z"
                  fill="url(#fallingPetalGrad)"
                />
                <ellipse cx="20" cy="18" rx="4" ry="8" fill="#f7e9e1" opacity="0.3" transform="rotate(-20 20 18)" />
              </svg>
            </motion.div>
          )}

          {/* Disintegrating Petal Fragment (Phase 5) */}
          {phase === 'disintegrate' && (
            <motion.div
              initial={{ x: 28, y: 130, opacity: 1, scale: 0.9 }}
              animate={{
                scale: [0.9, 0.4, 0],
                opacity: [1, 0.5, 0],
                filter: ['blur(0px)', 'blur(4px)', 'blur(8px)'],
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute top-[108px] left-1/2 w-8 h-10 z-30 pointer-events-none"
            >
              <svg viewBox="0 0 40 50" className="w-full h-full">
                <path
                  d="M10 5 C25 -2 38 12 30 32 C20 45 2 35 10 5 Z"
                  fill="#c83d4a"
                />
              </svg>
            </motion.div>
          )}

        </div>

        {/* Bottom Subtle Typography Branding */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase === 'darkness' ? 0 : 1 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-1 z-30 pb-4"
        >
          <span className="font-serif-title text-base sm:text-lg text-[#f7e9e1] tracking-[0.25em] uppercase block">
            OWANDRILA GHOSH
          </span>
          <span className="text-[10px] font-grotesk font-bold tracking-[0.3em] text-[#c83d4a] uppercase block animate-pulse">
            ENTERING...
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
