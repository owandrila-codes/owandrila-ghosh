import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Brain, Cloud, Database } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('ALL');

  const categories: SkillCategory[] = [
    {
      title: 'PROGRAMMING',
      icon: <Code2 className="w-5 h-5 text-[#c8434e]" />,
      skills: ['C', 'Java', 'JavaScript'],
    },
    {
      title: 'WEB DEVELOPMENT',
      icon: <Globe className="w-5 h-5 text-[#c8434e]" />,
      skills: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    },
    {
      title: 'DATA & AI',
      icon: <Brain className="w-5 h-5 text-[#c8434e]" />,
      skills: ['Data Science', 'Artificial Intelligence', 'Data Analysis', 'AI-assisted Development'],
    },
    {
      title: 'CLOUD & DATABASES',
      icon: <Cloud className="w-5 h-5 text-[#c8434e]" />,
      skills: ['Google Cloud', 'Cloud Technologies', 'Database Systems', 'SQL / Database Technologies'],
    },
  ];

  const tabs = ['ALL', 'PROGRAMMING', 'WEB DEVELOPMENT', 'DATA & AI', 'CLOUD & DATABASES'];

  const filteredCategories = activeTab === 'ALL'
    ? categories
    : categories.filter(c => c.title === activeTab);

  return (
    <section id="skills" className="py-24 relative z-10 border-t border-[rgba(200,67,78,0.15)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-serif-italic text-lg text-[#c8434e] block mb-2">
              02 / TECHNICAL COMPETENCIES
            </span>
            <h2 className="font-display font-black text-5xl sm:text-6xl text-[#f7f0eb] uppercase leading-none tracking-tight">
              WHAT I <br />
              <span className="text-[#c8434e]">WORK WITH</span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-grotesk font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab
                    ? 'bg-[#8F3028] text-[#f7f0eb] border border-[#c8434e]/40 shadow-md'
                    : 'bg-[#170a0d] text-[#a89993] border border-[rgba(200,67,78,0.2)] hover:border-[#c8434e] hover:text-[#f7f0eb]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass-panel p-8 rounded-3xl border border-[rgba(200,67,78,0.25)] hover:border-[#c8434e] transition-all space-y-6 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-[rgba(200,67,78,0.2)] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#0a0506] border border-[rgba(200,67,78,0.3)]">
                    {cat.icon}
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-[#f7f0eb] uppercase tracking-wide">
                    {cat.title}
                  </h3>
                </div>
                <span className="text-[10px] font-grotesk font-bold text-[#c8434e] tracking-widest uppercase">
                  {cat.skills.length} SKILLS
                </span>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill) => (
                  <div
                    key={skill}
                    className="px-4 py-2.5 rounded-2xl bg-[#0a0506]/90 border border-[rgba(200,67,78,0.25)] text-xs font-grotesk font-bold text-[#f7f0eb] hover:border-[#c8434e] hover:bg-[#8F3028]/20 transition-all flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8434e]" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
