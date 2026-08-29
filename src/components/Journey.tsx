import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Laptop, Users, Sparkles } from 'lucide-react';

export default function Journey() {
  const steps = [
    {
      num: '01',
      title: 'BCA SPECIALIZATION',
      subtitle: 'Data Science & Artificial Intelligence',
      desc: 'Pursuing Bachelor of Computer Applications focusing on foundational computer science concepts, machine learning logic, dataset analytics, and software engineering.',
      icon: <GraduationCap className="w-5 h-5 text-[#c8434e]" />,
    },
    {
      num: '02',
      title: 'HANDS-ON LEARNING',
      subtitle: 'Projects • Labs • Tech Events',
      desc: 'Engaging in university computer science labs, hackathons, tech workshops, and problem-solving coding challenges with C, Java, JavaScript, and SQL.',
      icon: <Laptop className="w-5 h-5 text-[#c8434e]" />,
    },
    {
      num: '03',
      title: 'SMARTBAG LEADERSHIP',
      subtitle: 'Team Leadership • Planning • Presentation',
      desc: 'Led the SmartBag project team, developing teamwork, structural planning, public speech presentation, and technical innovation skills.',
      icon: <Users className="w-5 h-5 text-[#c8434e]" />,
    },
    {
      num: '04',
      title: 'CONTINUOUS LEARNING',
      subtitle: 'AI • Software • Cloud • Data',
      desc: 'Continuously developing technical capabilities with Google Cloud services, modern AI-assisted development tools, and data-driven problem solving.',
      icon: <Sparkles className="w-5 h-5 text-[#c8434e]" />,
    },
  ];

  return (
    <section id="experience" className="py-24 relative z-10 border-t border-[rgba(200,67,78,0.15)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-serif-italic text-lg text-[#c8434e] block mb-2">
            04 / TIMELINE & MILESTONES
          </span>
          <h2 className="font-display font-black text-5xl sm:text-6xl text-[#f7f0eb] uppercase leading-none tracking-tight">
            MY <br />
            <span className="text-[#c8434e]">JOURNEY</span>
          </h2>
        </div>

        {/* Timeline Items */}
        <div className="relative max-w-4xl mx-auto">
          {/* Animated Connecting Vertical Line */}
          <div className="absolute top-0 bottom-0 left-[27px] sm:left-1/2 w-0.5 bg-gradient-to-b from-[#8F3028] via-[#c8434e] to-[#8F3028] -translate-x-1/2 opacity-40" />

          <div className="space-y-12">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot Marker */}
                  <div className="absolute left-[27px] sm:left-1/2 -translate-x-1/2 top-0 z-20 w-12 h-12 rounded-full bg-[#170a0d] border-2 border-[#c8434e] flex items-center justify-center shadow-lg">
                    {step.icon}
                  </div>

                  {/* Content Card */}
                  <div className="w-full sm:w-[calc(50%-2.5rem)] pl-16 sm:pl-0">
                    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[rgba(200,67,78,0.25)] hover:border-[#c8434e] transition-all space-y-3 shadow-xl">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-black text-3xl text-[#c8434e]">
                          {step.num}
                        </span>
                        <span className="text-[10px] font-grotesk font-bold text-[#a89993] tracking-widest uppercase">
                          MILESTONE
                        </span>
                      </div>

                      <h3 className="font-display font-extrabold text-xl text-[#f7f0eb] uppercase">
                        {step.title}
                      </h3>

                      <div className="font-serif-italic text-sm text-[#c8434e]">
                        {step.subtitle}
                      </div>

                      <p className="text-xs sm:text-sm text-[#a89993] leading-relaxed font-body">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
