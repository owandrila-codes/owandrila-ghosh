import { motion } from 'framer-motion';

export default function Intro() {
  const statementWords = ["CURIOUS", "ABOUT", "WHAT'S", "NEXT."];

  return (
    <section id="intro" className="py-24 relative z-10 border-t border-[rgba(200,61,74,0.15)] bg-[#100406]/60">
      <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
        <span className="font-serif-title text-lg text-[#c83d4a] block italic">
          02 / INTRODUCTION &amp; STATEMENT
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
                idx === 3 ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#8b1e27] via-[#c83d4a] to-[#f7e9e1]' : 'text-[#f7e9e1]'
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
          className="text-base sm:text-xl text-[#f7e9e1]/80 max-w-3xl mx-auto font-body leading-relaxed pt-4"
        >
          "I am Owandrila Ghosh, a BCA student specializing in Data Science and Artificial Intelligence, with a strong interest in emerging technologies, software development, cloud computing, and AI-driven solutions."
        </motion.p>
      </div>
    </section>
  );
}
