import { motion, AnimatePresence } from 'framer-motion';

interface LoaderTypographyProps {
  stage: number;
  progress: number;
  onSkip?: () => void;
}

export default function LoaderTypography({ stage, progress, onSkip }: LoaderTypographyProps) {
  const stageInfo = [
    {
      title: '01. ROSE APPEARS',
      subtitle: 'The rose slowly emerges from the darkness.',
    },
    {
      title: '02. PETAL FALLS',
      subtitle: 'A petal gently separates and begins to fall.',
    },
    {
      title: '03. PETAL DESCENDS',
      subtitle: 'The petal falls, swirling through the air.',
    },
    {
      title: '04. PETAL DISINTEGRATES',
      subtitle: 'The petal turns into tiny particles.',
    },
    {
      title: '05. MAGIC FADES',
      subtitle: 'The particles vanish, revealing the journey.',
    },
  ];

  const currentInfo = stageInfo[Math.min(stage - 1, 4)];

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden max-w-full">
      {/* Top Editorial Stage Header */}
      <div className="pt-4 text-center max-w-xl mx-auto space-y-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentInfo.title}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1.5"
          >
            <h2 className="font-serif-title text-xl sm:text-3xl text-[#f7e9e1] tracking-[0.25em] font-normal uppercase">
              {currentInfo.title}
            </h2>
            <p className="font-serif text-xs sm:text-base text-[#f7e9e1]/75 italic tracking-wider font-light">
              "{currentInfo.subtitle}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Luxury Branding & Subtle Progress */}
      <div className="pb-4 text-center max-w-sm mx-auto space-y-3">
        {/* Branding Name */}
        <div className="font-serif text-xs sm:text-sm tracking-[0.45em] text-[#f7e9e1] uppercase font-medium">
          OWANDRILA GHOSH
        </div>

        {/* Elegant Thin Progress Bar */}
        <div className="w-36 h-[1.5px] bg-[#220b0e] mx-auto rounded-full overflow-hidden border border-[rgba(200,61,74,0.2)]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#8b1e27] to-[#c83d4a]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>

        {/* Loading Counter & Skip Trigger */}
        <div className="flex items-center justify-between text-[9px] font-grotesk tracking-[0.3em] text-[#c83d4a] uppercase font-bold px-2">
          <span>STAGE 0{stage} / 05</span>
          <span>LOADING... {progress}%</span>
        </div>

        {/* Subtle Skip Hint (pointer-events enabled) */}
        {onSkip && (
          <div className="pt-1 pointer-events-auto">
            <button
              onClick={onSkip}
              className="text-[9px] font-grotesk tracking-[0.2em] text-[#f7e9e1]/40 hover:text-[#c83d4a] transition-colors uppercase cursor-pointer"
            >
              [ SKIP INTRO ]
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
