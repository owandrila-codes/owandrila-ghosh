import { motion } from 'framer-motion';
import { ArrowDownRight, Database, Cpu, Terminal, Cloud } from 'lucide-react';
import FloatingObjects from './FloatingObjects';

export default function Hero() {
  const metadataBadges = [
    { label: 'DATA SCIENCE', icon: <Database className="w-3.5 h-3.5 text-[#c83d4a]" /> },
    { label: 'ARTIFICIAL INTELLIGENCE', icon: <Cpu className="w-3.5 h-3.5 text-[#c83d4a]" /> },
    { label: 'SOFTWARE ENGINEERING', icon: <Terminal className="w-3.5 h-3.5 text-[#c83d4a]" /> },
    { label: 'CLOUD COMPUTING', icon: <Cloud className="w-3.5 h-3.5 text-[#c83d4a]" /> },
  ];

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Floating Objects */}
      <FloatingObjects />

      {/* Top 3D Embossed Beveled Header */}
      <div className="text-center relative z-20 space-y-2 mb-10 px-4">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-grotesk text-xs font-bold tracking-[0.25em] text-[#c83d4a] uppercase bg-[#220b0e] px-4 py-1.5 rounded-full border border-[rgba(200,61,74,0.3)] inline-block shadow-inner"
        >
          OWANDRILA GHOSH • BCA PORTFOLIO
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display font-black text-6xl sm:text-8xl lg:text-9xl text-3d-emboss uppercase tracking-tight leading-none"
        >
          DEVELOPER
        </motion.h1>
      </div>

      {/* "Who Am I?" Section Container */}
      <div className="max-w-6xl mx-auto px-6 relative z-20 w-full">
        <div className="reference-card p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Real Portrait Image Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full max-w-[320px] aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-b from-[#2d1014] to-[#120608] border-2 border-[rgba(200,61,74,0.4)] shadow-2xl p-4 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between border-b border-[rgba(200,61,74,0.25)] pb-2 mb-2 z-10">
                <span className="font-grotesk text-[10px] font-bold text-[#c83d4a] tracking-widest uppercase">
                  OWANDRILA GHOSH
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#c83d4a] animate-ping" />
              </div>

              {/* Real Portrait Photo Container */}
              <div className="relative my-auto w-full aspect-[4/4.5] rounded-2xl overflow-hidden border border-[rgba(200,61,74,0.3)] shadow-xl group-hover:scale-[1.02] transition-transform duration-300">
                <img
                  src="/owandrila.jpg"
                  alt="Owandrila Ghosh"
                  className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120608]/80 via-transparent to-transparent" />
              </div>

              <div className="border-t border-[rgba(200,61,74,0.25)] pt-3 text-center mt-2 z-10">
                <span className="text-[10px] font-grotesk font-bold text-[#f7e9e1] tracking-widest uppercase bg-[#c83d4a] px-3 py-1 rounded-full shadow-md inline-block">
                  TEAM LEADER • SMARTBAG
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: "Who Am I?" Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-2"
            >
              <h2 className="font-serif-title text-4xl sm:text-5xl text-[#f7e9e1] italic">
                Who Am I?
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#8b1e27] to-[#c83d4a] rounded-full" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-lg text-[#f7e9e1] leading-relaxed font-body"
            >
              I am <strong className="text-[#c83d4a]">Owandrila Ghosh</strong>, a BCA student specializing in <strong className="text-[#c83d4a]">Data Science &amp; Artificial Intelligence</strong>. I am passionate about building practical technology solutions through AI, data science, and software engineering.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm text-[#f7e9e1]/80 leading-relaxed font-body"
            >
              With hands-on experience in C, Java, JavaScript, HTML, CSS, Node.js, databases, and Google Cloud services, I continuously expand my skills by working on real-world projects, university computer labs, and hackathons.
            </motion.p>

            {/* Badges Grid */}
            <div className="flex flex-wrap gap-2 pt-2">
              {metadataBadges.map((b) => (
                <div key={b.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#120608] border border-[rgba(200,61,74,0.3)] text-[10px] font-grotesk font-bold text-[#f7e9e1] tracking-wider">
                  {b.icon}
                  <span>{b.label}</span>
                </div>
              ))}
            </div>

            {/* Pill Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <a
                href="#about"
                className="px-8 py-3.5 rounded-full bg-[#c83d4a] hover:bg-[#8b1e27] text-[#f7e9e1] font-grotesk font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-[#c83d4a]/40 flex items-center gap-2"
              >
                <span>Read Full Story</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-8 py-3.5 rounded-full bg-[#220b0e] hover:bg-[#2d1014] text-[#f7e9e1] font-grotesk font-bold text-xs uppercase tracking-widest transition-all border border-[rgba(200,61,74,0.4)]"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
