import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Share2, Code2, Copy, Check, Send, Sparkles, Star } from 'lucide-react';

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
      // Send form data + rating to FormSubmit AJAX endpoint
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
      // Mailto fallback
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
            GET IN TOUCH &amp; FEEDBACK
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif-title text-4xl sm:text-6xl text-[#f7e9e1] italic"
          >
            Collaboration &amp; Feedback
          </motion.h2>

          <p className="text-sm sm:text-base text-[#f7e9e1]/80 max-w-xl mx-auto font-body">
            Interested in technology, collaboration, projects, or leaving website feedback? Feel free to connect!
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-[#8b1e27] to-[#c83d4a] mx-auto rounded-full" />
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info + Star Rating Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Card */}
            <div className="reference-card p-6 space-y-5">
              <h3 className="font-serif-title text-2xl text-[#f7e9e1] italic">
                Direct Contact
              </h3>

              {/* Email Row */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.25)]">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-xl bg-[#220b0e] text-[#c83d4a] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[9px] font-grotesk font-bold text-[#c83d4a] tracking-widest uppercase block">
                      EMAIL ADDRESS
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
                  className="p-2 rounded-xl bg-[#220b0e] hover:bg-[#c83d4a] text-[#f7e9e1] transition-all shrink-0 ml-2 cursor-pointer"
                  title="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-[#f7e9e1]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Social Circles */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-grotesk font-bold text-[#c83d4a] tracking-widest uppercase block">
                  SOCIAL CONNECT
                </span>

                <div className="flex items-center gap-4">
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="qr-circle-card group cursor-pointer"
                    style={{ width: '95px', height: '95px' }}
                  >
                    <Share2 className="w-5 h-5 text-[#c83d4a] group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-grotesk font-bold text-[#f7e9e1] uppercase">LinkedIn</span>
                    <span className="text-[7px] text-[#c83d4a] font-mono font-bold">Connect →</span>
                  </a>

                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="qr-circle-card group cursor-pointer"
                    style={{ width: '95px', height: '95px' }}
                  >
                    <Code2 className="w-5 h-5 text-[#c83d4a] group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-grotesk font-bold text-[#f7e9e1] uppercase">GitHub</span>
                    <span className="text-[7px] text-[#c83d4a] font-mono font-bold">Follow →</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Profile Avatar Card */}
            <div className="reference-card p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="avatar-orbit-frame group" style={{ width: '160px', height: '160px' }}>
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#2d1014] to-[#120608] border-2 border-[#c83d4a] overflow-hidden relative shadow-2xl">
                  <img
                    src="/owandrila.jpg"
                    alt="Owandrila Ghosh"
                    className="w-full h-full object-cover object-center filter brightness-[1.05] contrast-[1.05] group-hover:scale-110 transition-transform duration-500"
                  />
                  <Sparkles className="w-4 h-4 text-[#c83d4a] absolute top-3 right-3 animate-pulse z-10" />
                </div>
              </div>

              <div className="space-y-0.5">
                <h4 className="font-display font-extrabold text-base text-[#f7e9e1] uppercase tracking-wide">
                  OWANDRILA GHOSH
                </h4>
                <span className="text-[10px] font-grotesk font-bold text-[#c83d4a] tracking-widest uppercase block">
                  BCA STUDENT • SMARTBAG TEAM LEAD
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Sleek Feedback Form */}
          <div className="lg:col-span-7">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="reference-card p-8 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-[rgba(200,61,74,0.25)] pb-4">
                <h4 className="font-display font-extrabold text-xl text-[#f7e9e1] uppercase">
                  Send Message &amp; Rating
                </h4>
                <span className="text-[10px] font-grotesk font-bold text-[#c83d4a] uppercase bg-[#120608] px-3 py-1 rounded-full border border-[rgba(200,61,74,0.3)]">
                  INSTANT DISPATCH
                </span>
              </div>

              {/* Star Rating Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-grotesk font-bold text-[#c83d4a] uppercase tracking-wider block">
                  RATE YOUR EXPERIENCE
                </label>
                <div className="flex items-center gap-2 bg-[#120608] px-4 py-2.5 rounded-2xl border border-[rgba(200,61,74,0.3)] w-fit">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-[#c83d4a] hover:scale-125 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= (hoverRating || rating)
                            ? 'fill-[#c83d4a] text-[#c83d4a]'
                            : 'text-[#f7e9e1]/30'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-grotesk font-bold text-[#f7e9e1] ml-2">
                    {rating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* 2-Column Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full px-4 py-3 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.3)] text-sm text-[#f7e9e1] placeholder-[#f7e9e1]/40 focus:border-[#c83d4a] outline-none font-body"
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
                    className="w-full px-4 py-3 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.3)] text-sm text-[#f7e9e1] placeholder-[#f7e9e1]/40 focus:border-[#c83d4a] outline-none font-body"
                  />
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-grotesk font-bold text-[#c83d4a] uppercase tracking-wider block">
                  INQUIRY CATEGORY
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.3)] text-sm text-[#f7e9e1] outline-none font-body cursor-pointer"
                >
                  <option value="Project Collaboration">Project Collaboration</option>
                  <option value="Data Science & AI Inquiry">Data Science &amp; AI Inquiry</option>
                  <option value="Website & Design Feedback">Website &amp; Design Feedback</option>
                  <option value="General Networking">General Networking</option>
                </select>
              </div>

              {/* Message Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-grotesk font-bold text-[#c83d4a] uppercase tracking-wider block">
                  YOUR MESSAGE
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Write your message or feedback here..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#120608] border border-[rgba(200,61,74,0.3)] text-sm text-[#f7e9e1] placeholder-[#f7e9e1]/40 focus:border-[#c83d4a] outline-none font-body resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-[#c83d4a] hover:bg-[#8b1e27] text-[#f7e9e1] font-grotesk font-bold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? 'SENDING MESSAGE...' : submitted ? 'MESSAGE SENT SUCCESSFULLY!' : 'SUBMIT MESSAGE & RATING'}</span>
                <Send className="w-4 h-4" />
              </button>

              {submitted && (
                <div className="p-3.5 rounded-2xl bg-[#8b1e27]/40 border border-[#c83d4a] text-xs font-grotesk text-[#f7e9e1] text-center shadow-lg">
                  ✓ Thank you, <strong>{formData.name || 'Friend'}</strong>! Your {rating}-Star rating &amp; message have been delivered to <strong>owandrila2006@gmail.com</strong>.
                </div>
              )}
            </motion.form>
          </div>

        </div>

      </div>
    </section>
  );
}
