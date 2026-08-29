import { motion } from 'framer-motion';
import { ArrowDown, Database, Cpu, Terminal, Cloud } from 'lucide-react';
import FloatingObjects from './FloatingObjects';

export default function Hero() {
  const metadataBadges = [
    { label: 'DATA SCIENCE', icon: <Database className="w-3.5 h-3.5 text-[#c83d4a]" /> },
    { label: 'AI', icon: <Cpu className="w-3.5 h-3.5 text-[#c83d4a]" /> },
    { label: 'SOFTWARE DEV', icon: <Terminal className="w-3.5 h-3.5 text-[#c83d4a]" /> },
    { label: 'CLOUD', icon: <Cloud className="w-3.5 h-3.5 text-[#c83d4a]" /> },
  ];

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-12 flex flex-col items-center justify-between overflow-hidden z-10">
      {/* 3D Floating Background Objects */}
      <FloatingObjects />

      {/* Top Header Badge & Huge Typography */}
      <div className="text-center relative z-20 space-y-3 px-4 max-w-5xl mx-auto my-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-[#220b0e] px-4 py-1.5 rounded-full border border-[rgba(200,61,74,0.3)] shadow-inner"
        >
          <span className="w-2 h-2 rounded-full bg-[#c83d4a] animate-pulse" />
          <span className="font-grotesk text-xs font-bold tracking-[0.2em] text-[#c83d4a] uppercase">
            BCA • DATA SCIENCE • AI
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display font-black text-6xl sm:text-8xl lg:text-9xl text-3d-emboss uppercase tracking-tight leading-none"
        >
          OWANDRILA <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7e9e1] via-[#c83d4a] to-[#8b1e27]">
            GHOSH
          </span>
        </motion.h1>

        {/* Short Required Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-xl text-[#f7e9e1]/90 max-w-2xl mx-auto font-body leading-relaxed pt-2"
        >
          "Exploring the intersection of data, artificial intelligence and software development."
        </motion.p>

        {/* Badges Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 pt-2"
        >
          {metadataBadges.map((b) => (
            <div
              key={b.label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#120608]/90 border border-[rgba(200,61,74,0.3)] text-[10px] font-grotesk font-bold text-[#f7e9e1] tracking-wider shadow-md"
            >
              {b.icon}
              <span>{b.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 3D Depth Card Container with Portrait */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-20 w-full max-w-md px-6 text-center space-y-4"
      >
        <div className="reference-card p-4 flex items-center justify-between gap-4 border border-[rgba(200,61,74,0.35)] shadow-2xl">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#c83d4a] shrink-0 shadow-lg">
            <img
              src="/owandrila.jpg"
              alt="Owandrila Ghosh"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="text-left space-y-0.5 truncate">
            <span className="text-[10px] font-grotesk font-bold text-[#c83d4a] uppercase tracking-wider block">
              PORTFOLIO HIGHLIGHT
            </span>
            <div className="font-display font-black text-sm text-[#f7e9e1] uppercase truncate">
              SMARTBAG TEAM LEADER
            </div>
            <div className="text-[11px] text-[#f7e9e1]/70 font-body truncate">
              Building data-driven AI software
            </div>
          </div>
        </div>

        {/* Scroll Prompt */}
        <a
          href="#about"
          className="inline-flex items-center gap-2 text-xs font-grotesk font-bold text-[#c83d4a] hover:text-[#f7e9e1] tracking-[0.2em] uppercase transition-colors pt-2 group"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-4 h-4 text-[#c83d4a] group-hover:translate-y-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
}
