import { motion } from 'framer-motion';
import { GraduationCap, Award, Compass, BookOpen } from 'lucide-react';

export default function Journey() {
  const educationTags = ['Data Analytics', 'AI & Machine Learning', 'Data Structures', 'DBMS', 'Web Engineering', 'Cloud Services'];

  const milestones = [
    {
      id: '01',
      title: 'EDUCATION — BCA DEGREE',
      subtitle: 'Data Science & Artificial Intelligence',
      desc: 'Specialized undergraduate degree in computer applications with coursework in data analytics, machine learning algorithms, databases, and software engineering.',
      icon: <GraduationCap className="w-6 h-6 text-[#c83d4a]" />,
      hasTags: true,
    },
    {
      id: '02',
      title: 'SMARTBAG PROJECT',
      subtitle: 'Team Leader',
      desc: 'Led a smart IoT technology initiative emphasizing teamwork, hardware integration, technical planning, and innovation.',
      icon: <Award className="w-6 h-6 text-[#c83d4a]" />,
      hasTags: false,
    },
    {
      id: '03',
      title: 'NOW & BEYOND',
      subtitle: 'Exploring AI, Data, Software & Cloud',
      desc: 'Building intelligent applications, participating in lab problem solving, and expanding cloud infrastructure expertise.',
      icon: <Compass className="w-6 h-6 text-[#c83d4a]" />,
      hasTags: false,
    },
  ];

  return (
    <section id="experience" className="relative min-h-screen py-20 flex flex-col justify-center items-center overflow-hidden z-10">
      <div className="w-full max-w-5xl mx-auto px-6 relative z-20 space-y-12">
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-grotesk text-xs font-bold tracking-[0.3em] text-[#c83d4a] uppercase bg-[#220b0e] px-4 py-1.5 rounded-full border border-[rgba(200,61,74,0.3)] inline-block"
          >
            04 — EDUCATION &amp; JOURNEY
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl text-3d-emboss uppercase tracking-tight"
          >
            EDUCATION &amp; JOURNEY
          </motion.h2>
        </div>

        {/* Compact 3-Milestone Horizontal / Diagonal 3D Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {milestones.map((m, idx) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="reference-card p-6 rounded-3xl bg-[#2d1014]/80 border-2 border-[rgba(200,61,74,0.35)] shadow-xl flex flex-col justify-between space-y-4 backdrop-blur-md relative overflow-hidden group"
            >
              <div className="flex items-center justify-between border-b border-[rgba(200,61,74,0.25)] pb-3">
                <span className="font-serif-title text-3xl font-bold text-[#c83d4a]">
                  {m.id}
                </span>
                <div className="p-2.5 rounded-xl bg-[#120608] border border-[rgba(200,61,74,0.3)]">
                  {m.icon}
                </div>
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="text-[10px] font-grotesk font-bold text-[#c83d4a] tracking-widest uppercase">
                  {m.subtitle}
                </div>
                <h3 className="font-display text-lg font-extrabold text-[#f7e9e1] tracking-tight">
                  {m.title}
                </h3>
                <p className="text-xs text-[#f7e9e1]/80 leading-relaxed font-body font-light pt-1">
                  {m.desc}
                </p>

                {m.hasTags && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {educationTags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-[#120608] text-[8px] font-grotesk font-semibold text-[#f7e9e1]/80 border border-[rgba(200,61,74,0.25)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1.5 pt-2 text-[9px] font-grotesk font-bold text-[#c83d4a] tracking-wider uppercase">
                <BookOpen className="w-3.5 h-3.5" />
                <span>ACADEMIC VERIFIED</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
