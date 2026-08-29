import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSectionNum, setActiveSectionNum] = useState('01');
  const [activeSectionId, setActiveSectionId] = useState('hero');

  const sections = [
    { num: '01', id: 'hero', label: 'HOME' },
    { num: '02', id: 'intro', label: 'INTRO' },
    { num: '03', id: 'about', label: 'ABOUT' },
    { num: '04', id: 'skills', label: 'SKILLS' },
    { num: '05', id: 'experience', label: 'JOURNEY' },
    { num: '06', id: 'projects', label: 'PROJECTS' },
    { num: '07', id: 'marquee', label: 'TECH' },
    { num: '08', id: 'statement', label: 'VISION' },
    { num: '09', id: 'contact', label: 'CONTACT' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSectionNum(sec.num);
            setActiveSectionId(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'JOURNEY', href: '#experience' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#0A0808]/90 backdrop-blur-md border-b border-[rgba(200,67,78,0.25)] shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8F3028] to-[#c8434e] flex items-center justify-center font-display font-black text-[#f7f0eb] border border-[rgba(200,67,78,0.4)] shadow-md group-hover:scale-105 transition-transform">
              OG
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base tracking-wider text-[#f7f0eb] uppercase">
                OWANDRILA
              </span>
              <span className="text-[9px] font-grotesk tracking-widest text-[#c8434e] uppercase font-bold">
                BCA • DATA SCIENCE & AI
              </span>
            </div>
          </a>

          {/* Section Indicator Badge e.g. 01 / 09 */}
          <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1b090c] border border-[rgba(200,67,78,0.3)] shadow-inner text-xs font-grotesk font-bold">
            <span className="text-[#c8434e]">SCROLL ↓</span>
            <span className="text-[#f7f0eb]">{activeSectionNum}</span>
            <span className="text-[#a89993]">/ 09</span>
          </div>

          {/* Floating Navigation Menu */}
          <nav className="hidden md:flex items-center gap-1 bg-[#170a0d]/90 px-4 py-1.5 rounded-full border border-[rgba(200,67,78,0.25)] shadow-lg">
            {navLinks.map((link) => {
              const secId = link.href.replace('#', '');
              const isActive = activeSectionId === secId;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-display font-extrabold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-[#8F3028] text-[#f7f0eb] shadow-md border border-[#c8434e]/40'
                      : 'text-[#a89993] hover:text-[#f7f0eb] hover:bg-[#220e12]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Contact Action */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#8F3028] hover:bg-[#c8434e] text-[#f7f0eb] text-xs font-display font-extrabold uppercase tracking-wider transition-all duration-200 shadow-md border border-[#c8434e]/30 hover:scale-105"
            >
              <span>CONNECT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 text-[#f7f0eb] rounded-xl bg-[#170a0d] border border-[rgba(200,67,78,0.3)]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0808]/95 backdrop-blur-xl flex flex-col justify-between p-8 md:hidden">
          <div className="pt-20">
            <div className="flex items-center justify-between text-[10px] font-grotesk tracking-widest text-[#c8434e] uppercase font-bold mb-6">
              <span>3D PORTFOLIO NAVIGATION</span>
              <span>{activeSectionNum} / 09</span>
            </div>
            <div className="flex flex-col gap-4 font-display font-extrabold text-2xl uppercase tracking-wider">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[#f7f0eb] hover:text-[#c8434e] transition-colors py-2 border-b border-[rgba(200,67,78,0.15)] flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#c8434e]" />
                </a>
              ))}
            </div>
          </div>

          <div className="text-xs text-[#a89993] border-t border-[rgba(200,67,78,0.2)] pt-4">
            OWANDRILA GHOSH • BCA DATA SCIENCE & AI
          </div>
        </div>
      )}
    </>
  );
}
