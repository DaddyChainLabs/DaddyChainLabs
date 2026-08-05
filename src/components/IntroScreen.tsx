interface IntroScreenProps {
  onEnter: () => void;
}

export default function IntroScreen({ onEnter }: IntroScreenProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-10">
      {/* pulsing terminal glyph */}
      <div className="w-16 h-20 border-2 border-green-700 flex items-center justify-center animate-pulse">
        <span className="text-green-500 text-3xl font-bold">$</span>
      </div>

      <button
        onClick={onEnter}
        className="border border-green-700 text-green-400 tracking-[0.3em] text-sm px-8 py-3 hover:bg-green-950/40 hover:border-green-400 transition-colors"
      >
        [ ENTER ]
      </button>
    </div>
  );
}