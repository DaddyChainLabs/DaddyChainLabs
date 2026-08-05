import { useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Sender = "owner" | "agent";

interface ScriptStep {
  sender: Sender;
  text: string;
  /** ms to wait BEFORE this message starts appearing */
  preDelay?: number;
  /** typing speed in ms per character (default 38) */
  charSpeed?: number;
  /** special rendering mode */
  mode?: "progress" | "normal";
  /** triggers the status bar */
  triggerStatus?: boolean;
  /** triggers the gallery section */
  triggerComplete?: boolean;
  /** last line: keep blinking cursor forever */
  keepCursor?: boolean;
}

// ─── Script ──────────────────────────────────────────────────────────────────

const SCRIPT: ScriptStep[] = [
  { sender: "owner", text: "Activate Daddy Agent", preDelay: 800 },
  { sender: "agent", text: "Activating...", preDelay: 700, charSpeed: 45 },
  { sender: "agent", text: "Processed.", preDelay: 900, charSpeed: 45 },
  { sender: "agent", text: "Completed.", preDelay: 600, charSpeed: 45 },
  { sender: "agent", text: "Requires access to server.", preDelay: 800 },
  { sender: "owner", text: "60% access given.", preDelay: 1000 },
  { sender: "agent", text: "Working. Taking action...", preDelay: 900 },
  { sender: "owner", text: "Tell me about us in one line.", preDelay: 1200 },
  {
    sender: "agent",
    text: "We are not just an NFT project. LOL.",
    preDelay: 1100,
    charSpeed: 32,
  },
  {
    sender: "owner",
    text: "Find the best chain to deploy our first NFT.",
    preDelay: 1400,
  },
  { sender: "agent", text: "Scanning chains...", preDelay: 900, charSpeed: 50 },
  {
    sender: "agent",
    text: "Ethereum? Too expensive, sir.",
    preDelay: 1200,
    charSpeed: 38,
  },
  {
    sender: "agent",
    text: "Robinhood Chain? Cheap, fast, and nobody's watching yet.",
    preDelay: 1300,
    charSpeed: 32,
    triggerStatus: true,
  },
  { sender: "agent", text: "Locking it in.", preDelay: 900, charSpeed: 45 },
  { sender: "owner", text: "Start the work on the NFT.", preDelay: 1100 },
  { sender: "agent", text: "Processing...", preDelay: 800, charSpeed: 50 },
  { sender: "agent", text: "Supply: 2,222", preDelay: 1000, charSpeed: 40 },
  { sender: "agent", text: "Mint price: $6", preDelay: 700, charSpeed: 40 },
  {
    sender: "agent",
    text: "Projected pump:",
    preDelay: 900,
    mode: "progress",
    charSpeed: 40,
  },
  {
    sender: "agent",
    text: "Want the real number?",
    preDelay: 1200,
    charSpeed: 38,
  },
  { sender: "owner", text: "Not yet. Mint first.", preDelay: 1400 },
  {
    sender: "agent",
    text: "Awaiting launch command from Owner...",
    preDelay: 1200,
    charSpeed: 35,
    keepCursor: true,
    triggerComplete: true,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(68), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="mt-1 flex items-center gap-2">
      <div className="flex-1 h-3 bg-green-950 border border-green-900 relative overflow-hidden max-w-[160px]">
        <div
          className="h-full bg-green-500 transition-all duration-1500 ease-out"
          style={{ width: `${width}%` }}
        />
        {/* stripes */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(0,0,0,0.25) 6px, rgba(0,0,0,0.25) 8px)",
          }}
        />
      </div>
      <span className="text-green-400 text-xs">{width}%</span>
      <span className="text-green-700 text-[10px]">[REDACTED]</span>
    </div>
  );
}

interface BubbleProps {
  sender: Sender;
  displayText: string;
  done: boolean;
  mode?: "progress" | "normal";
  keepCursor?: boolean;
}

function Bubble({ sender, displayText, done, mode, keepCursor }: BubbleProps) {
  const isOwner = sender === "owner";

  return (
    <div className={`flex flex-col ${isOwner ? "items-end" : "items-start"} w-full`}>
      {/* Sender label */}
      <span
        className={`text-[10px] tracking-widest mb-1 px-1 ${
          isOwner ? "text-white/40" : "text-green-700"
        }`}
      >
        {isOwner ? "Owner" : "Agent"}
      </span>

      {/* Bubble */}
      <div
        className={`relative max-w-[85%] sm:max-w-[70%] px-4 py-3 text-sm leading-relaxed ${
          isOwner
            ? "bg-white/5 border border-white/10 text-white self-end"
            : "bg-green-950/40 border border-green-900/60 text-green-300 self-start"
        }`}
      >
        {/* prompt symbol */}
        {isOwner && (
          <span className="text-white/30 mr-2 select-none">&gt;</span>
        )}
        {displayText}
        {mode === "progress" && done && <ProgressBar />}
        {/* cursor */}
        {(!done || keepCursor) && (
          <span className="inline-block w-2 h-4 bg-green-400 ml-1 align-middle animate-blink" />
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface TerminalChatProps {
  onStatusReady: () => void;
  onScriptComplete: () => void;
}

export default function TerminalChat({
  onStatusReady,
  onScriptComplete,
}: TerminalChatProps) {
  // Each entry: { step index, text displayed so far, done }
  const [messages, setMessages] = useState<
    { stepIdx: number; displayText: string; done: boolean }[]
  >([]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  // Run the script once on mount
  useEffect(() => {
    if (animating.current) return;
    animating.current = true;

    let cancelled = false;

    const sleep = (ms: number) =>
      new Promise<void>((res) => setTimeout(res, ms));

    async function runScript() {
      // Show every message except the last one immediately, all at once.
      const earlyCount = SCRIPT.length - 1;
      setMessages(
        SCRIPT.slice(0, earlyCount).map((step, i) => ({
          stepIdx: i,
          displayText: step.text,
          done: true,
        }))
      );
      SCRIPT.slice(0, earlyCount).forEach((step) => {
        if (step.triggerStatus) onStatusReady();
      });

      // Only the last message plays out with delay + typing.
      const i = earlyCount;
      const step = SCRIPT[i];

      await sleep(step.preDelay ?? 600);
      if (cancelled) return;

      if (step.triggerStatus) {
        onStatusReady();
      }

      setMessages((prev: { stepIdx: number; displayText: string; done: boolean }[]) => [
        ...prev,
        { stepIdx: i, displayText: "", done: false },
      ]);

      const speed = step.charSpeed ?? 38;
      for (let c = 1; c <= step.text.length; c++) {
        if (cancelled) break;
        await sleep(speed);
        const partial = step.text.slice(0, c);
        setMessages((prev: { stepIdx: number; displayText: string; done: boolean }[]) =>
          prev.map((m: { stepIdx: number; displayText: string; done: boolean }) =>
            m.stepIdx === i ? { ...m, displayText: partial } : m
          )
        );
      }

      if (cancelled) return;

      setMessages((prev: { stepIdx: number; displayText: string; done: boolean }[]) =>
        prev.map((m) => (m.stepIdx === i ? { ...m, done: true } : m))
      );

      if (step.triggerComplete) {
        await sleep(800);
        onScriptComplete();
      }
    }

    runScript();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full max-w-3xl">
      {/* Terminal window chrome */}
      <div className="border border-green-900 rounded-none">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-green-900 bg-green-950/20">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-900/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-900/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-900/80" />
          </div>
          <span className="text-green-800 text-xs tracking-widest ml-2">
            daddy-agent@daddychain-labs:~$ — SCRIPTED NARRATIVE
          </span>
        </div>

        {/* Chat area */}
        <div className="p-4 sm:p-6 flex flex-col gap-5 h-[60vh] overflow-y-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {messages.map((msg) => {
            const step = SCRIPT[msg.stepIdx];
            return (
              <Bubble
                key={msg.stepIdx}
                sender={step.sender}
                displayText={msg.displayText}
                done={msg.done}
                mode={step.mode}
                keepCursor={step.keepCursor && msg.done}
              />
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
