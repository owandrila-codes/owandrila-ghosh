import { motion } from 'framer-motion';
import { GraduationCap, Users, Sparkles, BookOpen } from 'lucide-react';

export default function Journey() {
  const milestones = [
    {
      num: '01',
      tag: 'ACADEMIC EDUCATION',
      title: 'BCA DEGREE',
      subtitle: 'Data Science & Artificial Intelligence',
      desc: 'Pursuing Bachelor of Computer Applications specializing in Machine Learning logic, Data Structures & Algorithms, dataset analytics, and Computer Science core.',
      courses: ['Data Science & AI', 'C & Java', 'Data Structures', 'SQL & Databases'],
      icon: <GraduationCap className="w-5 h-5 text-[#c83d4a]" />,
    },
    {
      num: '02',
      tag: 'PROJECT LEADERSHIP',
      title: 'SMARTBAG LEAD',
      subtitle: 'Team Leader & Innovation',
      desc: 'Led the SmartBag innovation project team, directing strategic project planning, teamwork coordination, hardware-software integration, and technical presentation.',
      courses: ['Team Leadership', 'Project Planning', 'Presentation', 'Sensor Integration'],
      icon: <Users className="w-5 h-5 text-[#c83d4a]" />,
    },
    {
      num: '03',
      tag: 'CONTINUOUS LEARNING',
      title: 'FUTURE & TECH',
      subtitle: 'AI, Cloud & Software Engineering',
      desc: 'Developing technical capabilities across Google Cloud infrastructure, Node.js REST API backend services, SQL databases, and modern AI-assisted development tools.',
      courses: ['Google Cloud', 'Node.js & SQL', 'AI Dev Tools', 'Web Platforms'],
      icon: <Sparkles className="w-5 h-5 text-[#c83d4a]" />,
    },
  ];

  return (
    <section id="experience" className="py-16 md:py-20 relative z-10 border-t border-[rgba(200,61,74,0.15)] bg-[#100406]/60 overflow-hidden max-w-full">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-2 flex flex-col items-center justify-center">
          <span className="font-grotesk text-xs font-bold tracking-[0.2em] text-[#c83d4a] uppercase bg-[#220b0e] px-4 py-1.5 rounded-full border border-[rgba(200,61,74,0.3)] inline-block text-center">
            04 / EDUCATION &amp; MILESTONES
          </span>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#f7e9e1] uppercase tracking-tight text-center">
            EDUCATION &amp; <span className="font-serif-title italic text-[#c83d4a]">JOURNEY</span>
          </h2>

          <div className="w-16 h-1 bg-gradient-to-r from-[#8b1e27] to-[#c83d4a] mx-auto rounded-full" />
        </div>

        {/* Education Highlight Summary Card */}
        <div className="max-w-4xl mx-auto">
          <div className="reference-card p-5 sm:p-6 border-2 border-[rgba(200,61,74,0.35)] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
              <div className="p-3 rounded-2xl bg-[#120608] border border-[#c83d4a] shrink-0 text-[#c83d4a]">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-grotesk font-bold text-[#c83d4a] uppercase tracking-widest block text-center sm:text-left">
                  PRIMARY QUALIFICATION
                </span>
                <h3 className="font-display font-black text-base sm:text-xl text-[#f7e9e1] uppercase text-center sm:text-left">
                  BACHELOR OF COMPUTER APPLICATIONS (BCA)
                </h3>
                <div className="font-serif-title text-xs sm:text-sm text-[#c83d4a] italic text-center sm:text-left">
                  Specialization: Data Science &amp; Artificial Intelligence
                </div>
              </div>
            </div>

            <div className="shrink-0 bg-[#220b0e] px-4 py-1.5 rounded-2xl border border-[rgba(200,61,74,0.3)] text-center">
              <span className="text-[9px] font-grotesk font-bold text-[#f7e9e1]/70 uppercase block">
                STATUS
              </span>
              <span className="text-xs font-grotesk font-bold text-[#c83d4a] uppercase tracking-wider">
                IN PROGRESS
              </span>
            </div>
          </div>
        </div>

        {/* Responsive Timeline Grid / Vertical Stack */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {milestones.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="reference-card p-5 flex flex-col justify-between space-y-4 relative overflow-hidden group active:scale-[0.98] transition-transform text-center sm:text-left"
            >
              <div className="flex items-center justify-between border-b border-[rgba(200,61,74,0.2)] pb-3">
                <span className="font-display font-black text-3xl text-[#f7e9e1]">
                  {item.num}
                </span>
                <div className="p-2 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.3)] shadow-inner">
                  {item.icon}
                </div>
              </div>

              <div className="space-y-1.5 my-auto">
                <span className="text-[9px] font-grotesk font-bold text-[#c83d4a] tracking-widest uppercase block">
                  {item.tag}
                </span>

                <h3 className="font-display font-extrabold text-lg text-[#f7e9e1] uppercase tracking-wider">
                  {item.title}
                </h3>

                <div className="font-serif-title text-xs text-[#c83d4a] italic">
                  {item.subtitle}
                </div>

                <p className="text-xs text-[#f7e9e1]/80 leading-relaxed font-body">
                  {item.desc}
                </p>

                <div className="flex flex-wrap gap-1 pt-1.5 justify-center sm:justify-start">
                  {item.courses.map((c) => (
                    <span key={c} className="text-[8.5px] font-grotesk font-bold text-[#f7e9e1]/80 bg-[#120608] px-2 py-0.5 rounded-md border border-[rgba(200,61,74,0.2)]">
                      • {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-[9px] font-grotesk font-bold text-[#c83d4a] tracking-widest uppercase border-t border-[rgba(200,61,74,0.2)] pt-2">
                MILESTONE 0{idx + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
