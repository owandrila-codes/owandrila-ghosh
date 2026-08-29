import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 relative z-10 border-t border-[rgba(200,67,78,0.2)] bg-[#0a0506]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-display font-black text-lg text-[#f7f0eb] uppercase tracking-wider">
            OWANDRILA GHOSH
          </span>
          <span className="text-[10px] font-grotesk font-bold text-[#c8434e] tracking-widest uppercase mt-0.5">
            BCA • DATA SCIENCE • AI
          </span>
        </div>

        <div className="text-xs text-[#a89993] font-body text-center">
          © 2026 Owandrila Ghosh. All rights reserved.
        </div>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#170a0d] hover:bg-[#8F3028] text-[#f7f0eb] text-xs font-grotesk font-bold uppercase tracking-wider border border-[rgba(200,67,78,0.3)] transition-all hover:scale-105"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#c8434e]" />
        </button>
      </div>
    </footer>
  );
}
