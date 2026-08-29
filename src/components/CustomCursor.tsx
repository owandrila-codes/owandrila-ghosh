import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on desktop screens (1024px+)
    if (window.innerWidth < 1024) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const projectCard = target.closest('[data-cursor="view"]');
      if (projectCard) {
        setIsHovered(true);
        setCursorText('VIEW');
        return;
      }

      const isInteractive = target.closest('a, button, input, textarea, [role="button"]');
      if (isInteractive) {
        setIsHovered(true);
        setCursorText('');
        return;
      }

      setIsHovered(false);
      setCursorText('');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small Dot / Outer Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? (cursorText ? 3 : 1.8) : 1})`,
        }}
      >
        <div
          className={`rounded-full transition-all duration-200 flex items-center justify-center ${
            cursorText
              ? 'w-16 h-16 bg-[#8b1e27]/90 text-[#f7e9e1] border border-[#c83d4a]'
              : isHovered
              ? 'w-10 h-10 bg-[#c83d4a]/30 border border-[#c83d4a]'
              : 'w-4 h-4 bg-[#c83d4a]'
          }`}
        >
          {cursorText && (
            <span className="text-[10px] font-display font-extrabold tracking-widest text-[#f7e9e1] scale-75">
              {cursorText}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
