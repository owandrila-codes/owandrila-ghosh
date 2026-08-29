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
      if (progress < 0.4) {
        setActiveProjectIdx(0);
      } else if (progress < 0.75) {
        setActiveProjectIdx(1);
      } else {
        setActiveProjectIdx(2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="projects" className="relative border-t border-[rgba(200,61,74,0.15)] bg-[#120608] max-w-full">
      
      {/* DESKTOP PINNED 3D GALLERY STAGE (hidden md:block) */}
      <div
        ref={containerRef}
        className="hidden md:block relative min-h-[125vh]"
      >
        <div className="sticky top-0 h-screen flex flex-col justify-between py-8 px-6 overflow-hidden z-10">
          <div className="text-center space-y-2 max-w-4xl mx-auto z-20 pt-4 flex flex-col items-center justify-center">
            <span className="font-grotesk text-xs font-bold tracking-[0.2em] text-[#c83d4a] uppercase bg-[#220b0e] px-4 py-1.5 rounded-full border border-[rgba(200,61,74,0.3)] inline-block text-center">
              04 / PORTFOLIO HIGHLIGHTS
            </span>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#f7e9e1] uppercase tracking-tight text-center">
              SELECTED <span className="font-serif-title italic text-[#c83d4a]">WORK</span>
            </h2>

            <div className="w-16 h-1 bg-gradient-to-r from-[#8b1e27] to-[#c83d4a] mx-auto rounded-full" />
          </div>

          <div className="relative w-full max-w-4xl mx-auto h-[400px] my-auto flex items-center justify-center perspective-[1200px]">
            {projects.map((proj, idx) => {
              const isCurrent = idx === activeProjectIdx;
              const isPast = idx < activeProjectIdx;
              let opacity = isCurrent ? 1 : isPast ? 0.25 : 0.35;
              let zIndex = isCurrent ? 30 : isPast ? 10 : 20;

              return (
                <motion.div
                  key={proj.num}
                  animate={{
                    scale: isCurrent ? 1 : isPast ? 0.88 : 0.94,
                    opacity: opacity,
                    y: isCurrent ? 0 : isPast ? -25 : 30,
                    rotateX: isCurrent ? 0 : isPast ? -8 : 8,
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{ zIndex }}
                  className={`absolute inset-0 reference-card p-6 sm:p-8 flex flex-col justify-between border-2 ${
                    isCurrent ? 'border-[#c83d4a] shadow-2xl bg-[#170a0d]' : 'border-[rgba(200,61,74,0.2)] bg-[#120608]/90'
                  } transition-all duration-300`}
                >
                  <div className="flex items-center justify-between border-b border-[rgba(200,61,74,0.25)] pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-black text-3xl sm:text-4xl text-[#f7e9e1]">
                        {proj.num}
                      </span>
                      <span className="text-xs font-grotesk font-bold text-[#c83d4a] tracking-widest uppercase bg-[#220b0e] px-3 py-1 rounded-full border border-[rgba(200,61,74,0.3)]">
                        {proj.role}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.3)]">
                      {proj.icon}
                    </div>
                  </div>

                  <div className="my-auto space-y-2.5">
                    <span className="text-[10px] font-grotesk font-bold text-[#c83d4a] uppercase tracking-widest block">
                      {proj.category}
                    </span>

                    <h3 className="font-serif-title text-2xl sm:text-4xl text-[#f7e9e1] italic">
                      {proj.title}
                    </h3>

                    <p className="text-xs sm:text-base text-[#f7e9e1]/85 leading-relaxed font-body max-w-2xl">
                      "{proj.description}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-[rgba(200,61,74,0.25)] pt-3">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.highlights.map((h) => (
                        <span key={h} className="text-[10px] font-grotesk font-bold text-[#f7e9e1]/80 bg-[#120608] px-2.5 py-1 rounded-xl border border-[rgba(200,61,74,0.25)]">
                          ✓ {h}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveModal(proj)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#c83d4a] hover:bg-[#8b1e27] text-[#f7e9e1] text-xs font-grotesk font-bold uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
                    >
                      <span>DETAILS</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-3 z-20 pb-4">
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
      </div>

      {/* DEDICATED MOBILE VERTICAL CINEMATIC STACK (block md:hidden) - PERFECTLY CENTERED */}
      <div className="block md:hidden py-16 px-5 space-y-10 max-w-md mx-auto flex flex-col items-center justify-center">
        <div className="text-center space-y-2 flex flex-col items-center justify-center w-full">
          <span className="font-grotesk text-xs font-bold tracking-[0.2em] text-[#c83d4a] uppercase bg-[#220b0e] px-4 py-1.5 rounded-full border border-[rgba(200,61,74,0.3)] inline-block text-center">
            04 / PORTFOLIO HIGHLIGHTS
          </span>

          <h2 className="font-display font-black text-3xl text-[#f7e9e1] uppercase tracking-tight text-center">
            SELECTED <span className="font-serif-title italic text-[#c83d4a]">WORK</span>
          </h2>

          <div className="w-16 h-1 bg-gradient-to-r from-[#8b1e27] to-[#c83d4a] mx-auto rounded-full" />
        </div>

        {/* Vertical Stack of Cards (~75-90vh each) */}
        <div className="space-y-8 w-full flex flex-col items-center justify-center">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="reference-card p-6 flex flex-col justify-between space-y-5 min-h-[75vh] w-full border-2 border-[rgba(200,61,74,0.35)] shadow-2xl active:scale-[0.99] transition-transform text-center items-center"
            >
              {/* Top Banner Image / Number */}
              <div className="space-y-3 w-full flex flex-col items-center">
                <div className="flex items-center justify-between border-b border-[rgba(200,61,74,0.25)] pb-3 w-full">
                  <span className="font-display font-black text-4xl text-[#c83d4a]">
                    {proj.num}
                  </span>
                  <span className="text-[10px] font-grotesk font-bold text-[#f7e9e1] uppercase bg-[#220b0e] px-3 py-1 rounded-full border border-[rgba(200,61,74,0.3)]">
                    {proj.role}
                  </span>
                </div>

                {/* Banner Frame */}
                <div className="w-full aspect-[16/9] rounded-2xl bg-gradient-to-br from-[#2d1014] to-[#120608] border border-[rgba(200,61,74,0.3)] flex flex-col justify-between p-4 relative overflow-hidden shadow-inner text-center items-center">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[9px] font-grotesk font-bold text-[#c83d4a] uppercase tracking-widest">
                      PROJECT HIGHLIGHT
                    </span>
                    {proj.icon}
                  </div>
                  <div className="font-serif-title text-xl text-[#f7e9e1] italic truncate text-center w-full">
                    {proj.title}
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2 text-center flex flex-col items-center justify-center w-full">
                <span className="text-[10px] font-grotesk font-bold text-[#c83d4a] uppercase tracking-widest block text-center">
                  {proj.category}
                </span>

                <h3 className="font-serif-title text-2xl text-[#f7e9e1] italic text-center">
                  {proj.title}
                </h3>

                <p className="text-xs text-[#f7e9e1]/85 leading-relaxed font-body text-center">
                  "{proj.description}"
                </p>
              </div>

              {/* Tech Badges & CTA */}
              <div className="space-y-4 border-t border-[rgba(200,61,74,0.2)] pt-3 w-full flex flex-col items-center justify-center">
                <div className="flex flex-wrap gap-1.5 justify-center w-full">
                  {proj.highlights.map((h) => (
                    <span key={h} className="text-[9px] font-grotesk font-bold text-[#f7e9e1]/80 bg-[#120608] px-2.5 py-1 rounded-xl border border-[rgba(200,61,74,0.25)]">
                      ✓ {h}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveModal(proj)}
                  className="w-full py-3.5 rounded-full bg-[#c83d4a] active:scale-95 text-[#f7e9e1] font-grotesk font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 min-h-[44px] cursor-pointer text-center"
                >
                  <span>VIEW DETAILS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Breakdown Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-[#120608]/95 backdrop-blur-md flex items-center justify-center p-5">
          <div className="reference-card w-full max-w-xl p-6 border-2 border-[rgba(200,61,74,0.4)] shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto text-center flex flex-col items-center">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 text-[#f7e9e1]/70 active:text-[#f7e9e1] font-bold text-lg min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-1 border-b border-[rgba(200,61,74,0.25)] pb-3 w-full text-center">
              <span className="text-[10px] font-grotesk font-bold text-[#c83d4a] uppercase tracking-widest block text-center">
                PROJECT {activeModal.num} HIGHLIGHT
              </span>
              <h3 className="font-serif-title text-2xl sm:text-3xl text-[#f7e9e1] italic text-center">
                {activeModal.title}
              </h3>
            </div>

            <p className="text-sm text-[#f7e9e1]/90 leading-relaxed font-body text-center">
              "{activeModal.description}"
            </p>

            <div className="space-y-2 w-full">
              <span className="text-xs font-grotesk font-bold text-[#c83d4a] uppercase tracking-widest block text-center">
                ROLE &amp; FOCUS
              </span>
              <div className="p-3.5 rounded-xl bg-[#120608] border border-[rgba(200,61,74,0.25)] text-xs text-[#f7e9e1] space-y-1 text-center">
                <div><strong>Role:</strong> {activeModal.role}</div>
                <div><strong>Category:</strong> {activeModal.category}</div>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-3.5 bg-[#c83d4a] active:scale-95 text-[#f7e9e1] font-grotesk font-bold text-xs rounded-full uppercase tracking-wider transition-all min-h-[44px] cursor-pointer text-center"
            >
              CLOSE BREAKDOWN
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
