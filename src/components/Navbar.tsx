import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState('hero');

  // Exact 5-section sequence matching DOM order in App.tsx:
  // 01 Hero -> 02 About & Skills -> 03 Education & Journey -> 04 Selected Work -> 05 Contact
  const sections = [
    { id: 'hero' },
    { id: 'about' },
    { id: 'experience' },
    { id: 'projects' },
    { id: 'contact' },
  ];

  // Nav links matching exact page flow: ABOUT -> EDUCATION -> WORK -> CONTACT
  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'EDUCATION', href: '#experience' },
    { label: 'WORK', href: '#projects' },
    { label: 'CONTACT', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Accurate viewport scroll position detection
      const scrollPosition = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSectionId(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#120608]/90 backdrop-blur-md border-b border-[rgba(200,61,74,0.25)] shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b1e27] to-[#c83d4a] flex items-center justify-center font-display font-black text-[#f7e9e1] border border-[rgba(200,61,74,0.4)] shadow-md group-hover:scale-105 transition-transform">
              OG
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base tracking-wider text-[#f7e9e1] uppercase">
                OWANDRILA
              </span>
              <span className="text-[9px] font-grotesk tracking-widest text-[#c83d4a] uppercase font-bold">
                BCA • DATA SCIENCE &amp; AI
              </span>
            </div>
          </a>

          {/* Floating Navigation Menu: ABOUT -> EDUCATION -> WORK -> CONTACT */}
          <nav className="hidden md:flex items-center gap-1 bg-[#170a0d]/90 px-4 py-1.5 rounded-full border border-[rgba(200,61,74,0.25)] shadow-lg">
            {navLinks.map((link) => {
              const secId = link.href.replace('#', '');
              const isActive = activeSectionId === secId;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-display font-extrabold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-[#8b1e27] text-[#f7e9e1] shadow-md border border-[#c83d4a]/40'
                      : 'text-[#f7e9e1]/70 hover:text-[#f7e9e1] hover:bg-[#220b0e]'
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
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#c83d4a] hover:bg-[#8b1e27] text-[#f7e9e1] text-xs font-display font-extrabold uppercase tracking-wider transition-all duration-200 shadow-md border border-[#c83d4a]/30 hover:scale-105"
            >
              <span>CONNECT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 text-[#f7e9e1] rounded-xl bg-[#170a0d] border border-[rgba(200,61,74,0.3)] cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#120608]/95 backdrop-blur-xl flex flex-col justify-between p-8 md:hidden">
          <div className="pt-20">
            <div className="text-[10px] font-grotesk tracking-widest text-[#c83d4a] uppercase font-bold mb-6">
              PORTFOLIO NAVIGATION
            </div>
            <div className="flex flex-col gap-4 font-display font-extrabold text-2xl uppercase tracking-wider">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[#f7e9e1] hover:text-[#c83d4a] transition-colors py-2 border-b border-[rgba(200,61,74,0.15)] flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#c83d4a]" />
                </a>
              ))}
            </div>
          </div>

          <div className="text-xs text-[#f7e9e1]/70 border-t border-[rgba(200,61,74,0.2)] pt-4">
            OWANDRILA GHOSH • BCA DATA SCIENCE &amp; AI
          </div>
        </div>
      )}
    </>
  );
}
