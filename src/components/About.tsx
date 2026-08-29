import { motion } from 'framer-motion';
import { Code2, Cpu, Database, Server, Terminal, Globe, Layers, Cloud, Sparkles } from 'lucide-react';

export default function About() {
  const skillCards = [
    { name: 'C', category: 'LANGUAGES', icon: <Terminal className="w-4 h-4 text-[#c83d4a]" />, depth: 'z-10', delay: 0.1 },
    { name: 'JAVA', category: 'LANGUAGES', icon: <Code2 className="w-4 h-4 text-[#c83d4a]" />, depth: 'z-20', delay: 0.15 },
    { name: 'JAVASCRIPT', category: 'FRONTEND', icon: <Globe className="w-4 h-4 text-[#c83d4a]" />, depth: 'z-30', delay: 0.2 },
    { name: 'HTML', category: 'FRONTEND', icon: <Layers className="w-4 h-4 text-[#c83d4a]" />, depth: 'z-10', delay: 0.25 },
    { name: 'CSS', category: 'STYLING', icon: <Sparkles className="w-4 h-4 text-[#c83d4a]" />, depth: 'z-20', delay: 0.3 },
    { name: 'NODE.JS', category: 'BACKEND', icon: <Server className="w-4 h-4 text-[#c83d4a]" />, depth: 'z-30', delay: 0.35 },
    { name: 'DATABASES', category: 'STORAGE', icon: <Database className="w-4 h-4 text-[#c83d4a]" />, depth: 'z-10', delay: 0.4 },
    { name: 'GOOGLE CLOUD', category: 'CLOUD', icon: <Cloud className="w-4 h-4 text-[#c83d4a]" />, depth: 'z-20', delay: 0.45 },
    { name: 'DATA SCIENCE', category: 'SPECIALIZATION', icon: <Database className="w-4 h-4 text-[#c83d4a]" />, depth: 'z-30', delay: 0.5 },
    { name: 'AI', category: 'INTELLIGENCE', icon: <Cpu className="w-4 h-4 text-[#c83d4a]" />, depth: 'z-20', delay: 0.55 },
  ];

  return (
    <section id="about" className="relative min-h-screen py-20 flex flex-col justify-center items-center overflow-hidden z-10">
      <div className="w-full max-w-5xl mx-auto px-6 relative z-20 space-y-12">
        {/* SECTION 02 HEADING: A LITTLE ABOUT ME */}
        <div className="text-center space-y-3">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-grotesk text-xs font-bold tracking-[0.3em] text-[#c83d4a] uppercase bg-[#220b0e] px-4 py-1.5 rounded-full border border-[rgba(200,61,74,0.3)] inline-block"
          >
            02 — ABOUT &amp; EXPERTISE
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl text-3d-emboss uppercase tracking-tight"
          >
            A LITTLE ABOUT ME
          </motion.h2>
        </div>

        {/* CONCISE BIOGRAPHY CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="reference-card p-6 sm:p-10 rounded-3xl bg-[#2d1014]/70 border border-[rgba(200,61,74,0.35)] shadow-2xl backdrop-blur-md max-w-4xl mx-auto text-center space-y-4"
        >
          <p className="text-base sm:text-xl text-[#f7e9e1] leading-relaxed font-body font-light">
            I’m <strong className="text-[#c83d4a] font-semibold">Owandrila Ghosh</strong>, a BCA student specializing in <strong className="text-[#c83d4a] font-semibold">Data Science and Artificial Intelligence</strong>. I’m interested in emerging technologies, software development, cloud computing and AI-driven solutions.
          </p>
          <p className="text-sm sm:text-base text-[#f7e9e1]/85 leading-relaxed font-body font-light">
            I enjoy learning through hands-on projects, practical labs and problem-solving challenges, with a focus on building practical and meaningful technology.
          </p>
        </motion.div>

        {/* TRANSITION INTO: I WORK WITH (3D FLOATING SKILL CARDS FIELD) */}
        <div className="space-y-6 text-center pt-4">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-grotesk text-xs sm:text-sm font-extrabold tracking-[0.3em] text-[#c83d4a] uppercase"
          >
            I WORK WITH
          </motion.h3>

          {/* 3D Orbiting Skill Cards Field */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto pt-2">
            {skillCards.map((s) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: s.delay }}
                whileHover={{ scale: 1.08, rotateY: 10, rotateX: -5 }}
                className="reference-card p-4 rounded-2xl bg-[#120608]/90 border border-[rgba(200,61,74,0.35)] shadow-lg flex flex-col items-center justify-center text-center space-y-2 hover:border-[#c83d4a] transition-all cursor-pointer group"
              >
                <div className="p-2.5 rounded-xl bg-[#220b0e] border border-[rgba(200,61,74,0.25)] group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <div className="font-grotesk text-xs font-bold text-[#f7e9e1] tracking-wider uppercase">
                  {s.name}
                </div>
                <div className="text-[8px] font-grotesk text-[#c83d4a] tracking-widest uppercase">
                  {s.category}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
