interface LoaderTypographyProps {
  stage?: number;
  progress?: number;
  onSkip?: () => void;
}

export default function LoaderTypography({ onSkip }: LoaderTypographyProps) {
  // Clean minimal skip trigger, removing all text writing overlays
  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-end p-6 select-none overflow-hidden max-w-full">
      {onSkip && (
        <div className="pb-4 text-center pointer-events-auto">
          <button
            onClick={onSkip}
            className="text-[10px] font-grotesk tracking-[0.25em] text-[#f7e9e1]/40 hover:text-[#c83d4a] transition-colors uppercase cursor-pointer bg-black/40 px-3 py-1.5 rounded-full border border-white/10"
          >
            [ SKIP INTRO ]
          </button>
        </div>
      )}
    </div>
  );
}
