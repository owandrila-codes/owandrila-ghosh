export default function Marquee() {
  const items = [
    'C',
    'JAVA',
    'JAVASCRIPT',
    'HTML5',
    'CSS3',
    'NODE.JS',
    'DATABASES',
    'SQL',
    'GOOGLE CLOUD',
    'DATA SCIENCE',
    'ARTIFICIAL INTELLIGENCE',
    'AI ASSISTED DEV',
    'SMARTBAG LEAD',
  ];

  // Repeat for continuous seamless loop
  const list = [...items, ...items, ...items];

  return (
    <div id="marquee" className="py-8 bg-[#170a0d] border-y border-[rgba(200,61,74,0.2)] overflow-hidden select-none relative z-10">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {list.map((item, idx) => (
          <div key={`${item}-${idx}`} className="flex items-center gap-8">
            <span className="font-display font-black text-xl sm:text-2xl text-[#f7e9e1] tracking-wider uppercase hover:text-[#c83d4a] transition-colors">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#8b1e27]" />
          </div>
        ))}
      </div>
    </div>
  );
}
