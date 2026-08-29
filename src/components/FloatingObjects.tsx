export default function FloatingObjects() {
  const floatingCards = [
    { name: 'DATA SCIENCE', pos: 'top-20 -left-6 sm:left-4', animClass: 'animate-float-slow' },
    { name: 'AI', pos: 'top-40 right-2 sm:right-12', animClass: 'animate-float-delayed' },
    { name: 'JAVA', pos: 'bottom-32 -left-4 sm:left-10', animClass: 'animate-float-slow' },
    { name: 'JAVASCRIPT', pos: 'bottom-20 right-4 sm:right-16', animClass: 'animate-float-delayed' },
    { name: 'GOOGLE CLOUD', pos: 'top-1/3 -left-8 hidden md:block', animClass: 'animate-float-slow' },
    { name: 'DATABASES', pos: 'bottom-1/3 -right-8 hidden md:block', animClass: 'animate-float-delayed' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {floatingCards.map((card) => (
        <div
          key={card.name}
          className={`absolute ${card.pos} ${card.animClass} px-4 py-2 rounded-2xl bg-[#170a0d]/90 border border-[rgba(200,61,74,0.3)] shadow-xl backdrop-blur-md will-change-transform`}
        >
          <span className="font-grotesk text-[10px] font-bold text-[#c83d4a] tracking-widest uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c83d4a]" />
            {card.name}
          </span>
        </div>
      ))}
    </div>
  );
}
