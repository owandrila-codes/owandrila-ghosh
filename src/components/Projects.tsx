import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, ArrowUpRight, Brain, Globe } from 'lucide-react';

interface ProjectItem {
  num: string;
  title: string;
  category: string;
  role: string;
  description: string;
  highlights: string[];
  icon: React.ReactNode;
}

export default function Projects() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [activeModal, setActiveModal] = useState<ProjectItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects: ProjectItem[] = [
    {
      num: '01',
      title: 'SMARTBAG',
      category: 'HARDWARE & SOFTWARE INNOVATION',
      role: 'TEAM LEADER',
      description: 'A smart technology project focused on practical problem solving, teamwork, planning and innovation.',
      highlights: ['Team Leadership', 'Project Planning', 'Presentation', 'Sensor Tracking'],
      icon: <Crown className="w-6 h-6 text-[#c83d4a]" />,
    },
    {
      num: '02',
      title: 'AI / DATA SCIENCE',
      category: 'DATA SCIENCE & AI METRICS',
      role: 'DATA SCIENCE STUDENT',
      description: 'Data analytics and machine learning model metrics visualization platform.',
      highlights: ['Dataset Analysis', 'Algorithm Metrics', 'Prediction Models'],
      icon: <Brain className="w-6 h-6 text-[#c83d4a]" />,
    },
    {
      num: '03',
      title: 'WEB DEVELOPMENT',
      category: 'CLOUD & WEB PLATFORM',
      role: 'SOFTWARE DEVELOPER',
      description: 'Modern high-performance web applications and cloud backend integrations.',
      highlights: ['Glassmorphism UI', '3D WebGL Canvas', 'GCP Backend'],
      icon: <Globe className="w-6 h-6 text-[#c83d4a]" />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      if (progress < 0.35) {
        setActiveProjectIdx(0);
      } else if (progress < 0.7) {
        setActiveProjectIdx(1);
      } else {
        setActiveProjectIdx(2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative min-h-[200vh] border-t border-[rgba(200,61,74,0.15)] bg-[#120608]"
    >
      {/* Sticky 100vh Pinned 3D Viewport Stage */}
      <div className="sticky top-0 h-screen flex flex-col justify-between py-12 px-6 overflow-hidden z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-4xl mx-auto z-20">
          <span className="font-grotesk text-xs font-bold tracking-[0.2em] text-[#c83d4a] uppercase bg-[#220b0e] px-4 py-1.5 rounded-full border border-[rgba(200,61,74,0.3)] inline-block">
            03 / PORTFOLIO HIGHLIGHTS
          </span>

          <h2 className="font-display font-black text-4xl sm:text-6xl text-[#f7e9e1] uppercase tracking-tight">
            SELECTED <span className="font-serif-title italic text-[#c83d4a]">WORK</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-[#8b1e27] to-[#c83d4a] mx-auto rounded-full" />
        </div>

        {/* 3D Gallery Stage (3 Cards overlapping with perspective depth) */}
        <div className="relative w-full max-w-4xl mx-auto h-[420px] my-auto flex items-center justify-center perspective-[1200px]">
          {projects.map((proj, idx) => {
            const isCurrent = idx === activeProjectIdx;
            const isPast = idx < activeProjectIdx;

            // Compute 3D Spatial Transforms
            let opacity = 0;
            let zIndex = 0;

            if (isCurrent) {
              opacity = 1;
              zIndex = 30;
            } else if (isPast) {
              opacity = 0.3;
              zIndex = 10;
            } else {
              opacity = 0.4;
              zIndex = 20;
            }

            return (
              <motion.div
                key={proj.num}
                animate={{
                  scale: isCurrent ? 1 : isPast ? 0.88 : 0.94,
                  opacity: opacity,
                  y: isCurrent ? 0 : isPast ? -30 : 35,
                  rotateX: isCurrent ? 0 : isPast ? -8 : 8,
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ zIndex }}
                className={`absolute inset-0 reference-card p-8 sm:p-10 flex flex-col justify-between border-2 ${
                  isCurrent ? 'border-[#c83d4a] shadow-2xl bg-[#170a0d]' : 'border-[rgba(200,61,74,0.2)] bg-[#120608]/90'
                } transition-all duration-500`}
              >
                {/* Top Row */}
                <div className="flex items-center justify-between border-b border-[rgba(200,61,74,0.25)] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-display font-black text-4xl text-[#f7e9e1]">
                      {proj.num}
                    </span>
                    <span className="text-xs font-grotesk font-bold text-[#c83d4a] tracking-widest uppercase bg-[#220b0e] px-3 py-1 rounded-full border border-[rgba(200,61,74,0.3)]">
                      {proj.role}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.3)]">
                    {proj.icon}
                  </div>
                </div>

                {/* Center Description */}
                <div className="my-auto space-y-3">
                  <span className="text-[10px] font-grotesk font-bold text-[#c83d4a] uppercase tracking-widest block">
                    {proj.category}
                  </span>

                  <h3 className="font-serif-title text-3xl sm:text-5xl text-[#f7e9e1] italic">
                    {proj.title}
                  </h3>

                  <p className="text-sm sm:text-lg text-[#f7e9e1]/85 leading-relaxed font-body max-w-2xl">
                    "{proj.description}"
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between border-t border-[rgba(200,61,74,0.25)] pt-4">
                  <div className="flex flex-wrap gap-2">
                    {proj.highlights.map((h) => (
                      <span key={h} className="text-[10px] font-grotesk font-bold text-[#f7e9e1]/80 bg-[#120608] px-3 py-1 rounded-xl border border-[rgba(200,61,74,0.25)]">
                        ✓ {h}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveModal(proj)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#c83d4a] hover:bg-[#8b1e27] text-[#f7e9e1] text-xs font-grotesk font-bold uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
                  >
                    <span>DETAILS</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 3D Gallery Stage Controls Indicator */}
        <div className="flex items-center justify-center gap-3 z-20">
          {projects.map((p, idx) => (
            <button
              key={p.num}
              onClick={() => setActiveProjectIdx(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === activeProjectIdx ? 'w-10 bg-[#c83d4a]' : 'w-2.5 bg-[#f7e9e1]/30 hover:bg-[#f7e9e1]/60'
              }`}
              title={`View project ${p.num}`}
            />
          ))}
        </div>

      </div>

      {/* Project Breakdown Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-[#120608]/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="reference-card w-full max-w-2xl p-8 border-2 border-[rgba(200,61,74,0.4)] shadow-2xl relative space-y-6">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-2 text-[#f7e9e1]/70 hover:text-[#f7e9e1] font-bold text-lg cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-2 border-b border-[rgba(200,61,74,0.25)] pb-4">
              <span className="text-xs font-grotesk font-bold text-[#c83d4a] uppercase tracking-widest block">
                PROJECT {activeModal.num} HIGHLIGHT
              </span>
              <h3 className="font-serif-title text-3xl sm:text-4xl text-[#f7e9e1] italic">
                {activeModal.title}
              </h3>
            </div>

            <p className="text-base text-[#f7e9e1]/90 leading-relaxed font-body">
              "{activeModal.description}"
            </p>

            <div className="space-y-2">
              <span className="text-xs font-grotesk font-bold text-[#c83d4a] uppercase tracking-widest block">
                ROLE &amp; FOCUS
              </span>
              <div className="p-4 rounded-xl bg-[#120608] border border-[rgba(200,61,74,0.25)] text-xs text-[#f7e9e1] space-y-1">
                <div><strong>Role:</strong> {activeModal.role}</div>
                <div><strong>Category:</strong> {activeModal.category}</div>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-3.5 bg-[#c83d4a] hover:bg-[#8b1e27] text-[#f7e9e1] font-grotesk font-bold text-xs rounded-full uppercase tracking-wider transition-all cursor-pointer"
            >
              CLOSE BREAKDOWN
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
