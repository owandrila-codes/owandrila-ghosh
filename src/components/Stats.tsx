import React from 'react';
import { motion } from 'framer-motion';

export default function Stats() {
  const statsList = [
    { num: '01', title: 'BCA STUDENT', sub: 'DATA SCIENCE & AI' },
    { num: '02', title: 'SPECIALIZATION', sub: 'MACHINE LEARNING & DATA' },
    { num: '03', title: 'SMARTBAG', sub: 'TEAM LEAD & PROJECT INNOVATION' },
    { num: '04', title: 'STACK & TOOLS', sub: 'C, JAVA, JS, GCP, AI ASSISTED' },
  ];

  return (
    <section className="py-16 relative z-10 border-t border-[rgba(200,67,78,0.15)] bg-[#0f0709]/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsList.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-3xl border border-[rgba(200,67,78,0.2)] hover:border-[#c8434e] transition-all group"
            >
              <span className="font-display font-black text-5xl text-[#f7f0eb] group-hover:text-[#c8434e] transition-colors block mb-2">
                {item.num}
              </span>
              <h3 className="font-display font-extrabold text-sm text-[#f7f0eb] uppercase tracking-wider">
                {item.title}
              </h3>
              <p className="text-[11px] font-grotesk font-bold text-[#a89993] tracking-widest uppercase mt-1">
                {item.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
