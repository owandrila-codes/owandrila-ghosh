import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Share2, Code2, Copy, Check, Send, ArrowUp, Star } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Project Collaboration',
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

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${emailAddress}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Category: formData.category,
          Rating: `${rating} / 5 Stars`,
          Message: formData.message,
          _subject: `Portfolio Feedback (${rating}★) from ${formData.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', category: 'Project Collaboration', message: '' });
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        throw new Error('Fallback trigger');
      }
    } catch {
      const subject = encodeURIComponent(`Portfolio Feedback (${rating}★) from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nCategory: ${formData.category}\nRating: ${rating}/5 Stars\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 relative z-10 border-t border-[rgba(200,61,74,0.15)] bg-[#100406]/90 min-h-screen flex flex-col justify-between max-w-full">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 w-full space-y-8 my-auto">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <span className="font-grotesk text-xs font-bold tracking-[0.2em] text-[#c83d4a] uppercase bg-[#220b0e] px-4 py-1.5 rounded-full border border-[rgba(200,61,74,0.3)] inline-block">
            05 / CONTACT &amp; CONNECT
          </span>

          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-[#f7e9e1] uppercase tracking-tight">
            LET'S <span className="font-serif-title italic text-[#c83d4a]">CONNECT</span>
          </h2>

          <p className="text-xs sm:text-lg text-[#f7e9e1]/85 max-w-xl mx-auto font-body">
            "Interested in technology, collaboration or building something meaningful?"
          </p>

          <div className="w-16 h-1 bg-gradient-to-r from-[#8b1e27] to-[#c83d4a] mx-auto rounded-full" />
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Touch-Friendly Channel Buttons (min-h-[44px]) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="reference-card p-5 space-y-4">
              <h3 className="font-serif-title text-xl text-[#f7e9e1] italic">
                Direct Channels
              </h3>

              {/* Email Row */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.25)] min-h-[44px]">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="p-2 rounded-xl bg-[#220b0e] text-[#c83d4a] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[9px] font-grotesk font-bold text-[#c83d4a] tracking-widest uppercase block">
                      EMAIL
                    </span>
                    <a
                      href={`mailto:${emailAddress}`}
                      className="text-xs font-grotesk font-bold text-[#f7e9e1] hover:text-[#c83d4a] transition-colors truncate block"
                    >
                      {emailAddress}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-[#220b0e] hover:bg-[#c83d4a] text-[#f7e9e1] transition-all shrink-0 ml-2 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer active:scale-95"
                  title="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-[#f7e9e1]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Social Channels */}
              <div className="grid grid-cols-2 gap-3 pt-0.5">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.25)] active:border-[#c83d4a] flex flex-col items-center justify-center gap-1.5 group transition-all cursor-pointer min-h-[50px] active:scale-95"
                >
                  <Share2 className="w-4 h-4 text-[#c83d4a] group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-grotesk font-bold text-[#f7e9e1] uppercase">LINKEDIN →</span>
                </a>

                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.25)] active:border-[#c83d4a] flex flex-col items-center justify-center gap-1.5 group transition-all cursor-pointer min-h-[50px] active:scale-95"
                >
                  <Code2 className="w-4 h-4 text-[#c83d4a] group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-grotesk font-bold text-[#f7e9e1] uppercase">GITHUB →</span>
                </a>
              </div>
            </div>

            {/* Back to Top Prompt */}
            <button
              onClick={handleScrollToTop}
              className="w-full py-3.5 rounded-2xl bg-[#220b0e] active:bg-[#8b1e27] border border-[rgba(200,61,74,0.35)] text-[#f7e9e1] text-xs font-grotesk font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer min-h-[48px] active:scale-95"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-4 h-4 text-[#c83d4a]" />
            </button>
          </div>

          {/* Right Column: FormSubmit Form */}
          <div className="lg:col-span-7">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="reference-card p-5 sm:p-6 space-y-3.5"
            >
              <div className="flex items-center justify-between border-b border-[rgba(200,61,74,0.25)] pb-2.5">
                <h4 className="font-display font-extrabold text-base text-[#f7e9e1] uppercase">
                  Quick Message
                </h4>
                {/* Star Rating Selection */}
                <div className="flex items-center gap-1 bg-[#120608] px-3 py-1 rounded-full border border-[rgba(200,61,74,0.3)]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-[#c83d4a] active:scale-125 transition-transform cursor-pointer min-w-[28px] min-h-[28px] flex items-center justify-center"
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${
                          star <= (hoverRating || rating) ? 'fill-[#c83d4a] text-[#c83d4a]' : 'text-[#f7e9e1]/30'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Name..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.3)] text-xs text-[#f7e9e1] placeholder-[#f7e9e1]/40 focus:border-[#c83d4a] outline-none font-body min-h-[44px]"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Email..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.3)] text-xs text-[#f7e9e1] placeholder-[#f7e9e1]/40 focus:border-[#c83d4a] outline-none font-body min-h-[44px]"
                />
              </div>

              {/* Category */}
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.3)] text-xs text-[#f7e9e1] outline-none font-body cursor-pointer min-h-[44px]"
              >
                <option value="Project Collaboration">Project Collaboration</option>
                <option value="Data Science & AI Inquiry">Data Science &amp; AI Inquiry</option>
                <option value="Website & Design Feedback">Website &amp; Design Feedback</option>
                <option value="General Networking">General Networking</option>
              </select>

              {/* Message */}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={3}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.3)] text-xs text-[#f7e9e1] placeholder-[#f7e9e1]/40 focus:border-[#c83d4a] outline-none font-body resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-[#c83d4a] active:bg-[#8b1e27] text-[#f7e9e1] font-grotesk font-bold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-h-[48px] active:scale-95"
              >
                <span>{loading ? 'SENDING...' : submitted ? 'SENT!' : 'SEND MESSAGE'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>

              {submitted && (
                <div className="p-2.5 rounded-2xl bg-[#8b1e27]/40 border border-[#c83d4a] text-[11px] font-grotesk text-[#f7e9e1] text-center">
                  ✓ Message delivered to <strong>owandrila2006@gmail.com</strong>!
                </div>
              )}
            </motion.form>
          </div>

        </div>

        {/* Footer Credit Line */}
        <div className="pt-4 text-center text-xs text-[#f7e9e1]/60 font-body border-t border-[rgba(200,61,74,0.15)]">
          © 2026 Owandrila Ghosh • BCA Data Science &amp; AI Portfolio
        </div>

      </div>
    </section>
  );
}
