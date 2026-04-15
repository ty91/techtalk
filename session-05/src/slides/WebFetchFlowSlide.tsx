import type { ReactNode } from "react";
import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";
import claudeCodeImage from "../assets/claude-code.png";

const W = 980;
const H = 480;

type Point = { x: number; y: number };

const AGENT: Point = { x: 140, y: 180 };
const SYSTEM: Point = { x: 490, y: 180 };
const WEB: Point = { x: 840, y: 180 };
const LLM: Point = { x: 490, y: 400 };

type Tone = "violet" | "sky" | "amber" | "emerald" | "rose" | "slate";
const TONE_CLS: Record<Tone, string> = {
  violet:
    "border-violet-400/60 bg-violet-500/15 text-violet-100 shadow-[0_0_24px_rgba(167,139,250,0.25)]",
  sky: "border-sky-400/60 bg-sky-500/15 text-sky-100 shadow-[0_0_24px_rgba(56,189,248,0.25)]",
  amber:
    "border-amber-400/60 bg-amber-500/15 text-amber-100 shadow-[0_0_24px_rgba(251,191,36,0.3)]",
  emerald:
    "border-emerald-400/60 bg-emerald-500/15 text-emerald-100 shadow-[0_0_24px_rgba(52,211,153,0.3)]",
  rose: "border-rose-400/60 bg-rose-500/15 text-rose-100 shadow-[0_0_24px_rgba(244,63,94,0.3)]",
  slate:
    "border-white/20 bg-neutral-900/70 text-neutral-100 shadow-[0_0_24px_rgba(255,255,255,0.05)]",
};

function Chip({ tone, children }: { tone: Tone; children: ReactNode }) {
  const cls = TONE_CLS[tone];
  return (
    <span
      className={`whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-xs font-semibold ${cls}`}
    >
      {children}
    </span>
  );
}

function HtmlBlob() {
  return (
    <div className="rounded-md border border-rose-400/60 bg-rose-500/15 px-2.5 py-1 font-mono text-[9px] leading-tight text-rose-100 shadow-[0_0_18px_rgba(251,113,133,0.45)]">
      <div>&lt;html&gt;</div>
      <div>&nbsp;&lt;head&gt;…</div>
      <div>&nbsp;&lt;body&gt;</div>
      <div>&nbsp;&nbsp;&lt;div&gt;…</div>
      <div>&nbsp;&nbsp;&lt;div&gt;…</div>
    </div>
  );
}

function SystemIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x={8} y={9} width={32} height={12} rx={2.5} />
      <rect x={8} y={27} width={32} height={12} rx={2.5} />
      <circle cx={14} cy={15} r={1.6} fill="currentColor" />
      <circle cx={19} cy={15} r={1.6} fill="currentColor" />
      <circle cx={14} cy={33} r={1.6} fill="currentColor" />
      <circle cx={19} cy={33} r={1.6} fill="currentColor" />
      <line x1={28} y1={15} x2={36} y2={15} />
      <line x1={28} y1={33} x2={36} y2={33} />
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

function LlmIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 12 L38 12 L30 22 L30 38 L18 32 L18 22 Z" />
      <line x1={15} y1={17} x2={33} y2={17} />
      <circle cx={24} cy={27} r={1.8} fill="currentColor" />
    </svg>
  );
}

function Node({
  position,
  tone,
  size,
  label,
  children,
  delay,
}: {
  position: Point;
  tone: Tone;
  size: number;
  label: string;
  children: ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute z-10 flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <div
        className={`flex items-center justify-center rounded-2xl border ${TONE_CLS[tone]}`}
        style={{ width: size, height: size }}
      >
        {children}
      </div>
      <span className="absolute top-full mt-2 whitespace-nowrap text-[11px] font-semibold text-neutral-200">
        {label}
      </span>
    </motion.div>
  );
}

function StaticLines() {
  const line = {
    stroke: "currentColor",
    strokeWidth: 1.3,
    strokeDasharray: "4 4",
    opacity: 0.35,
  } as const;
  return (
    <svg
      className="pointer-events-none absolute inset-0 text-neutral-400"
      width={W}
      height={H}
    >
      <line x1={AGENT.x} y1={AGENT.y} x2={SYSTEM.x} y2={SYSTEM.y} {...line} />
      <line x1={SYSTEM.x} y1={SYSTEM.y} x2={WEB.x} y2={WEB.y} {...line} />
      <line x1={SYSTEM.x} y1={SYSTEM.y} x2={LLM.x} y2={LLM.y} {...line} />
    </svg>
  );
}

const CHIP_DURATION = 3.0;
const CHIP_GAP = 0.15;
const INITIAL_DELAY = 0.8;
const END_PAUSE = 1.8;
const PHASE_COUNT = 6;
const CYCLE_TIME =
  INITIAL_DELAY +
  PHASE_COUNT * CHIP_DURATION +
  (PHASE_COUNT - 1) * CHIP_GAP +
  END_PAUSE;

const CHIP_TIMES = [0, 0.1, 0.34, 0.66, 0.9, 1];

function phaseDelay(index: number) {
  return INITIAL_DELAY + index * (CHIP_DURATION + CHIP_GAP);
}

function FlyingChip({
  from,
  to,
  phase,
  children,
  step,
}: {
  from: Point;
  to: Point;
  phase: number;
  children: ReactNode;
  step: number;
}) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  return (
    <motion.div
      className="pointer-events-none absolute z-20 flex items-center gap-2 -translate-x-1/2 -translate-y-1/2"
      style={{ left: from.x, top: from.y }}
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{
        x: [0, 0, 0, dx, dx, dx],
        y: [0, 0, 0, dy, dy, dy],
        opacity: [0, 1, 1, 1, 1, 0],
      }}
      transition={{
        duration: CHIP_DURATION,
        delay: phaseDelay(phase),
        times: CHIP_TIMES,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: CYCLE_TIME - CHIP_DURATION,
      }}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-950/90 font-mono text-[10px] font-bold text-neutral-100 ring-1 ring-white/30">
        {step}
      </span>
      {children}
    </motion.div>
  );
}

export function WebFetchFlowSlide() {
  return (
    <SlideLayout>
      <div className="relative text-neutral-300" style={{ width: W, height: H }}>
        <StaticLines />

        <Node
          position={AGENT}
          tone="slate"
          size={124}
          label="Claude Code"
          delay={0.1}
        >
          <img
            src={claudeCodeImage}
            alt="Claude Code"
            className="h-20 w-20 object-contain"
          />
        </Node>
        <Node position={SYSTEM} tone="sky" size={112} label="System" delay={0.2}>
          <SystemIcon className="h-16 w-16" />
        </Node>
        <Node position={WEB} tone="sky" size={112} label="Web Page" delay={0.3}>
          <WebIcon className="h-16 w-16" />
        </Node>
        <Node position={LLM} tone="amber" size={96} label="Small LLM" delay={0.4}>
          <LlmIcon className="h-12 w-12" />
        </Node>

        <FlyingChip from={AGENT} to={SYSTEM} phase={0} step={1}>
          <Chip tone="violet">WebFetch(url)</Chip>
        </FlyingChip>

        <FlyingChip from={SYSTEM} to={WEB} phase={1} step={2}>
          <Chip tone="sky">GET /</Chip>
        </FlyingChip>

        <FlyingChip from={WEB} to={SYSTEM} phase={2} step={3}>
          <HtmlBlob />
        </FlyingChip>

        <FlyingChip from={SYSTEM} to={LLM} phase={3} step={4}>
          <Chip tone="rose">summarize(html)</Chip>
        </FlyingChip>

        <FlyingChip from={LLM} to={SYSTEM} phase={4} step={4}>
          <Chip tone="emerald">{"{ summary }"}</Chip>
        </FlyingChip>

        <FlyingChip from={SYSTEM} to={AGENT} phase={5} step={5}>
          <Chip tone="emerald">{"{ summary }"}</Chip>
        </FlyingChip>
      </div>
    </SlideLayout>
  );
}
