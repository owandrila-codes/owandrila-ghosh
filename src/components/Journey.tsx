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
      courses: ['Data Science & AI', 'C & Java Programming', 'Data Structures & Algorithms', 'Database Systems & SQL'],
      icon: <GraduationCap className="w-6 h-6 text-[#c83d4a]" />,
    },
    {
      num: '02',
      tag: 'PROJECT LEADERSHIP',
      title: 'SMARTBAG LEAD',
      subtitle: 'Team Leader & Innovation',
      desc: 'Led the SmartBag innovation project team, directing strategic project planning, teamwork coordination, hardware-software integration, and technical presentation.',
      courses: ['Team Leadership', 'Project Planning', 'Public Presentation', 'Sensor Integration'],
      icon: <Users className="w-6 h-6 text-[#c83d4a]" />,
    },
    {
      num: '03',
      tag: 'CONTINUOUS LEARNING',
      title: 'FUTURE & TECH',
      subtitle: 'AI, Cloud & Software Engineering',
      desc: 'Developing technical capabilities across Google Cloud infrastructure, Node.js REST API backend services, SQL databases, and modern AI-assisted development tools.',
      courses: ['Google Cloud Services', 'Node.js & Databases', 'AI-assisted Development', 'Web Platforms'],
      icon: <Sparkles className="w-6 h-6 text-[#c83d4a]" />,
    },
  ];

  return (
    <section id="experience" className="py-16 relative z-10 border-t border-[rgba(200,61,74,0.15)] bg-[#100406]/60">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <span className="font-grotesk text-xs font-bold tracking-[0.2em] text-[#c83d4a] uppercase bg-[#220b0e] px-4 py-1.5 rounded-full border border-[rgba(200,61,74,0.3)] inline-block">
            04 / EDUCATION &amp; MILESTONES
          </span>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#f7e9e1] uppercase tracking-tight">
            EDUCATION &amp; <span className="font-serif-title italic text-[#c83d4a]">JOURNEY</span>
          </h2>

          <div className="w-16 h-1 bg-gradient-to-r from-[#8b1e27] to-[#c83d4a] mx-auto rounded-full" />
        </div>

        {/* Education Highlight Summary Card */}
        <div className="max-w-4xl mx-auto">
          <div className="reference-card p-6 border-2 border-[rgba(200,61,74,0.35)] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-[#120608] border border-[#c83d4a] shrink-0 text-[#c83d4a]">
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-grotesk font-bold text-[#c83d4a] uppercase tracking-widest block">
                  PRIMARY QUALIFICATION
                </span>
                <h3 className="font-display font-black text-lg sm:text-xl text-[#f7e9e1] uppercase">
                  BACHELOR OF COMPUTER APPLICATIONS (BCA)
                </h3>
                <div className="font-serif-title text-sm text-[#c83d4a] italic">
                  Specialization: Data Science &amp; Artificial Intelligence
                </div>
              </div>
            </div>

            <div className="shrink-0 bg-[#220b0e] px-4 py-2 rounded-2xl border border-[rgba(200,61,74,0.3)] text-center">
              <span className="text-[10px] font-grotesk font-bold text-[#f7e9e1]/70 uppercase block">
                STATUS
              </span>
              <span className="text-xs font-grotesk font-bold text-[#c83d4a] uppercase tracking-wider">
                IN PROGRESS
              </span>
            </div>
          </div>
        </div>

        {/* 3-Step Horizontal Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {milestones.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="reference-card p-6 flex flex-col justify-between space-y-5 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between border-b border-[rgba(200,61,74,0.2)] pb-3">
                <span className="font-display font-black text-3xl text-[#f7e9e1] group-hover:text-[#c83d4a] transition-colors">
                  {item.num}
                </span>
                <div className="p-2.5 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.3)] shadow-inner">
                  {item.icon}
                </div>
              </div>

              <div className="space-y-2 my-auto">
                <span className="text-[9px] font-grotesk font-bold text-[#c83d4a] tracking-widest uppercase block">
                  {item.tag}
                </span>

                <h3 className="font-display font-extrabold text-xl text-[#f7e9e1] uppercase tracking-wider">
                  {item.title}
                </h3>

                <div className="font-serif-title text-xs text-[#c83d4a] italic">
                  {item.subtitle}
                </div>

                <p className="text-xs text-[#f7e9e1]/80 leading-relaxed font-body">
                  {item.desc}
                </p>

                {/* Coursework Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.courses.map((c) => (
                    <span key={c} className="text-[9px] font-grotesk font-bold text-[#f7e9e1]/80 bg-[#120608] px-2 py-0.5 rounded-md border border-[rgba(200,61,74,0.2)]">
                      • {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-[10px] font-grotesk font-bold text-[#c83d4a] tracking-widest uppercase border-t border-[rgba(200,61,74,0.2)] pt-2.5">
                MILESTONE 0{idx + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
