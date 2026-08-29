import { motion } from 'framer-motion';

export default function Stats() {
  const statsList = [
    { num: '01', title: 'BCA STUDENT', sub: 'DATA SCIENCE & AI' },
    { num: '02', title: 'SPECIALIZATION', sub: 'MACHINE LEARNING & DATA' },
    { num: '03', title: 'SMARTBAG', sub: 'TEAM LEAD & PROJECT INNOVATION' },
    { num: '04', title: 'STACK & TOOLS', sub: 'C, JAVA, JS, GCP, AI ASSISTED' },
  ];

  return (
    <section className="py-16 relative z-10 border-t border-[rgba(200,61,74,0.15)] bg-[#100406]/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsList.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="reference-card p-6 flex flex-col justify-between group"
            >
              <span className="font-display font-black text-5xl text-[#f7e9e1] group-hover:text-[#c83d4a] transition-colors block mb-2">
                {item.num}
              </span>
              <div>
                <h3 className="font-display font-extrabold text-sm text-[#f7e9e1] uppercase tracking-wider">
                  {item.title}
                </h3>
                <p className="text-[11px] font-grotesk font-bold text-[#c83d4a] tracking-widest uppercase mt-1">
                  {item.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
