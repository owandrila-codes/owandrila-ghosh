import { motion } from 'framer-motion';
import { Code2, Globe, Brain, Cloud, Sparkles } from 'lucide-react';

export default function About() {
  const skillsList = [
    { name: 'C', icon: <Code2 className="w-4 h-4 text-[#c83d4a]" /> },
    { name: 'JAVA', icon: <Code2 className="w-4 h-4 text-[#c83d4a]" /> },
    { name: 'JAVASCRIPT', icon: <Globe className="w-4 h-4 text-[#c83d4a]" /> },
    { name: 'HTML', icon: <Globe className="w-4 h-4 text-[#c83d4a]" /> },
    { name: 'CSS', icon: <Globe className="w-4 h-4 text-[#c83d4a]" /> },
    { name: 'NODE.JS', icon: <Globe className="w-4 h-4 text-[#c83d4a]" /> },
    { name: 'DATABASES', icon: <Cloud className="w-4 h-4 text-[#c83d4a]" /> },
    { name: 'GOOGLE CLOUD', icon: <Cloud className="w-4 h-4 text-[#c83d4a]" /> },
    { name: 'DATA SCIENCE', icon: <Brain className="w-4 h-4 text-[#c83d4a]" /> },
    { name: 'AI', icon: <Sparkles className="w-4 h-4 text-[#c83d4a]" /> },
  ];

  return (
    <section id="about" className="py-16 md:py-20 relative z-10 border-t border-[rgba(200,61,74,0.15)] bg-[#100406]/70 overflow-hidden max-w-full">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 space-y-12">
        
        {/* Biography Block */}
        <div className="max-w-3xl mx-auto text-center space-y-4 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-2 text-center flex flex-col items-center justify-center w-full"
          >
            <span className="font-grotesk text-xs font-bold tracking-[0.2em] text-[#c83d4a] uppercase bg-[#220b0e] px-4 py-1.5 rounded-full border border-[rgba(200,61,74,0.3)] inline-block text-center">
              02 / IDENTITY &amp; STACK
            </span>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#f7e9e1] uppercase tracking-tight text-center">
              ABOUT <span className="font-serif-title italic text-[#c83d4a]">ME</span>
            </h2>

            <div className="w-16 h-1 bg-gradient-to-r from-[#8b1e27] to-[#c83d4a] mx-auto rounded-full" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base sm:text-xl text-[#f7e9e1] leading-relaxed font-body text-center"
          >
            "I’m <strong className="text-[#c83d4a]">Owandrila Ghosh</strong>, a BCA student specializing in Data Science and Artificial Intelligence. I’m interested in emerging technologies, software development, cloud computing and AI-driven solutions.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xs sm:text-base text-[#f7e9e1]/80 leading-relaxed font-body max-w-2xl mx-auto text-center"
          >
            I enjoy learning through hands-on projects, practical labs and problem-solving challenges, with a focus on building practical and meaningful technology."
          </motion.p>
        </div>

        {/* Mobile-Friendly Compact Skills Grid */}
        <div className="space-y-5 pt-2 flex flex-col items-center justify-center w-full">
          <div className="text-center space-y-1 w-full flex flex-col items-center justify-center">
            <h3 className="font-display font-black text-xl sm:text-2xl text-[#f7e9e1] uppercase tracking-wider text-center">
              I WORK WITH
            </h3>
            <p className="text-[11px] font-grotesk font-bold text-[#c83d4a] uppercase tracking-widest text-center">
              TECHNICAL COMPETENCIES
            </p>
          </div>

          {/* 2-Column on 320-389px, 3-Column on 390px+, 5-Column on md+ */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-4xl mx-auto w-full">
            {skillsList.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="reference-card p-3.5 sm:p-4 flex flex-col items-center justify-center text-center space-y-2 group cursor-default active:scale-95 transition-transform"
              >
                <div className="p-2.5 rounded-xl bg-[#120608] border border-[rgba(200,61,74,0.3)] shadow-inner flex items-center justify-center">
                  {skill.icon}
                </div>
                <span className="font-display font-extrabold text-xs text-[#f7e9e1] uppercase tracking-wider text-center">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
