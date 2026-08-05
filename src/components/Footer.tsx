export default function Footer() {
  return (
    <footer className="w-full border-t border-green-900 bg-black px-6 py-6 mt-8">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-green-800 text-xs tracking-widest text-center sm:text-left">
          © 2025 DaddyChain Labs. Pre-launch. No mint. No contract. Not yet.
        </div>
        <div className="flex gap-4">
          <a
            href="#"
            aria-label="X (Twitter) — coming soon"
            className="group flex items-center gap-2 border border-green-900 hover:border-green-500 px-4 py-2 text-xs text-green-600 hover:text-green-300 transition-all duration-200 tracking-widest"
          >
            <span className="text-base">𝕏</span>
            <span>TWITTER</span>
            <span className="text-green-900 group-hover:text-green-700 text-[10px]">[SOON]</span>
          </a>
          <a
            href="#"
            aria-label="OpenSea — coming soon"
            className="group flex items-center gap-2 border border-green-900 hover:border-green-500 px-4 py-2 text-xs text-green-600 hover:text-green-300 transition-all duration-200 tracking-widest"
          >
            <span className="text-base">⛵</span>
            <span>OPENSEA</span>
            <span className="text-green-900 group-hover:text-green-700 text-[10px]">[SOON]</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
