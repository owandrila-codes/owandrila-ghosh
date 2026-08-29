import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, ArrowUpRight, Layers } from 'lucide-react';

interface ProjectItem {
  num: string;
  title: string;
  category: string;
  description: string;
  role: string;
  highlights: string[];
  tech: string[];
  isSpotlight?: boolean;
}

export default function Projects() {
  const [activeModal, setActiveModal] = useState<ProjectItem | null>(null);

  const projectsGrid: ProjectItem[] = [
    {
      num: '01',
      title: 'SmartBag — Intelligent Companion',
      category: 'HARDWARE & SOFTWARE INNOVATION',
      description: 'As Team Leader, I guided the SmartBag project, integrating sensor tracking, safety alerts, and travel convenience features.',
      role: 'TEAM LEADER',
      highlights: ['Team Leadership', 'Project Planning', 'Presentation', 'Sensor Tracking'],
      tech: ['Team Leadership', 'Project Planning', 'Data Tracking', 'Presentation'],
      isSpotlight: true,
    },
    {
      num: '02',
      title: 'AI & Data Science Dashboard',
      category: 'DATA SCIENCE & AI METRICS',
      description: 'An interactive visualization concept designed to explore dataset analytics, machine learning model metrics, and automated predictions.',
      role: 'DATA SCIENCE STUDENT',
      highlights: ['Data Analysis', 'Algorithm Metrics', 'Prediction Visualization'],
      tech: ['JavaScript', 'Data Science', 'AI Metrics', 'Visualization'],
    },
    {
      num: '03',
      title: 'Google Cloud Data Service',
      category: 'CLOUD & DATABASE BACKEND',
      description: 'Backend concept exploring Node.js REST API endpoints, Google Cloud Storage, and SQL database querying for data processing.',
      role: 'BACKEND DEVELOPER',
      highlights: ['GCP Infrastructure', 'REST Endpoints', 'SQL Normalization'],
      tech: ['Node.js', 'Google Cloud', 'SQL', 'REST APIs'],
    },
    {
      num: '04',
      title: 'Interactive Web Applications',
      category: 'FRONTEND DEVELOPMENT',
      description: 'High-performance interactive web experiences built using modern frontend tools, glassmorphism UI tokens, and 3D scroll effects.',
      role: 'FRONTEND DEVELOPER',
      highlights: ['Responsive Layouts', 'Glassmorphism UI', '3D Scroll Engine'],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Node.js'],
    },
  ];

  return (
    <section id="projects" className="py-24 relative z-10 border-t border-[rgba(200,61,74,0.15)]">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-grotesk text-xs font-bold tracking-[0.2em] text-[#c83d4a] uppercase bg-[#220b0e] px-4 py-1.5 rounded-full border border-[rgba(200,61,74,0.3)] inline-block"
          >
            PORTFOLIO SHOWCASE
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif-title text-4xl sm:text-6xl text-[#f7e9e1] italic"
          >
            Featured Works
          </motion.h2>

          <div className="w-24 h-1 bg-gradient-to-r from-[#8b1e27] to-[#c83d4a] mx-auto rounded-full" />
        </div>

        {/* 1. Overlapping 3D MacOS Window Stack Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative min-h-[480px]"
        >
          {/* Layer 3: Back Window */}
          <div className="absolute top-0 left-6 right-6 h-[340px] rounded-3xl bg-[#1c0a0c]/60 border border-[rgba(200,61,74,0.15)] opacity-40 translate-y-[-24px] scale-[0.92] pointer-events-none hidden md:block" />

          {/* Layer 2: Middle Window */}
          <div className="absolute top-0 left-3 right-3 h-[380px] rounded-3xl bg-[#220b0e]/80 border border-[rgba(200,61,74,0.25)] opacity-75 translate-y-[-12px] scale-[0.96] pointer-events-none hidden md:block" />

          {/* Layer 1: Front Spotlight Window */}
          <div className="relative z-10 reference-card overflow-hidden border-2 border-[rgba(200,61,74,0.4)] shadow-2xl">
            <div className="bg-[#120608] px-6 py-3 border-b border-[rgba(200,61,74,0.25)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="font-grotesk text-[11px] font-bold text-[#f7e9e1]/70 bg-[#220b0e] px-4 py-1 rounded-full border border-[rgba(200,61,74,0.3)]">
                smartbag-companion.tech — Team Leader Spotlight
              </div>
              <div className="w-12" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-10 items-center">
              <div className="lg:col-span-5 relative">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#2d1014] to-[#120608] border border-[rgba(200,61,74,0.3)] flex flex-col justify-between p-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-grotesk font-bold text-[#c83d4a] tracking-widest uppercase">
                      SPOTLIGHT PROJECT
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#c83d4a] text-[#f7e9e1] font-grotesk font-extrabold text-[10px] uppercase flex items-center gap-1">
                      <Crown className="w-3.5 h-3.5" /> TEAM LEAD
                    </span>
                  </div>

                  <div className="my-auto text-center space-y-2">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-[#8b1e27]/40 border border-[#c83d4a] flex items-center justify-center text-[#f7e9e1]">
                      <Layers className="w-8 h-8 text-[#c83d4a]" />
                    </div>
                    <h3 className="font-display font-extrabold text-2xl text-[#f7e9e1] uppercase">
                      SMARTBAG
                    </h3>
                  </div>

                  <div className="text-[10px] font-grotesk text-[#f7e9e1]/70 uppercase tracking-wider text-center border-t border-[rgba(200,61,74,0.25)] pt-3">
                    ROLE: TEAM LEADER
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <span className="step-cream-tag text-xs inline-block">
                  TEAM LEADERSHIP &amp; INNOVATION
                </span>

                <h3 className="font-serif-title text-3xl sm:text-4xl text-[#f7e9e1] italic">
                  SmartBag — Intelligent Companion
                </h3>

                <p className="text-sm text-[#f7e9e1]/80 leading-relaxed font-body">
                  As the <strong>Team Leader</strong>, I led the SmartBag project, gaining hands-on experience in <strong>teamwork, project planning, technical presentation, and innovation</strong>. The project integrates tracking and user convenience features into modern smart gear.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {projectsGrid[0].highlights.map((h) => (
                    <span key={h} className="px-3 py-1 rounded-xl bg-[#120608] border border-[rgba(200,61,74,0.3)] text-xs font-grotesk font-bold text-[#f7e9e1]">
                      ✓ {h}
                    </span>
                  ))}
                </div>

                <div className="pt-3 flex flex-wrap gap-4">
                  <button
                    onClick={() => setActiveModal(projectsGrid[0])}
                    className="px-6 py-3 rounded-full bg-[#c83d4a] hover:bg-[#8b1e27] text-[#f7e9e1] font-grotesk font-bold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
                  >
                    <span>Project Breakdown</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {projectsGrid.slice(1).map((proj, idx) => (
            <motion.div
              key={proj.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="reference-card p-8 flex flex-col justify-between space-y-5 group"
            >
              <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-[#220b0e] to-[#120608] border border-[rgba(200,61,74,0.3)] flex flex-col justify-between p-5 overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-2xl text-[#f7e9e1]">
                    {proj.num}
                  </span>
                  <span className="text-[10px] font-grotesk font-bold text-[#c83d4a] tracking-widest uppercase bg-[#120608] px-3 py-1 rounded-full border border-[rgba(200,61,74,0.3)]">
                    {proj.category}
                  </span>
                </div>

                <div className="my-auto text-center">
                  <h4 className="font-serif-title text-2xl text-[#f7e9e1] italic">
                    {proj.title}
                  </h4>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-[#f7e9e1]/80 leading-relaxed font-body">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {proj.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-lg bg-[#120608] border border-[rgba(200,61,74,0.25)] text-[10px] font-grotesk font-bold text-[#f7e9e1]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveModal(proj)}
                    className="inline-flex items-center gap-1.5 text-xs font-grotesk font-bold text-[#c83d4a] hover:text-[#f7e9e1] uppercase tracking-wider transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-[#120608]/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="reference-card w-full max-w-2xl p-8 border-2 border-[rgba(200,61,74,0.4)] shadow-2xl relative space-y-6">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-2 text-[#f7e9e1]/70 hover:text-[#f7e9e1] font-bold text-lg"
            >
              ✕
            </button>

            <div className="space-y-2 border-b border-[rgba(200,61,74,0.25)] pb-4">
              <span className="text-xs font-grotesk font-bold text-[#c83d4a] uppercase tracking-widest block">
                PROJECT {activeModal.num} BREAKDOWN
              </span>
              <h3 className="font-serif-title text-3xl text-[#f7e9e1] italic">
                {activeModal.title}
              </h3>
            </div>

            <p className="text-sm text-[#f7e9e1]/80 leading-relaxed font-body">
              {activeModal.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-grotesk font-bold text-[#c83d4a] uppercase tracking-widest block">
                ROLE &amp; COMPETENCIES
              </span>
              <div className="p-4 rounded-xl bg-[#120608] border border-[rgba(200,61,74,0.25)] text-xs text-[#f7e9e1] space-y-1">
                <div><strong>Role:</strong> {activeModal.role}</div>
                <div><strong>Focus:</strong> Innovation, Planning, Technical Delivery</div>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-3.5 bg-[#c83d4a] hover:bg-[#8b1e27] text-[#f7e9e1] font-grotesk font-bold text-xs rounded-full uppercase tracking-wider transition-all"
            >
              CLOSE BREAKDOWN
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
