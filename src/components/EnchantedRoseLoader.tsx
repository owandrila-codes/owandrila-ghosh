import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// CONFIGURATION CONSTANTS
// Set ALWAYS_SHOW_LOADING to true if you want the rose loader to play on every refresh.
// Set to false if it should only play once per browser session.
// ==========================================
const ALWAYS_SHOW_LOADING = true;

interface EnchantedRoseLoaderProps {
  onComplete?: () => void;
}

export default function EnchantedRoseLoader({ onComplete }: EnchantedRoseLoaderProps) {
  const [phase, setPhase] = useState<'darkness' | 'reveal' | 'detach' | 'disintegrate' | 'dissolve' | 'done'>('darkness');
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Session Check
    if (!ALWAYS_SHOW_LOADING && typeof window !== 'undefined') {
      const hasSeen = sessionStorage.getItem('hasSeenRoseLoader');
      if (hasSeen) {
        setIsVisible(false);
        if (onComplete) onComplete();
        return;
      }
      sessionStorage.setItem('hasSeenRoseLoader', 'true');
    }

    // Accessibility check: prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }

    // Sequence Timeline
    const timer1 = setTimeout(() => setPhase('reveal'), 300);       // Phase 2: Rose emerges
    const timer2 = setTimeout(() => setPhase('detach'), 1100);      // Phase 3: Petal detaches
    const timer3 = setTimeout(() => setPhase('disintegrate'), 1700); // Phase 4 & 5: Petal falls & turns to dust
    const timer4 = setTimeout(() => setPhase('dissolve'), 2600);    // Phase 6: Screen dissolves
    const timer5 = setTimeout(() => {
      setPhase('done');
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  // Particle Disintegration Engine (Canvas 2D)
  useEffect(() => {
    if (!isVisible || phase === 'done') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Dust Particle Class
    interface DustParticle {
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

    const particles: DustParticle[] = [];
    const colors = [
      'rgba(200, 61, 74, ',  // Crimson
      'rgba(139, 30, 39, ',  // Deep Red
      'rgba(215, 90, 100, ', // Warm Red
      'rgba(247, 233, 225, ',// Ivory highlight
    ];

    let hasSpawnedDisintegration = false;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Spawn ambient floating particles
      if (Math.random() < 0.3 && particles.length < 120) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -Math.random() * 0.6 - 0.2,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.4 + 0.1,
          decay: Math.random() * 0.005 + 0.002,
          color: colors[Math.floor(Math.random() * colors.length)],
          glow: Math.random() > 0.8,
        });
      }

      // Spawn dense dust burst during Disintegrate Phase
      if (phase === 'disintegrate' && !hasSpawnedDisintegration) {
        hasSpawnedDisintegration = true;
        const centerX = width / 2 + 15;
        const startY = height / 2 + 70;

        const particleCount = width < 768 ? 140 : 260;
        for (let i = 0; i < particleCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 2.2 + 0.3;
          particles.push({
            x: centerX + (Math.random() - 0.5) * 30,
            y: startY + (Math.random() - 0.5) * 40,
            vx: Math.cos(angle) * speed * 0.8 + (Math.random() - 0.5) * 0.5,
            vy: Math.abs(Math.sin(angle)) * speed * 0.6 + 0.8, // drift downward
            size: Math.random() * 2.2 + 0.6,
            alpha: Math.random() * 0.85 + 0.15,
            decay: Math.random() * 0.015 + 0.008,
            color: colors[Math.floor(Math.random() * colors.length)],
            glow: Math.random() > 0.6,
          });
        }
      }

      // Update & Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';

        if (p.glow) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#c83d4a';
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, phase]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="rose-loader-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'dissolve' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className="fixed inset-0 z-[9999] bg-[#100406] flex flex-col items-center justify-center overflow-hidden pointer-events-auto select-none"
      >
        {/* Background Atmospheric Canvas Engine */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

        {/* Ambient Radial Burgundy Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: phase === 'darkness' ? 0 : 0.65,
            scale: phase === 'darkness' ? 0.8 : 1.15,
          }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute w-[450px] h-[450px] rounded-full bg-radial from-[#8b1e27]/50 via-[#2d1014]/20 to-transparent blur-3xl pointer-events-none z-0"
        />

        {/* Center Container: Enchanted 2.5D Rose & Petals */}
        <div className="relative z-20 flex flex-col items-center justify-center space-y-6">
          
          {/* Main Rose Graphic Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, filter: 'blur(10px)' }}
            animate={{
              opacity: phase === 'darkness' ? 0 : 1,
              scale: phase === 'darkness' ? 0.88 : 1,
              filter: 'blur(0px)',
              y: [0, -6, 0],
            }}
            transition={{
              opacity: { duration: 0.8, ease: 'easeOut' },
              scale: { duration: 0.8, ease: 'easeOut' },
              filter: { duration: 0.8 },
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="relative w-44 h-56 sm:w-56 sm:h-72 flex items-center justify-center"
          >
            {/* SVG Enchanted Rose Visual */}
            <svg
              viewBox="0 0 200 240"
              className="w-full h-full drop-shadow-[0_12px_25px_rgba(200,61,74,0.4)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Stem & Leaves */}
              <path
                d="M100 130 Q98 170 102 220"
                stroke="#4a181e"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <path
                d="M100 165 Q70 155 60 170 Q80 180 100 168"
                fill="#3a1016"
                stroke="#8b1e27"
                strokeWidth="1.2"
              />
              <path
                d="M101 185 Q130 175 142 190 Q120 200 101 188"
                fill="#3a1016"
                stroke="#8b1e27"
                strokeWidth="1.2"
              />

              {/* Thorns */}
              <path d="M98 150 L91 146 L99 155 Z" fill="#6e1b23" />
              <path d="M102 180 L109 176 L101 185 Z" fill="#6e1b23" />

              {/* Outer Rose Calyx */}
              <path
                d="M85 130 C75 140 65 120 75 110 C85 105 95 120 85 130 Z"
                fill="#5c151c"
              />
              <path
                d="M115 130 C125 140 135 120 125 110 C115 105 105 120 115 130 Z"
                fill="#5c151c"
              />

              {/* Layered Petal Crown */}
              <g id="rose-petals">
                {/* Back Petals */}
                <path
                  d="M100 40 C60 40 50 90 75 125 C100 145 125 125 150 125 C125 90 140 40 100 40 Z"
                  fill="url(#gradient-petal-back)"
                />
                {/* Side Petals */}
                <path
                  d="M100 48 C70 52 62 85 82 118 C100 135 118 118 138 85 C130 52 130 48 100 48 Z"
                  fill="url(#gradient-petal-mid)"
                />
                {/* Inner Velvet Core */}
                <path
                  d="M100 58 C80 62 76 88 92 110 C100 120 108 110 124 88 C120 62 120 58 100 58 Z"
                  fill="url(#gradient-petal-core)"
                />
                {/* Spiral Bloom Center */}
                <path
                  d="M100 66 C90 70 88 85 96 98 C100 102 104 98 112 85 C110 70 110 66 100 66 Z"
                  fill="#c83d4a"
                />
                <circle cx="100" cy="80" r="8" fill="#f7e9e1" opacity="0.25" />
              </g>

              {/* SVG Gradients */}
              <defs>
                <linearGradient id="gradient-petal-back" x1="100" y1="40" x2="100" y2="135" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#c83d4a" />
                  <stop offset="60%" stopColor="#8b1e27" />
                  <stop offset="100%" stopColor="#3a0b10" />
                </linearGradient>
                <linearGradient id="gradient-petal-mid" x1="100" y1="48" x2="100" y2="125" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#e25363" />
                  <stop offset="50%" stopColor="#c83d4a" />
                  <stop offset="100%" stopColor="#63141c" />
                </linearGradient>
                <linearGradient id="gradient-petal-core" x1="100" y1="58" x2="100" y2="115" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#f7e9e1" stopOpacity="0.8" />
                  <stop offset="30%" stopColor="#c83d4a" />
                  <stop offset="100%" stopColor="#8b1e27" />
                </linearGradient>
              </defs>
            </svg>

            {/* Falling Detached Petal Animation */}
            <AnimatePresence>
              {(phase === 'detach' || phase === 'disintegrate') && (
                <motion.div
                  key="falling-detached-petal"
                  initial={{ opacity: 1, x: 22, y: 15, rotate: 0, scale: 1 }}
                  animate={
                    phase === 'detach'
                      ? {
                          x: [22, 38, 48],
                          y: [15, 45, 80],
                          rotate: [0, 25, 45],
                          scale: [1, 1.05, 0.98],
                        }
                      : {
                          x: [48, 65, 80],
                          y: [80, 135, 175],
                          rotate: [45, 75, 110],
                          scale: [0.98, 0.6, 0],
                          opacity: [1, 0.7, 0],
                        }
                  }
                  transition={{
                    duration: phase === 'detach' ? 0.6 : 0.8,
                    ease: 'easeOut',
                  }}
                  className="absolute top-24 left-24 w-8 h-10 pointer-events-none"
                >
                  <svg viewBox="0 0 40 50" fill="none" className="w-full h-full drop-shadow-[0_4px_10px_rgba(200,61,74,0.6)]">
                    <path
                      d="M20 5 C35 10 38 30 25 45 C12 40 5 25 12 10 Z"
                      fill="url(#detached-petal-grad)"
                    />
                    <defs>
                      <linearGradient id="detached-petal-grad" x1="20" y1="5" x2="20" y2="45" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#f7e9e1" />
                        <stop offset="40%" stopColor="#c83d4a" />
                        <stop offset="100%" stopColor="#8b1e27" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Elegant Typography & Status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase === 'darkness' ? 0 : 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center space-y-1.5"
          >
            <div className="font-grotesk text-xs sm:text-sm font-bold tracking-[0.3em] text-[#f7e9e1] uppercase">
              OWANDRILA GHOSH
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c83d4a] animate-ping" />
              <span className="font-grotesk text-[10px] font-bold tracking-[0.25em] text-[#c83d4a] uppercase">
                {phase === 'dissolve' ? 'ENTERING PORTFOLIO...' : 'LOADING...'}
              </span>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
