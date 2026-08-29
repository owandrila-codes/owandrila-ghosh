import { motion } from 'framer-motion';
import { Code2, Globe, Brain, Cloud, Sparkles } from 'lucide-react';

export default function About() {
  const skillsList = [
    { name: 'C', cat: 'PROG', icon: <Code2 className="w-3.5 h-3.5 text-[#c83d4a]" /> },
    { name: 'JAVA', cat: 'PROG', icon: <Code2 className="w-3.5 h-3.5 text-[#c83d4a]" /> },
    { name: 'JAVASCRIPT', cat: 'WEB', icon: <Globe className="w-3.5 h-3.5 text-[#c83d4a]" /> },
    { name: 'HTML', cat: 'WEB', icon: <Globe className="w-3.5 h-3.5 text-[#c83d4a]" /> },
    { name: 'CSS', cat: 'WEB', icon: <Globe className="w-3.5 h-3.5 text-[#c83d4a]" /> },
    { name: 'NODE.JS', cat: 'WEB', icon: <Globe className="w-3.5 h-3.5 text-[#c83d4a]" /> },
    { name: 'DATABASES', cat: 'DATA', icon: <Cloud className="w-3.5 h-3.5 text-[#c83d4a]" /> },
    { name: 'GOOGLE CLOUD', cat: 'CLOUD', icon: <Cloud className="w-3.5 h-3.5 text-[#c83d4a]" /> },
    { name: 'DATA SCIENCE', cat: 'AI', icon: <Brain className="w-3.5 h-3.5 text-[#c83d4a]" /> },
    { name: 'AI', cat: 'AI', icon: <Sparkles className="w-3.5 h-3.5 text-[#c83d4a]" /> },
  ];

  return (
    <section id="about" className="py-24 relative z-10 border-t border-[rgba(200,61,74,0.15)] bg-[#100406]/70 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        
        {/* Biography Block */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <span className="font-grotesk text-xs font-bold tracking-[0.2em] text-[#c83d4a] uppercase bg-[#220b0e] px-4 py-1.5 rounded-full border border-[rgba(200,61,74,0.3)] inline-block">
              02 / IDENTITY &amp; STACK
            </span>

            <h2 className="font-display font-black text-4xl sm:text-6xl text-[#f7e9e1] uppercase tracking-tight">
              A LITTLE <span className="font-serif-title italic text-[#c83d4a]">ABOUT ME</span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-[#8b1e27] to-[#c83d4a] mx-auto rounded-full" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-2xl text-[#f7e9e1] leading-relaxed font-body"
          >
            "I’m <strong className="text-[#c83d4a]">Owandrila Ghosh</strong>, a BCA student specializing in Data Science and Artificial Intelligence. I’m interested in emerging technologies, software development, cloud computing and AI-driven solutions.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-[#f7e9e1]/80 leading-relaxed font-body max-w-3xl mx-auto"
          >
            I enjoy learning through hands-on projects, practical labs and problem-solving challenges, with a focus on building practical and meaningful technology."
          </motion.p>
        </div>

        {/* 3D Floating Skill Field Block */}
        <div className="space-y-8 pt-4">
          <div className="text-center space-y-2">
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#f7e9e1] uppercase tracking-wider">
              I WORK WITH
            </h3>
            <p className="text-xs font-grotesk font-bold text-[#c83d4a] uppercase tracking-widest">
              TECHNICAL COMPETENCIES &amp; TOOLS
            </p>
          </div>

          {/* 3D Skill Grid / Floating Orbit Field */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {skillsList.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="reference-card p-5 flex flex-col items-center justify-center text-center space-y-2 group cursor-default"
              >
                <div className="p-3 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.3)] group-hover:border-[#c83d4a] transition-colors shadow-inner">
                  {skill.icon}
                </div>
                <span className="font-display font-extrabold text-xs sm:text-sm text-[#f7e9e1] uppercase tracking-wider group-hover:text-[#c83d4a] transition-colors">
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
