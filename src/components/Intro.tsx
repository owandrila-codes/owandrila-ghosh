import React from 'react';
import { motion } from 'framer-motion';

export default function Intro() {
  const statementWords = ["CURIOUS", "ABOUT", "WHAT'S", "NEXT."];

  return (
    <section id="intro" className="py-24 relative z-10 border-t border-[rgba(200,67,78,0.15)] bg-[#0f0709]/60">
      <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
        <span className="font-serif-italic text-lg text-[#c8434e] block">
          02 / INTRODUCTION & STATEMENT
        </span>

        {/* Character / Word Progress Reveal */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {statementWords.map((word, idx) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight ${
                idx === 3 ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#8F3028] via-[#c8434e] to-[#f7f0eb]' : 'text-[#f7f0eb]'
              }`}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-base sm:text-xl text-[#a89993] max-w-3xl mx-auto font-body leading-relaxed pt-4"
        >
          "I am Owandrila Ghosh, a BCA student specializing in Data Science and Artificial Intelligence, with a strong interest in emerging technologies, software development, cloud computing, and AI-driven solutions."
        </motion.p>
      </div>
    </section>
  );
}
