import { useEffect, useState } from "react";

const characters = [
  {
    src: "/characters/preview1.png",
    id: "#0001",
    trait: "SUIT CLASS // ALPHA",
  },
  {
    src: "/characters/preview2.png",
    id: "#0002",
    trait: "HOODIE CLASS // DEGEN",
  },
  {
    src: "/characters/preview3.png",
    id: "#0003",
    trait: "EXEC CLASS // BULLISH",
  },
];

export default function CharacterGallery() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className={`w-full max-w-3xl mt-12 transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Section header */}
      <div className="border border-green-900 px-4 py-3 mb-6 flex items-center gap-3">
        <span className="text-green-500 text-xs tracking-widest">▶</span>
        <span className="text-green-400 text-xs tracking-widest uppercase font-bold">
          RoboDaddy Brokers — Character Preview
        </span>
        <span className="ml-auto text-green-800 text-xs">2,222 SUPPLY</span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {characters.map((char) => (
          <div
            key={char.id}
            className="border border-green-900 hover:border-green-500 transition-all duration-300 group"
          >
            <div className="relative overflow-hidden bg-green-950/10">
              <img
                src={char.src}
                alt={`RoboDaddy Broker ${char.id}`}
                className="w-full aspect-square object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              {/* Scanline overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
                }}
              />
              <div className="absolute top-2 left-2 bg-black/80 border border-green-900 px-2 py-0.5 text-green-500 text-[10px] tracking-widest">
                {char.id}
              </div>
            </div>
            <div className="px-3 py-2 border-t border-green-900">
              <div className="text-green-600 text-[10px] tracking-widest">{char.trait}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border border-green-900 px-4 py-3 text-center">
        <p className="text-green-700 text-xs tracking-widest">
          ART REVEAL PENDING LAUNCH //
          <span className="text-green-500"> PLACEHOLDER PREVIEWS ABOVE</span>
        </p>
      </div>
    </section>
  );
}
