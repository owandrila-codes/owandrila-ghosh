import React from 'react';
import { motion } from 'framer-motion';

export default function Statement() {
  return (
    <section className="py-32 relative z-10 overflow-hidden bg-gradient-to-b from-[#0a0506] via-[#1b090c] to-[#0a0506] border-t border-[rgba(200,67,78,0.15)] text-center">
      <div className="max-w-5xl mx-auto px-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <span className="font-serif-italic text-xl text-[#c8434e] block">
            05 / PERSONAL PHILOSOPHY
          </span>

          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-[#f7f0eb] uppercase tracking-tight leading-none">
            CURIOUS BY NATURE. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8F3028] via-[#c8434e] to-[#f7f0eb]">
              BUILDING WITH PURPOSE.
            </span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-xl text-[#a89993] max-w-3xl mx-auto font-body leading-relaxed"
        >
          Always learning. Always experimenting. Always looking for better ways to solve real problems with technology.
        </motion.p>

        <div className="w-24 h-1 bg-gradient-to-r from-[#8F3028] to-[#c8434e] mx-auto rounded-full mt-8" />
      </div>
    </section>
  );
}
