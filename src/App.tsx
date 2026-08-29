import { Suspense, lazy } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy loading components via React.lazy + Suspense for optimal initial page bundle load
const ThreeCanvas3D = lazy(() => import('./components/ThreeCanvas3D'));
const Hero = lazy(() => import('./components/Hero'));
const Intro = lazy(() => import('./components/Intro'));
const About = lazy(() => import('./components/About'));
const Stats = lazy(() => import('./components/Stats'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Journey = lazy(() => import('./components/Journey'));
const Marquee = lazy(() => import('./components/Marquee'));
const Statement = lazy(() => import('./components/Statement'));
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

      {/* Main Single Page Experience Lazily Loaded via Suspense */}
      <main className="relative z-10 space-y-0">
        <Suspense fallback={<SectionFallback />}>
          <Hero />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Intro />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Stats />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Journey />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Marquee />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Statement />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
