import { motion } from 'framer-motion';
import { Mail, Globe, Share2, ArrowUp, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="relative min-h-screen py-20 flex flex-col justify-between items-center overflow-hidden z-10">
      <div className="w-full max-w-4xl mx-auto px-6 relative z-20 my-auto space-y-10 text-center">
        {/* Section Heading */}
        <div className="space-y-3">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-grotesk text-xs font-bold tracking-[0.3em] text-[#c83d4a] uppercase bg-[#220b0e] px-4 py-1.5 rounded-full border border-[rgba(200,61,74,0.3)] inline-block"
          >
            05 — GET IN TOUCH
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-5xl sm:text-7xl text-3d-emboss uppercase tracking-tight"
          >
            LET'S CONNECT
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-[#f7e9e1]/90 font-serif-title italic max-w-xl mx-auto"
          >
            "Interested in technology, collaboration or building something meaningful?"
          </motion.p>
        </div>

        {/* Quick Social & Contact Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 pt-2"
        >
          <a
            href="mailto:owandrila2006@gmail.com"
            className="px-6 py-3 rounded-2xl bg-[#2d1014] hover:bg-[#c83d4a] border border-[rgba(200,61,74,0.4)] text-[#f7e9e1] font-grotesk font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg group"
          >
            <Mail className="w-4 h-4 text-[#c83d4a] group-hover:text-[#f7e9e1] transition-colors" />
            <span>EMAIL</span>
          </a>

          <a
            href="https://www.linkedin.com/in/owandrila-ghosh-5823b7380"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl bg-[#2d1014] hover:bg-[#c83d4a] border border-[rgba(200,61,74,0.4)] text-[#f7e9e1] font-grotesk font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg group"
          >
            <Share2 className="w-4 h-4 text-[#c83d4a] group-hover:text-[#f7e9e1] transition-colors" />
            <span>LINKEDIN</span>
          </a>

          <a
            href="https://github.com/owandrila-codes"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl bg-[#2d1014] hover:bg-[#c83d4a] border border-[rgba(200,61,74,0.4)] text-[#f7e9e1] font-grotesk font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg group"
          >
            <Globe className="w-4 h-4 text-[#c83d4a] group-hover:text-[#f7e9e1] transition-colors" />
            <span>GITHUB</span>
          </a>
        </motion.div>

        {/* Clean Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="reference-card p-6 sm:p-8 rounded-3xl bg-[#2d1014]/70 border border-[rgba(200,61,74,0.35)] shadow-2xl backdrop-blur-md max-w-xl mx-auto text-left"
        >
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-[#c83d4a] mx-auto animate-bounce" />
              <h3 className="font-display text-xl font-bold text-[#f7e9e1]">MESSAGE SENT!</h3>
              <p className="text-xs text-[#f7e9e1]/80 font-body">Thank you for reaching out. Owandrila will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-grotesk font-bold text-[#c83d4a] uppercase tracking-wider mb-1">YOUR NAME</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120608] border border-[rgba(200,61,74,0.3)] text-xs text-[#f7e9e1] focus:border-[#c83d4a] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-grotesk font-bold text-[#c83d4a] uppercase tracking-wider mb-1">YOUR EMAIL</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120608] border border-[rgba(200,61,74,0.3)] text-xs text-[#f7e9e1] focus:border-[#c83d4a] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-grotesk font-bold text-[#c83d4a] uppercase tracking-wider mb-1">MESSAGE</label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120608] border border-[rgba(200,61,74,0.3)] text-xs text-[#f7e9e1] focus:border-[#c83d4a] focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#c83d4a] hover:bg-[#8b1e27] text-[#f7e9e1] font-grotesk font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-[#c83d4a]/40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>SEND MESSAGE</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </motion.div>
      </div>

      {/* Back to Top Action */}
      <div className="pt-8 pb-4 text-center z-20">
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 text-xs font-grotesk font-bold text-[#c83d4a] hover:text-[#f7e9e1] tracking-[0.25em] uppercase transition-colors cursor-pointer"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
