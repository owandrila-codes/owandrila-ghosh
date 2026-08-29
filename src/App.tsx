import { Suspense, lazy } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import EnchantedRoseLoader from './components/EnchantedRoseLoader';

// Lazy loading 5 core 3D interactive sections for optimal bundle load & fast initial render
const ThreeCanvas3D = lazy(() => import('./components/ThreeCanvas3D'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Journey = lazy(() => import('./components/Journey'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

// Fallback Section Loader Component
function SectionFallback() {
  return (
    <div className="py-20 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#c83d4a] border-t-transparent animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#120608] text-[#f7e9e1] selection:bg-[#c83d4a] selection:text-[#f7e9e1] overflow-x-hidden font-sans">
      {/* Cinematic Enchanted Rose Loading Experience Overlay */}
      <EnchantedRoseLoader />

      {/* 3D WebGL Background Scene */}
      <Suspense fallback={null}>
        <ThreeCanvas3D />
      </Suspense>

      {/* Subtle Noise Texture Overlay */}
      <div className="grain-overlay" />

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Sticky Translucent Floating Navbar */}
      <Navbar />

      {/* Main 5-Section 3D Story Experience */}
      <main className="relative z-10 space-y-0">
        {/* 01 — HERO (~100vh) */}
        <Suspense fallback={<SectionFallback />}>
          <Hero />
        </Suspense>

        {/* 02 — ABOUT + SKILLS (~100vh) */}
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>

        {/* 03 — EDUCATION & JOURNEY (~100vh) */}
        <Suspense fallback={<SectionFallback />}>
          <Journey />
        </Suspense>

        {/* 04 — SELECTED WORK (Pinned 3D Scroll Gallery Stage ~125vh) */}
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>

        {/* 05 — CONTACT (~100vh) */}
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}
