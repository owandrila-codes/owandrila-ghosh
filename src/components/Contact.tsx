import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Share2, Code2, Copy, Check, Send, Sparkles } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const emailAddress = 'owandrila2006@gmail.com';
  const linkedinUrl = 'https://www.linkedin.com/in/owandrila-ghosh-5823b7380?utm_source=share_via&utm_content=profile&utm_medium=member_android';
  const githubUrl = 'https://github.com/owandrila-codes';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setErrorMsg('');

    try {
      // Send form data to FormSubmit AJAX endpoint
      const response = await fetch(`https://formsubmit.co/ajax/${emailAddress}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch {
      setErrorMsg('Failed to send automatically. Opening your email app...');
      // Fallback to mailto
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10 border-t border-[rgba(200,61,74,0.15)] bg-[#100406]/80">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-grotesk text-xs font-bold tracking-[0.2em] text-[#c83d4a] uppercase bg-[#220b0e] px-4 py-1.5 rounded-full border border-[rgba(200,61,74,0.3)] inline-block"
          >
            GET IN TOUCH
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif-title text-4xl sm:text-6xl text-[#f7e9e1] italic"
          >
            Collaboration
          </motion.h2>

          <p className="text-sm sm:text-base text-[#f7e9e1]/80 max-w-xl mx-auto font-body">
            Interested in technology, collaboration, projects, or simply exchanging ideas? Feel free to connect!
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-[#8b1e27] to-[#c83d4a] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Direct Info & Dual Circular Connection Cards */}
          <div className="lg:col-span-7 space-y-8">
            <div className="reference-card p-8 space-y-6">
              <h3 className="font-serif-title text-2xl sm:text-3xl text-[#f7e9e1] italic">
                Direct Contact &amp; Socials
              </h3>

              {/* Email Row */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.25)]">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-xl bg-[#220b0e] text-[#c83d4a] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-grotesk font-bold text-[#c83d4a] tracking-widest uppercase block">
                      EMAIL ADDRESS
                    </span>
                    <a
                      href={`mailto:${emailAddress}`}
                      className="text-sm font-grotesk font-bold text-[#f7e9e1] hover:text-[#c83d4a] transition-colors truncate block"
                    >
                      {emailAddress}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-[#220b0e] hover:bg-[#c83d4a] text-[#f7e9e1] transition-all shrink-0 ml-2 cursor-pointer"
                  title="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-[#f7e9e1]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Dual Circular QR / Social Cards */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-grotesk font-bold text-[#c83d4a] tracking-widest uppercase block">
                  CONNECT ON LINKEDIN &amp; GITHUB
                </span>

                <div className="flex items-center gap-6">
                  {/* LinkedIn Circle Card */}
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="qr-circle-card group cursor-pointer"
                  >
                    <Share2 className="w-6 h-6 text-[#c83d4a] group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-grotesk font-bold text-[#f7e9e1] uppercase">LinkedIn</span>
                    <span className="text-[7px] text-[#c83d4a] font-mono font-bold">Connect →</span>
                  </a>

                  {/* GitHub Circle Card */}
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="qr-circle-card group cursor-pointer"
                  >
                    <Code2 className="w-6 h-6 text-[#c83d4a] group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-grotesk font-bold text-[#f7e9e1] uppercase">GitHub</span>
                    <span className="text-[7px] text-[#c83d4a] font-mono font-bold">Follow →</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Message Form Card (Powered by FormSubmit) */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="reference-card p-8 space-y-5"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-display font-extrabold text-xl text-[#f7e9e1] uppercase">
                  Send A Message
                </h4>
                <span className="text-[10px] font-grotesk font-bold text-[#c83d4a] uppercase bg-[#120608] px-3 py-1 rounded-full border border-[rgba(200,61,74,0.3)]">
                  POWERED BY FORMSUBMIT
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-grotesk font-bold text-[#c83d4a] uppercase tracking-wider block">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your name..."
                  className="w-full px-5 py-3 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.3)] text-sm text-[#f7e9e1] placeholder-[#f7e9e1]/40 focus:border-[#c83d4a] outline-none font-body"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-grotesk font-bold text-[#c83d4a] uppercase tracking-wider block">
                  YOUR EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="name@example.com"
                  className="w-full px-5 py-3 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.3)] text-sm text-[#f7e9e1] placeholder-[#f7e9e1]/40 focus:border-[#c83d4a] outline-none font-body"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-grotesk font-bold text-[#c83d4a] uppercase tracking-wider block">
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  placeholder="Write your message here..."
                  className="w-full px-5 py-3 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.3)] text-sm text-[#f7e9e1] placeholder-[#f7e9e1]/40 focus:border-[#c83d4a] outline-none font-body resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-[#c83d4a] hover:bg-[#8b1e27] text-[#f7e9e1] font-grotesk font-bold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? 'SENDING VIA FORMSUBMIT...' : submitted ? 'MESSAGE SENT!' : 'SEND MESSAGE'}</span>
                <Send className="w-4 h-4" />
              </button>

              {submitted && (
                <div className="p-3.5 rounded-2xl bg-[#8b1e27]/40 border border-[#c83d4a] text-xs font-grotesk text-[#f7e9e1] text-center shadow-lg">
                  ✓ Success! Your message has been sent to <strong>owandrila2006@gmail.com</strong> via FormSubmit.
                </div>
              )}

              {errorMsg && (
                <div className="p-3.5 rounded-2xl bg-[#220b0e] border border-[rgba(200,61,74,0.5)] text-xs font-grotesk text-[#c83d4a] text-center shadow-lg">
                  {errorMsg}
                </div>
              )}
            </motion.form>
          </div>

          {/* Right Column: Circular Orbit Real Headshot Portrait Frame */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="avatar-orbit-frame group"
            >
              {/* Inner Circular Avatar with Owandrila's Photo */}
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#2d1014] to-[#120608] border-2 border-[#c83d4a] overflow-hidden relative shadow-2xl">
                <img
                  src="/owandrila.jpg"
                  alt="Owandrila Ghosh"
                  className="w-full h-full object-cover object-center filter brightness-[1.05] contrast-[1.05] group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120608]/70 via-transparent to-transparent pointer-events-none" />

                {/* Sparkle Star Icons */}
                <Sparkles className="w-5 h-5 text-[#c83d4a] absolute top-4 right-4 animate-pulse z-10" />
                <Sparkles className="w-4 h-4 text-[#f7e9e1] absolute bottom-6 left-4 animate-pulse z-10" />
              </div>
            </motion.div>

            <div className="text-center space-y-1">
              <h4 className="font-display font-extrabold text-lg text-[#f7e9e1] uppercase tracking-wide">
                OWANDRILA GHOSH
              </h4>
              <span className="text-xs font-grotesk font-bold text-[#c83d4a] uppercase tracking-widest block">
                BCA STUDENT • SMARTBAG TEAM LEAD
              </span>
              <p className="text-xs text-[#f7e9e1]/70 max-w-xs mx-auto font-body">
                Building practical, meaningful technology solutions through AI, data &amp; software.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
