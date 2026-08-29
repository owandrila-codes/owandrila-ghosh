import { motion } from 'framer-motion';

export default function Statement() {
  return (
    <section id="statement" className="py-32 relative z-10 overflow-hidden bg-gradient-to-b from-[#120608] via-[#1b090c] to-[#120608] border-t border-[rgba(200,61,74,0.15)] text-center">
      <div className="max-w-5xl mx-auto px-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <span className="font-serif-title text-xl text-[#c83d4a] block italic">
            05 / PERSONAL PHILOSOPHY
          </span>

          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-[#f7e9e1] uppercase tracking-tight leading-none">
            CURIOUS BY NATURE. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b1e27] via-[#c83d4a] to-[#f7e9e1]">
              BUILDING WITH PURPOSE.
            </span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-xl text-[#f7e9e1]/80 max-w-3xl mx-auto font-body leading-relaxed"
        >
          Always learning. Always experimenting. Always looking for better ways to solve real problems with technology.
        </motion.p>

        <div className="w-24 h-1 bg-gradient-to-r from-[#8b1e27] to-[#c83d4a] mx-auto rounded-full mt-8" />
      </div>
    </section>
  );
}
