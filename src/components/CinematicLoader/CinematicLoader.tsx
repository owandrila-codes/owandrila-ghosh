import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicLoaderProps {
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  swirl: number;
}

export default function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const [stage, setStage] = useState<'normal' | 'blooming' | 'fading'>('normal');
  const [isFinished, setIsFinished] = useState(false);
  const [isBypassed, setIsBypassed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  const handleSkip = useCallback(() => {
    setIsFinished(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  }, [onComplete]);

  // --- 1. AMBIENT MOTES GENERATION ---
  const motes = useRef(
    Array.from({ length: 26 }).map(() => ({
      left: Math.random() * 100,
      top: 40 + Math.random() * 45,
      delay: Math.random() * 4.5,
      duration: 3.5 + Math.random() * 3,
    }))
  ).current;

  // --- 2. EMBER BURST CANVAS PHYSICS ENGINE ---
  const runEmberBurst = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cx = canvas.width * 0.5;
    const cy = canvas.height * 0.56;
    let particles: Particle[] = [];

    // Spawn 180 Swirling Ember Particles
    for (let i = 0; i < 180; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.2 + Math.random() * 5.5;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        life: 0,
        maxLife: 70 + Math.random() * 70,
        size: 1 + Math.random() * 2.6,
        hue: 5 + Math.random() * 20,
        swirl: (Math.random() - 0.5) * 0.06,
      });
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      particles.forEach((p) => {
        p.life++;
        const angle = Math.atan2(p.vy, p.vx) + p.swirl;
        const speed = Math.hypot(p.vx, p.vy) * 0.985;
        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed - 0.01;
        p.x += p.vx;
        p.y += p.vy;
        const t = p.life / p.maxLife;
        const alpha = Math.max(0, 1 - t);

        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        grad.addColorStop(0, `hsla(${p.hue}, 90%, 60%, ${alpha})`);
        grad.addColorStop(1, `hsla(${p.hue}, 90%, 50%, 0)`);
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();
      });

      particles = particles.filter((p) => p.life < p.maxLife);
      if (particles.length > 0) {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    tick();
  }, []);

  // --- 3. STAGE ORCHESTRATION LOOP ---
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsBypassed(true);
      onComplete();
      return;
    }

    // Stage 2: Rose blooms out (~2.6s)
    const t1 = setTimeout(() => {
      setStage('blooming');
    }, 2600);

    // Stage 3: Ember burst (~3.3s)
    const t2 = setTimeout(() => {
      runEmberBurst();
    }, 3300);

    // Stage 4: Fade loader & reveal site (~3.9s)
    const t3 = setTimeout(() => {
      setStage('fading');
      onComplete();
    }, 3900);

    // Stage 5: Finish loader (~5.2s)
    const t4 = setTimeout(() => {
      setIsFinished(true);
    }, 5200);

    // Keyboard ESC skip listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete, runEmberBurst, handleSkip]);

  if (isBypassed) return null;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="cinematic-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none touch-none ${
            stage === 'fading' ? 'pointer-events-none opacity-0 transition-opacity duration-1000' : 'opacity-100'
          }`}
          style={{
            background: 'radial-gradient(ellipse at 50% 38%, #170707 0%, #060303 62%, #000 100%)',
          }}
        >
          {/* Ambient Rising Motes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {motes.map((m, i) => (
              <span
                key={i}
                className="absolute w-[3px] h-[3px] rounded-full bg-[#ff8a75] shadow-[0_0_6px_1px_rgba(255,110,90,0.8)] opacity-0 animate-mote-float"
                style={{
                  left: `${m.left}%`,
                  top: `${m.top}%`,
                  animationDelay: `${m.delay}s`,
                  animationDuration: `${m.duration}s`,
                }}
              />
            ))}
          </div>

          {/* Photorealistic Velvet Rose Wrap */}
          <div
            className={`relative w-[min(360px,46vw)] aspect-[950/820] mb-8 filter drop-shadow-[0_0_55px_rgba(180,40,30,0.35)] transition-all duration-900 ease-out ${
              stage === 'blooming' || stage === 'fading'
                ? 'scale-[2.4] -translate-y-[8%] opacity-0'
                : 'scale-100 opacity-100'
            }`}
          >
            <img
              src="/assets/rose.png"
              alt="Blooming Crimson Velvet Rose"
              className="w-full h-full object-contain animate-rose-breathe"
            />
          </div>

          {/* Luxury Typography Overlay */}
          <div
            className={`text-center transition-all duration-500 ease-out ${
              stage === 'blooming' || stage === 'fading' ? 'opacity-0 translate-y-2' : 'opacity-100'
            }`}
          >
            <div className="font-serif-title text-xl sm:text-3xl tracking-[0.12em] text-[#f4efe9] uppercase font-medium">
              Owandrila Ghosh
            </div>
            <div className="mt-2.5 text-xs sm:text-sm tracking-[0.35em] text-[#c0392b] uppercase font-normal flex items-center justify-center gap-1">
              <span>LOADING</span>
              <span className="inline-flex">
                <span className="animate-[dot-blink_1.4s_infinite_0s] opacity-0">.</span>
                <span className="animate-[dot-blink_1.4s_infinite_0.2s] opacity-0">.</span>
                <span className="animate-[dot-blink_1.4s_infinite_0.4s] opacity-0">.</span>
              </span>
            </div>
          </div>

          {/* 2D Ember Burst Canvas */}
          <canvas
            ref={canvasRef}
            className={`fixed inset-0 z-40 pointer-events-none transition-opacity duration-600 ${
              stage === 'blooming' || stage === 'fading' ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Spinning Sparkle Icon */}
          <div className="fixed right-[5%] bottom-[8%] z-50 w-6 h-6 opacity-85 animate-[sparkle-spin_7s_linear_infinite,sparkle-pulse_2.4s_ease-in-out_infinite] pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none">
              <path
                d="M50 0 C52 32 60 46 100 50 C60 54 52 68 50 100 C48 68 40 54 0 50 C40 46 48 32 50 0Z"
                fill="#bdb8b8"
              />
            </svg>
          </div>

          {/* Minimal Skip Button */}
          <div className="absolute bottom-6 z-50 pointer-events-auto">
            <button
              onClick={handleSkip}
              className="text-[9px] font-grotesk tracking-[0.2em] text-[#f4efe9]/40 hover:text-[#c0392b] transition-colors uppercase cursor-pointer bg-black/40 px-3 py-1.5 rounded-full border border-white/10"
            >
              [ SKIP INTRO ]
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
