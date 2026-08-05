export default function Header() {
  return (
    <header className="w-full border-b border-green-900 px-6 py-4 flex items-center gap-4 bg-black">
      {/* ASCII-style logo mark */}
      <div className="flex items-center gap-3">
        <div className="text-green-400 text-xl font-bold leading-none select-none" aria-hidden="true">
          <span className="text-white">▐</span>
          <span className="text-green-400">◈</span>
          <span className="text-white">▌</span>
        </div>
        <div>
          <div className="text-white font-bold text-base tracking-widest uppercase">
            DaddyChain <span className="text-green-400">Labs</span>
          </div>
          <div className="text-green-700 text-xs tracking-widest uppercase">
            RoboDaddy Brokers // v0.1
          </div>
        </div>
      </div>
      <div className="ml-auto text-green-700 text-xs hidden sm:block tracking-widest">
        [PRE-LAUNCH]
      </div>
    </header>
  );
}
