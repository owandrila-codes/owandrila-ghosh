import { motion } from 'framer-motion';
import { GraduationCap, Users, Sparkles } from 'lucide-react';

export default function Journey() {
  const milestones = [
    {
      num: '01',
      title: 'BCA',
      subtitle: 'Data Science & Artificial Intelligence',
      desc: 'Pursuing degree specializing in ML logic, dataset analytics, and computer science.',
      icon: <GraduationCap className="w-5 h-5 text-[#c83d4a]" />,
    },
    {
      num: '02',
      title: 'SMARTBAG',
      subtitle: 'Team Leader',
      desc: 'Led SmartBag innovation project team, mastering planning, teamwork and presentation.',
      icon: <Users className="w-5 h-5 text-[#c83d4a]" />,
    },
    {
      num: '03',
      title: 'NOW',
      subtitle: 'Exploring AI, Data, Software & Cloud',
      desc: 'Developing technical capabilities across GCP, Node.js, databases and AI tools.',
      icon: <Sparkles className="w-5 h-5 text-[#c83d4a]" />,
    },
  ];

  return (
    <section id="experience" className="py-16 relative z-10 border-t border-[rgba(200,61,74,0.15)] bg-[#100406]/60">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <span className="font-grotesk text-xs font-bold tracking-[0.2em] text-[#c83d4a] uppercase bg-[#220b0e] px-4 py-1.5 rounded-full border border-[rgba(200,61,74,0.3)] inline-block">
            04 / TIMELINE &amp; MILESTONES
          </span>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#f7e9e1] uppercase tracking-tight">
            MY <span className="font-serif-title italic text-[#c83d4a]">JOURNEY</span>
          </h2>

          <div className="w-16 h-1 bg-gradient-to-r from-[#8b1e27] to-[#c83d4a] mx-auto rounded-full" />
        </div>

        {/* Compact 3-Step Horizontal Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
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

              <div className="space-y-1.5 my-auto">
                <h3 className="font-display font-extrabold text-xl text-[#f7e9e1] uppercase tracking-wider">
                  {item.title}
                </h3>

                <div className="font-serif-title text-xs text-[#c83d4a] italic">
                  {item.subtitle}
                </div>

                <p className="text-xs text-[#f7e9e1]/80 leading-relaxed font-body">
                  {item.desc}
                </p>
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
