import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SlideLayout } from "./SlideLayout";

type Phase = "idle" | "call" | "page-resp" | "delivered";
type Direction = "ltr" | "rtl";
type ArrowPayload = "call" | "html" | "summary" | null;

const PHASES: { phase: Phase; ms: number }[] = [
  { phase: "idle", ms: 700 },
  { phase: "call", ms: 1100 },
  { phase: "page-resp", ms: 1500 },
  { phase: "delivered", ms: 2200 },
];

const NODE = 92;
const ARROW_LONG = 376;
const ARROW_SHORT = 130;

function AgentIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={40} cy={10} r={3} fill="currentColor" />
      <line x1={40} y1={14} x2={40} y2={22} />
      <rect x={16} y={22} width={48} height={42} rx={10} />
      <circle cx={30} cy={40} r={4} fill="currentColor" stroke="none" />
      <circle cx={50} cy={40} r={4} fill="currentColor" stroke="none" />
      <rect
        x={32}
        y={52}
        width={16}
        height={4}
        rx={2}
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function WebIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={40} cy={40} r={28} />
      <path d="M12 40 L68 40" />
      <path d="M40 12 C54 24, 54 56, 40 68" />
      <path d="M40 12 C26 24, 26 56, 40 68" />
      <path d="M18 26 L62 26" />
      <path d="M18 54 L62 54" />
    </svg>
  );
}

function FunnelIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18 L66 18 L48 38 L48 64 L32 56 L32 38 Z" />
      <line x1={22} y1={26} x2={58} y2={26} />
    </svg>
  );
}

type Tone = "violet" | "sky" | "amber";
const NODE_TONE: Record<Tone, string> = {
  violet:
    "border-violet-400/60 bg-violet-500/15 text-violet-100 shadow-[0_0_24px_rgba(167,139,250,0.28)]",
  sky: "border-sky-400/60 bg-sky-500/15 text-sky-100 shadow-[0_0_24px_rgba(56,189,248,0.28)]",
  amber:
    "border-amber-400/60 bg-amber-500/15 text-amber-100 shadow-[0_0_24px_rgba(251,191,36,0.32)]",
};

function Node({
  icon,
  tone,
  label,
}: {
  icon: React.ReactNode;
  tone: Tone;
  label: string;
}) {
  return (
    <div className="relative shrink-0" style={{ width: NODE, height: NODE }}>
      <div
        className={`flex h-full w-full items-center justify-center rounded-2xl border ${NODE_TONE[tone]}`}
      >
        {icon}
      </div>
      <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold text-neutral-200">
        {label}
      </span>
    </div>
  );
}

function CallChip() {
  return (
    <span className="whitespace-nowrap rounded-full border border-violet-400/60 bg-violet-500/15 px-3 py-1.5 font-mono text-xs text-violet-100 shadow">
      WebFetch(url)
    </span>
  );
}

function HtmlBlob() {
  return (
    <div className="rounded-md border border-rose-400/60 bg-rose-500/15 px-2.5 py-1 font-mono text-[8px] leading-tight text-rose-100 shadow-[0_0_18px_rgba(251,113,133,0.45)]">
      <div>&lt;html&gt;</div>
      <div>&nbsp;&lt;head&gt;…</div>
      <div>&nbsp;&lt;body&gt;</div>
      <div>&nbsp;&nbsp;&lt;div&gt;…</div>
    </div>
  );
}

function SummaryChip() {
  return (
    <span className="whitespace-nowrap rounded-full border border-emerald-400/60 bg-emerald-500/15 px-3 py-1.5 font-mono text-xs font-semibold text-emerald-100 shadow">
      {"{ summary }"}
    </span>
  );
}

function Arrow({
  width,
  active,
  direction,
  payload,
}: {
  width: number;
  active: boolean;
  direction: Direction;
  payload: ArrowPayload;
}) {
  const [displayDirection, setDisplayDirection] = useState(direction);
  useEffect(() => {
    if (active) setDisplayDirection(direction);
  }, [active, direction]);
  return (
    <div className="relative shrink-0" style={{ width, height: NODE }}>
      <motion.svg
        viewBox={`0 0 ${width} 20`}
        width={width}
        height={20}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-neutral-200"
        initial={false}
        animate={{ opacity: active ? 1 : 0.18 }}
        transition={{ duration: 0.3 }}
      >
        {displayDirection === "ltr" ? (
          <>
            <line
              x1={4}
              y1={10}
              x2={width - 14}
              y2={10}
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
            <polygon
              points={`${width - 2},10 ${width - 14},4 ${width - 14},16`}
              fill="currentColor"
            />
          </>
        ) : (
          <>
            <line
              x1={14}
              y1={10}
              x2={width - 4}
              y2={10}
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
            <polygon points="2,10 14,4 14,16" fill="currentColor" />
          </>
        )}
      </motion.svg>
      <div
        className="pointer-events-none absolute inset-x-0 flex justify-center"
        style={{ top: NODE / 2 - 58 }}
      >
        <AnimatePresence mode="wait">
          {payload && (
            <motion.div
              key={payload}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              {payload === "call" && <CallChip />}
              {payload === "html" && <HtmlBlob />}
              {payload === "summary" && <SummaryChip />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ContextWindow({
  tone,
  filled,
}: {
  tone: "rose" | "emerald";
  filled: boolean;
}) {
  const accentRowCls = tone === "rose" ? "bg-rose-500/70" : "bg-emerald-500/70";
  const tagCls = tone === "rose" ? "text-rose-300" : "text-emerald-300";
  const segs = 7;
  const ratio = tone === "rose" ? 0.95 : 0.18;
  const litSegs = filled ? Math.max(1, Math.round(segs * ratio)) : 0;
  return (
    <div
      className="relative shrink-0 rounded-lg border border-white/10 bg-neutral-900/60 px-2 pb-2 pt-3.5"
      style={{ width: 60 }}
    >
      <div
        className={`absolute -top-2 left-2 rounded-full bg-neutral-950 px-1.5 font-mono text-[8px] font-semibold uppercase tracking-wider ${tagCls}`}
      >
        ctx
      </div>
      <div className="flex flex-col gap-1">
        {Array.from({ length: segs }).map((_, i) => {
          const lit = i >= segs - litSegs;
          return (
            <motion.div
              key={i}
              className={`h-1 rounded-sm ${lit ? accentRowCls : "bg-white/10"}`}
              animate={{ opacity: lit ? 1 : 0.4 }}
              transition={{
                duration: 0.4,
                delay: lit ? (segs - i) * 0.05 : 0,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function VariantLabel({
  text,
  tone,
}: {
  text: string;
  tone: "rose" | "emerald";
}) {
  const cls =
    tone === "rose"
      ? "border-rose-400/60 bg-rose-500/15 text-rose-100"
      : "border-emerald-400/60 bg-emerald-500/15 text-emerald-100";
  return (
    <span
      className={`inline-flex w-24 justify-center rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] ${cls}`}
    >
      {text}
    </span>
  );
}

function BeforeRow({ phase }: { phase: Phase }) {
  const arrowActive = phase === "call" || phase === "page-resp";
  const direction: Direction = phase === "page-resp" ? "rtl" : "ltr";
  const filled = phase === "delivered";
  let payload: ArrowPayload = null;
  if (phase === "call") payload = "call";
  else if (phase === "page-resp") payload = "html";

  return (
    <div className="flex items-center gap-3">
      <VariantLabel text="Before" tone="rose" />
      <ContextWindow tone="rose" filled={filled} />
      <Node
        icon={<AgentIcon className="h-12 w-12" />}
        tone="violet"
        label="Agent"
      />
      <Arrow
        width={ARROW_LONG}
        active={arrowActive}
        direction={direction}
        payload={payload}
      />
      <Node
        icon={<WebIcon className="h-12 w-12" />}
        tone="sky"
        label="Web Page"
      />
    </div>
  );
}

function AfterRow({ phase }: { phase: Phase }) {
  const leftActive = phase === "call" || phase === "delivered";
  const rightActive = phase === "call" || phase === "page-resp";
  const leftDirection: Direction = phase === "delivered" ? "rtl" : "ltr";
  const rightDirection: Direction = phase === "page-resp" ? "rtl" : "ltr";
  const filled = phase === "delivered";
  let leftPayload: ArrowPayload = null;
  if (phase === "call") leftPayload = "call";
  else if (phase === "delivered") leftPayload = "summary";
  let rightPayload: ArrowPayload = null;
  if (phase === "call") rightPayload = "call";
  else if (phase === "page-resp") rightPayload = "html";

  return (
    <div className="flex items-center gap-3">
      <VariantLabel text="After" tone="emerald" />
      <ContextWindow tone="emerald" filled={filled} />
      <Node
        icon={<AgentIcon className="h-12 w-12" />}
        tone="violet"
        label="Agent"
      />
      <Arrow
        width={ARROW_SHORT}
        active={leftActive}
        direction={leftDirection}
        payload={leftPayload}
      />
      <Node
        icon={<FunnelIcon className="h-12 w-12" />}
        tone="amber"
        label="Sub-Agent"
      />
      <Arrow
        width={ARROW_SHORT}
        active={rightActive}
        direction={rightDirection}
        payload={rightPayload}
      />
      <Node
        icon={<WebIcon className="h-12 w-12" />}
        tone="sky"
        label="Web Page"
      />
    </div>
  );
}

export function WebFetchExampleSlide() {
  const [i, setI] = useState(0);
  const phase = PHASES[i].phase;

  useEffect(() => {
    const t = window.setTimeout(
      () => setI((prev) => (prev + 1) % PHASES.length),
      PHASES[i].ms,
    );
    return () => window.clearTimeout(t);
  }, [i]);

  return (
    <SlideLayout title="클로드 코드의 예시 - WebFetch 도구의 동작 방식 변경">
      <div className="flex flex-col items-center gap-16">
        <BeforeRow phase={phase} />
        <AfterRow phase={phase} />
      </div>
    </SlideLayout>
  );
}
