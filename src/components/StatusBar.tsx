import { useEffect, useState } from "react";

interface StatusBarProps {
  visible: boolean;
}

export default function StatusBar({ visible }: StatusBarProps) {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setBlink((b) => !b), 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`w-full bg-black border-b border-green-900 px-4 py-2 transition-all duration-700 overflow-hidden ${
        visible ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="max-w-3xl mx-auto flex flex-wrap gap-x-4 gap-y-1 items-center justify-center text-xs tracking-widest">
        <span className="text-green-600">SUPPLY:</span>
        <span className="text-white font-bold">2222</span>
        <span className="text-green-900">|</span>
        <span className="text-green-600">PRICE:</span>
        <span className="text-white font-bold">$6</span>
        <span className="text-green-900">|</span>
        <span className="text-green-600">CHAIN:</span>
        <span className="text-white font-bold">Robinhood Chain</span>
        <span className="text-green-900">|</span>
        <span className="text-green-600">STATUS:</span>
        <span
          className={`font-bold transition-opacity duration-200 ${
            blink ? "opacity-100 text-green-400" : "opacity-30 text-green-400"
          }`}
        >
          ● AWAITING LAUNCH
        </span>
      </div>
    </div>
  );
}
