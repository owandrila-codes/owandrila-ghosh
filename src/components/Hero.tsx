import { motion } from 'framer-motion';
import { ArrowDown, Database, Cpu, Terminal, Cloud } from 'lucide-react';
import FloatingObjects from './FloatingObjects';

export default function Hero() {
  const metadataBadges = [
    { label: 'DATA SCIENCE', icon: <Database className="w-3.5 h-3.5 text-[#c83d4a]" /> },
    { label: 'ARTIFICIAL INTELLIGENCE', icon: <Cpu className="w-3.5 h-3.5 text-[#c83d4a]" /> },
    { label: 'SOFTWARE ENGINEERING', icon: <Terminal className="w-3.5 h-3.5 text-[#c83d4a]" /> },
    { label: 'CLOUD COMPUTING', icon: <Cloud className="w-3.5 h-3.5 text-[#c83d4a]" /> },
  ];

  return (
    <section id="hero" className="relative min-h-screen pt-20 md:pt-28 pb-12 flex flex-col items-center justify-between overflow-hidden max-w-full z-10">
      {/* 3D Floating Objects */}
      <FloatingObjects />

      {/* Main Container */}
      <div className="w-full max-w-6xl mx-auto px-6 relative z-20 flex-1 flex flex-col justify-center items-center">
        {/* Top Header Badge & Title */}
        <div className="text-center space-y-3 mb-8 px-4 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-grotesk text-xs font-bold tracking-[0.25em] text-[#c83d4a] uppercase bg-[#220b0e] px-4 py-1.5 rounded-full border border-[rgba(200,61,74,0.3)] inline-block shadow-inner text-center"
          >
            OWANDRILA GHOSH
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display font-black text-5xl sm:text-7xl lg:text-9xl text-3d-emboss uppercase tracking-tight leading-none text-center"
          >
            DEVELOPER
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xs sm:text-sm font-grotesk font-extrabold text-[#c83d4a] tracking-[0.25em] uppercase pt-1 text-center"
          >
            BCA • DATA SCIENCE • AI
          </motion.div>
        </div>

        {/* Hero Portrait & Summary Card */}
        <div className="w-full max-w-4xl mx-auto reference-card p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center shadow-2xl rounded-3xl border border-[rgba(200,61,74,0.3)] bg-[#2d1014]/60 backdrop-blur-md">
          {/* Portrait Column */}
          <div className="md:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative w-full max-w-[240px] aspect-[4/4.8] rounded-2xl overflow-hidden bg-gradient-to-b from-[#2d1014] to-[#120608] border border-[rgba(200,61,74,0.4)] shadow-xl p-3 flex flex-col justify-between items-center group"
            >
              <div className="flex items-center justify-between w-full border-b border-[rgba(200,61,74,0.25)] pb-1.5 mb-1 z-10">
                <span className="font-grotesk text-[9px] font-bold text-[#c83d4a] tracking-widest uppercase">
                  OWANDRILA GHOSH
                </span>
                <span className="w-2 h-2 rounded-full bg-[#c83d4a] animate-ping" />
              </div>

              <div className="relative my-auto w-full aspect-[4/4.2] rounded-xl overflow-hidden border border-[rgba(200,61,74,0.3)] shadow-md group-hover:scale-[1.02] transition-transform duration-300">
                <img
                  src="/owandrila.jpg"
                  alt="Owandrila Ghosh"
                  className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120608]/75 via-transparent to-transparent" />
              </div>

              <div className="border-t border-[rgba(200,61,74,0.25)] pt-2 text-center w-full mt-1 z-10">
                <span className="text-[9px] font-grotesk font-bold text-[#f7e9e1] tracking-widest uppercase bg-[#c83d4a] px-2.5 py-0.5 rounded-full inline-block shadow-sm">
                  TEAM LEADER • SMARTBAG
                </span>
              </div>
            </motion.div>
          </div>

          {/* Text Summary Column */}
          <div className="md:col-span-7 space-y-4 text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-[#f7e9e1] font-serif-title italic leading-relaxed"
            >
              "Exploring the intersection of data, artificial intelligence and software development."
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center md:justify-start gap-2 pt-1"
            >
              {metadataBadges.map((b) => (
                <div key={b.label} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#120608] border border-[rgba(200,61,74,0.3)] text-[10px] font-grotesk font-bold text-[#f7e9e1] tracking-wider">
                  {b.icon}
                  <span>{b.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="pt-6 pb-2 text-center z-20"
      >
        <a
          href="#about"
          className="inline-flex items-center justify-center gap-2 text-xs font-grotesk font-bold text-[#c83d4a] tracking-[0.25em] uppercase hover:text-[#f7e9e1] transition-colors"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#c83d4a]" />
        </a>
      </motion.div>
    </section>
  );
}
