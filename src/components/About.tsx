import { motion } from 'framer-motion';
import { Lightbulb, Layers, Laptop, Sparkles, Users, Presentation } from 'lucide-react';

export default function About() {
  const steps = [
    {
      num: '01',
      title: 'PROBLEM ANALYSIS & IDEATION',
      desc: 'Analyzing real-world requirements, dataset structures, and defining clear project objectives before writing code.',
      isCreamTag: true,
      icon: <Lightbulb className="w-5 h-5 text-[#120608]" />,
    },
    {
      num: '02',
      title: 'TECH STACK SELECTION',
      desc: 'Selecting optimal tools—C, Java, JavaScript, Google Cloud, or Database systems tailored to the core problem.',
      icon: <Layers className="w-5 h-5 text-[#c83d4a]" />,
    },
    {
      num: '03',
      title: 'HANDS-ON BUILDING',
      desc: 'Developing clean, modular code through university computer labs, tech hackathons, and iterative prototyping.',
      icon: <Laptop className="w-5 h-5 text-[#c83d4a]" />,
    },
    {
      num: '04',
      title: 'AI-ASSISTED ACCELERATION',
      desc: 'Leveraging modern AI-assisted coding tools and prompt engineering to accelerate UI design and concept builds.',
      icon: <Sparkles className="w-5 h-5 text-[#c83d4a]" />,
    },
    {
      num: '05',
      title: 'TEAM COLLABORATION',
      desc: 'Leading project teams (e.g. SmartBag), organizing workflows, conducting peer reviews, and resolving bottlenecks.',
      icon: <Users className="w-5 h-5 text-[#c83d4a]" />,
    },
    {
      num: '06',
      title: 'PRESENTATION & PITCHING',
      desc: 'Crafting demonstration slide decks, pitching ideas to audiences, and documenting technical workflows.',
      isCreamTag: true,
      icon: <Presentation className="w-5 h-5 text-[#120608]" />,
    },
  ];

  return (
    <section id="about" className="py-24 relative z-10 border-t border-[rgba(200,61,74,0.15)] bg-[#100406]/60">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center space-y-3 mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-grotesk text-xs font-bold tracking-[0.2em] text-[#c83d4a] uppercase bg-[#220b0e] px-4 py-1.5 rounded-full border border-[rgba(200,61,74,0.3)] inline-block"
          >
            PROCESS &amp; WORKFLOW
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif-title text-4xl sm:text-6xl text-[#f7e9e1] italic"
          >
            Stages of Work
          </motion.h2>

          <div className="w-24 h-1 bg-gradient-to-r from-[#8b1e27] to-[#c83d4a] mx-auto rounded-full" />
        </div>

        {/* 6-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="reference-card p-8 flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-4xl text-[#f7e9e1]">
                  {step.num}
                </span>

                {step.isCreamTag ? (
                  <div className="step-cream-tag flex items-center gap-2 shadow-md">
                    <span className="text-xs">{step.title}</span>
                    {step.icon}
                  </div>
                ) : (
                  <div className="p-2.5 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.3)]">
                    {step.icon}
                  </div>
                )}
              </div>

              {!step.isCreamTag && (
                <h3 className="font-display font-extrabold text-lg text-[#f7e9e1] uppercase tracking-wide">
                  {step.title}
                </h3>
              )}

              <p className="text-sm text-[#f7e9e1]/75 leading-relaxed font-body">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
