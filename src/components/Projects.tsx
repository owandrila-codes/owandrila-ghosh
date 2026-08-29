import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Globe, Layers, Cpu, Code } from 'lucide-react';

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      id: '01',
      title: 'SMARTBAG',
      category: 'IOT & SMART TECH',
      role: 'TEAM LEADER',
      desc: 'A smart technology project focused on practical problem solving, teamwork, planning and innovation.',
      tags: ['IoT', 'Hardware Integration', 'Team Management', 'Innovation'],
      icon: <Layers className="w-5 h-5 text-[#c83d4a]" />,
    },
    {
      id: '02',
      title: 'AI / DATA SCIENCE',
      category: 'MACHINE LEARNING',
      role: 'DATA & AI DEVELOPER',
      desc: 'Intelligent data analytics and machine learning solution for automated insight generation.',
      tags: ['Python', 'Machine Learning', 'Data Analytics', 'AI Models'],
      icon: <Cpu className="w-5 h-5 text-[#c83d4a]" />,
    },
    {
      id: '03',
      title: 'WEB DEVELOPMENT',
      category: '3D FRONTEND ARCHITECTURE',
      role: 'FRONTEND DEVELOPER',
      desc: 'High-performance 3D interactive web application built with modern frontend architecture.',
      tags: ['React', 'Three.js', 'TypeScript', 'Tailwind CSS'],
      icon: <Code className="w-5 h-5 text-[#c83d4a]" />,
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const perspectiveZ = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative min-h-[140vh] py-20 flex flex-col justify-start items-center overflow-hidden z-10"
    >
      {/* Sticky 3D Project Stage */}
      <div className="sticky top-20 w-full max-w-5xl mx-auto px-6 z-20 space-y-8">
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-grotesk text-xs font-bold tracking-[0.3em] text-[#c83d4a] uppercase bg-[#220b0e] px-4 py-1.5 rounded-full border border-[rgba(200,61,74,0.3)] inline-block"
          >
            04 — FEATURED CREATIONS
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl text-3d-emboss uppercase tracking-tight"
          >
            SELECTED WORK
          </motion.h2>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex justify-center gap-3">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActiveProject(idx)}
              className={`px-4 py-2 rounded-full font-grotesk text-xs font-bold tracking-widest uppercase transition-all cursor-pointer ${
                activeProject === idx
                  ? 'bg-[#c83d4a] text-[#f7e9e1] shadow-lg shadow-[#c83d4a]/40 scale-105'
                  : 'bg-[#220b0e] text-[#f7e9e1]/60 hover:text-[#f7e9e1] border border-[rgba(200,61,74,0.3)]'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* 3D Project Card Stage Container */}
        <motion.div style={{ z: perspectiveZ }} className="relative w-full max-w-3xl mx-auto aspect-[16/10] sm:aspect-[16/9] perspective-1000">
          {projects.map((p, idx) => {
            const isCurrent = activeProject === idx;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: isCurrent ? 1 : 0.25,
                  scale: isCurrent ? 1 : 0.92,
                  rotateY: isCurrent ? 0 : idx < activeProject ? -15 : 15,
                  z: isCurrent ? 0 : -150,
                  display: isCurrent ? 'block' : 'none',
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full rounded-3xl bg-[#2d1014]/90 border-2 border-[rgba(200,61,74,0.4)] shadow-2xl p-6 sm:p-10 flex flex-col justify-between backdrop-blur-md overflow-hidden group"
              >
                {/* Top Card Info */}
                <div className="flex items-center justify-between border-b border-[rgba(200,61,74,0.25)] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#120608] border border-[rgba(200,61,74,0.3)]">
                      {p.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-grotesk font-bold text-[#c83d4a] tracking-widest uppercase block">
                        {p.category}
                      </span>
                      <h3 className="font-display text-xl sm:text-3xl font-black text-[#f7e9e1] tracking-tight">
                        {p.title}
                      </h3>
                    </div>
                  </div>

                  <span className="font-serif-title text-2xl sm:text-4xl text-[#c83d4a]/40 font-bold">
                    {p.id}
                  </span>
                </div>

                {/* Role & Description */}
                <div className="space-y-3 my-auto py-2">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#c83d4a] text-[10px] font-grotesk font-bold text-[#f7e9e1] tracking-widest uppercase">
                    ROLE: {p.role}
                  </div>
                  <p className="text-sm sm:text-base text-[#f7e9e1]/90 leading-relaxed font-body font-light">
                    "{p.desc}"
                  </p>
                </div>

                {/* Tech Tags & Links */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(200,61,74,0.25)] pt-4">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg bg-[#120608] text-[9px] font-grotesk font-semibold text-[#f7e9e1]/80 border border-[rgba(200,61,74,0.2)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href="https://github.com/owandrila-codes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[#120608] hover:bg-[#c83d4a] text-[#f7e9e1] border border-[rgba(200,61,74,0.3)] transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                    <a
                      href="https://owandrila-ghosh.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-[#c83d4a] hover:bg-[#8b1e27] text-[#f7e9e1] font-grotesk font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center gap-1.5"
                    >
                      <span>VIEW PROJECT</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
