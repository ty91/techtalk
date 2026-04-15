import type { ReactNode } from "react";
import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";
import claudeCodeImage from "../assets/claude-code.png";

const W = 1280;
const H = 440;

type Point = { x: number; y: number };
type NodeMeta = { pos: Point; size: number };

const N_AGENT: NodeMeta = { pos: { x: 140, y: 220 }, size: 124 };
const N_SYSTEM: NodeMeta = { pos: { x: 450, y: 220 }, size: 100 };
const N_FETCHER: NodeMeta = { pos: { x: 790, y: 220 }, size: 140 };
const N_WEB: NodeMeta = { pos: { x: 1140, y: 220 }, size: 108 };

const CHIP_GAP_PX = 12;
const CHIP_Y = Math.min(
  ...[N_AGENT, N_SYSTEM, N_FETCHER, N_WEB].map(
    (n) => n.pos.y - n.size / 2 - CHIP_GAP_PX,
  ),
);

function chipAnchor(n: NodeMeta): Point {
  return { x: n.pos.x, y: CHIP_Y };
}

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
  return (
    <span
      className={`whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-xs font-semibold ${TONE_CLS[tone]}`}
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

function CuratedNote() {
  return (
    <div className="rounded-md border border-emerald-400/60 bg-emerald-500/15 px-3 py-2 font-mono text-[10px] leading-tight text-emerald-100 shadow-[0_0_18px_rgba(52,211,153,0.45)]">
      <div className="mb-1 font-semibold tracking-wide">서브에이전트 핵심</div>
      <div>• 정의: .claude/agents/*.md</div>
      <div>• 격리: 별도 컨텍스트 윈도우</div>
      <div>• 호출: Task 도구로 위임</div>
      <div>• 반환: 결과만 메인에 전달</div>
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

function FetcherIcon({ className }: { className?: string }) {
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
      <circle cx={40} cy={10} r={3} fill="currentColor" />
      <line x1={40} y1={14} x2={40} y2={22} />
      <rect x={14} y={22} width={52} height={42} rx={10} />
      <circle cx={30} cy={40} r={4} fill="currentColor" stroke="none" />
      <circle cx={50} cy={40} r={4} fill="currentColor" stroke="none" />
      <path d="M30 54 Q40 60 50 54" />
      <path d="M58 30 L66 22" />
      <circle cx={68} cy={20} r={4} />
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
  pulse,
}: {
  position: Point;
  tone: Tone;
  size: number;
  label: string;
  children: ReactNode;
  delay: number;
  pulse?: boolean;
}) {
  return (
    <motion.div
      className="absolute z-10 flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <motion.div
        className={`flex items-center justify-center rounded-2xl border ${TONE_CLS[tone]}`}
        style={{ width: size, height: size }}
        animate={
          pulse
            ? {
                boxShadow: [
                  "0 0 24px rgba(251,191,36,0.3)",
                  "0 0 36px rgba(251,191,36,0.55)",
                  "0 0 24px rgba(251,191,36,0.3)",
                ],
              }
            : undefined
        }
        transition={
          pulse ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : undefined
        }
      >
        {children}
      </motion.div>
      <span className="absolute top-full mt-2 whitespace-nowrap text-[12px] font-semibold text-neutral-200">
        {label}
      </span>
    </motion.div>
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
  from: NodeMeta;
  to: NodeMeta;
  phase: number;
  children: ReactNode;
  step: number;
}) {
  const fromA = chipAnchor(from);
  const toA = chipAnchor(to);
  const dx = toA.x - fromA.x;
  const dy = toA.y - fromA.y;
  return (
    <motion.div
      className="pointer-events-none absolute z-20 flex items-end gap-2 -translate-x-1/2 -translate-y-full"
      style={{ left: fromA.x, top: fromA.y }}
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

const ARROW_TIMES = [0, 0.28, 0.35, 0.65, 0.72, 1];
const ARROW_OPACITY = [0, 0, 1, 1, 0, 0];
const ARROW_GAP = 8;
const ARROW_HEAD = 9;

function PhaseArrow({
  from,
  to,
  phase,
}: {
  from: NodeMeta;
  to: NodeMeta;
  phase: number;
}) {
  const dir = Math.sign(to.pos.x - from.pos.x);
  const x1 = from.pos.x + dir * (from.size / 2 + ARROW_GAP);
  const y1 = from.pos.y;
  const x2 = to.pos.x - dir * (to.size / 2 + ARROW_GAP);
  const y2 = to.pos.y;
  const baseX = x2 - dir * ARROW_HEAD;
  const polygonPoints = `${x2},${y2} ${baseX},${y2 - 5} ${baseX},${y2 + 5}`;
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: ARROW_OPACITY }}
      transition={{
        duration: CHIP_DURATION,
        delay: phaseDelay(phase),
        times: ARROW_TIMES,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: CYCLE_TIME - CHIP_DURATION,
      }}
    >
      <line
        x1={x1}
        y1={y1}
        x2={baseX}
        y2={y2}
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <polygon points={polygonPoints} fill="currentColor" />
    </motion.g>
  );
}

const CALL_URL = "https://docs.claude.com/en/docs/claude-code/sub-agents";
const CALL_PROMPT =
  "서브에이전트를 정의하는 방법과, 메인 에이전트의 컨텍스트와 어떻게 격리되어 실행되는지 핵심만 정리해줘. 결과를 메인 에이전트에 어떻게 반환하는지도 알려줘.";

function CallBlock() {
  return (
    <motion.div
      className="mb-6 w-full max-w-[1280px] rounded-lg border border-white/15 bg-neutral-900/70 px-6 py-4 font-mono text-[15px] leading-relaxed text-neutral-200 shadow-[0_0_24px_rgba(167,139,250,0.12)]"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <div>
        <span className="text-violet-300">WebFetch</span>(
      </div>
      <div className="ml-6">
        <span className="text-sky-300">url</span>
        <span className="text-neutral-500">: </span>
        <span className="text-amber-200">"{CALL_URL}"</span>
        <span className="text-neutral-500">,</span>
      </div>
      <div className="ml-6">
        <span className="text-sky-300">prompt</span>
        <span className="text-neutral-500">: </span>
        <span className="text-emerald-200">"{CALL_PROMPT}"</span>
      </div>
      <div>)</div>
    </motion.div>
  );
}

export function SmarterWebFetchSlide() {
  return (
    <SlideLayout
      title="다음 단계 - 좀 더 똑똑한 WebFetch"
      subtitle="WebFetch 도구가 조금 더 에이전틱하게 바뀌었어요"
    >
      <CallBlock />
      <div className="relative text-neutral-300" style={{ width: W, height: H }}>
        <svg
          className="pointer-events-none absolute inset-0 text-neutral-200"
          width={W}
          height={H}
        >
          <PhaseArrow from={N_AGENT} to={N_SYSTEM} phase={0} />
          <PhaseArrow from={N_SYSTEM} to={N_FETCHER} phase={1} />
          <PhaseArrow from={N_FETCHER} to={N_WEB} phase={2} />
          <PhaseArrow from={N_WEB} to={N_FETCHER} phase={3} />
          <PhaseArrow from={N_FETCHER} to={N_SYSTEM} phase={4} />
          <PhaseArrow from={N_SYSTEM} to={N_AGENT} phase={5} />
        </svg>

        <Node
          position={N_AGENT.pos}
          tone="slate"
          size={N_AGENT.size}
          label="Claude Code (메인)"
          delay={0.1}
        >
          <img
            src={claudeCodeImage}
            alt="Claude Code"
            className="h-20 w-20 object-contain"
          />
        </Node>
        <Node
          position={N_SYSTEM.pos}
          tone="sky"
          size={N_SYSTEM.size}
          label="System"
          delay={0.2}
        >
          <SystemIcon className="h-14 w-14" />
        </Node>
        <Node
          position={N_FETCHER.pos}
          tone="amber"
          size={N_FETCHER.size}
          label="WebFetch Agent"
          delay={0.3}
          pulse
        >
          <FetcherIcon className="h-20 w-20" />
        </Node>
        <Node
          position={N_WEB.pos}
          tone="sky"
          size={N_WEB.size}
          label="Web Page"
          delay={0.4}
        >
          <WebIcon className="h-16 w-16" />
        </Node>

        <FlyingChip from={N_AGENT} to={N_SYSTEM} phase={0} step={1}>
          <Chip tone="violet">WebFetch(url, prompt)</Chip>
        </FlyingChip>

        <FlyingChip from={N_SYSTEM} to={N_FETCHER} phase={1} step={2}>
          <Chip tone="violet">spawn(url, prompt)</Chip>
        </FlyingChip>

        <FlyingChip from={N_FETCHER} to={N_WEB} phase={2} step={3}>
          <Chip tone="sky">GET url</Chip>
        </FlyingChip>

        <FlyingChip from={N_WEB} to={N_FETCHER} phase={3} step={4}>
          <HtmlBlob />
        </FlyingChip>

        <FlyingChip from={N_FETCHER} to={N_SYSTEM} phase={4} step={5}>
          <CuratedNote />
        </FlyingChip>

        <FlyingChip from={N_SYSTEM} to={N_AGENT} phase={5} step={6}>
          <CuratedNote />
        </FlyingChip>
      </div>
    </SlideLayout>
  );
}
