import type { ReactNode } from "react";
import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";
import claudeCodeImage from "../assets/claude-code.png";

const W = 1280;
const H = 560;
const STEP = 1.6;

const T_STEP1 = 0.3;
const T_STEP2 = T_STEP1 + STEP;
const T_STEP3 = T_STEP2 + STEP;
const T_STEP4 = T_STEP3 + STEP;
const T_STEP5 = T_STEP4 + STEP;
const T_STEP6 = T_STEP5 + STEP;
const T_STEP7 = T_STEP6 + STEP;
const T_STEP8 = T_STEP7 + STEP;
const T_STEP9 = T_STEP8 + STEP;

const USER_CX = 48;
const USER_CY = 62;
const USER_R = 26;

const MAIN_L = 840;
const MAIN_T = 14;
const MAIN_W = 240;
const MAIN_H = 100;
const MAIN_CX = MAIN_L + MAIN_W / 2;

const BUBBLE_L = 98;
const BUBBLE_T = 32;
const BUBBLE_R = 760;
const BUBBLE_B = 92;
const BUBBLE_CY = (BUBBLE_T + BUBBLE_B) / 2;

const CARD_W = 150;
const CARD_H = 280;
const CARD_GAP = 12;
const CARD_COUNT = 7;
const PIPELINE_W = CARD_COUNT * CARD_W + (CARD_COUNT - 1) * CARD_GAP;
const PIPELINE_L = (W - PIPELINE_W) / 2;
const PIPELINE_T = 200;
const cardL = (i: number) => PIPELINE_L + i * (CARD_W + CARD_GAP);
const cardR = (i: number) => cardL(i) + CARD_W;
const cardCX = (i: number) => cardL(i) + CARD_W / 2;
const CARD_CY = PIPELINE_T + CARD_H / 2;

type Tone =
  | "cyan"
  | "amber"
  | "violet"
  | "emerald"
  | "rose"
  | "sky"
  | "fuchsia";

const TONE: Record<
  Tone,
  {
    border: string;
    bg: string;
    text: string;
    accent: string;
    glow: string;
    pill: string;
    arrow: string;
  }
> = {
  cyan: {
    border: "border-cyan-400/55",
    bg: "bg-cyan-500/10",
    text: "text-cyan-100",
    accent: "text-cyan-300",
    glow: "shadow-[0_0_24px_rgba(103,232,249,0.25)]",
    pill: "border-cyan-400/40 bg-cyan-500/15 text-cyan-100",
    arrow: "#67e8f9",
  },
  amber: {
    border: "border-amber-400/55",
    bg: "bg-amber-500/10",
    text: "text-amber-100",
    accent: "text-amber-300",
    glow: "shadow-[0_0_24px_rgba(251,191,36,0.25)]",
    pill: "border-amber-400/40 bg-amber-500/15 text-amber-100",
    arrow: "#fbbf24",
  },
  violet: {
    border: "border-violet-400/55",
    bg: "bg-violet-500/10",
    text: "text-violet-100",
    accent: "text-violet-300",
    glow: "shadow-[0_0_24px_rgba(167,139,250,0.25)]",
    pill: "border-violet-400/40 bg-violet-500/15 text-violet-100",
    arrow: "#c4b5fd",
  },
  emerald: {
    border: "border-emerald-400/55",
    bg: "bg-emerald-500/10",
    text: "text-emerald-100",
    accent: "text-emerald-300",
    glow: "shadow-[0_0_24px_rgba(52,211,153,0.25)]",
    pill: "border-emerald-400/40 bg-emerald-500/15 text-emerald-100",
    arrow: "#6ee7b7",
  },
  rose: {
    border: "border-rose-400/55",
    bg: "bg-rose-500/10",
    text: "text-rose-100",
    accent: "text-rose-300",
    glow: "shadow-[0_0_24px_rgba(244,63,94,0.25)]",
    pill: "border-rose-400/40 bg-rose-500/15 text-rose-100",
    arrow: "#fda4af",
  },
  sky: {
    border: "border-sky-400/55",
    bg: "bg-sky-500/10",
    text: "text-sky-100",
    accent: "text-sky-300",
    glow: "shadow-[0_0_24px_rgba(56,189,248,0.25)]",
    pill: "border-sky-400/40 bg-sky-500/15 text-sky-100",
    arrow: "#7dd3fc",
  },
  fuchsia: {
    border: "border-fuchsia-400/55",
    bg: "bg-fuchsia-500/10",
    text: "text-fuchsia-100",
    accent: "text-fuchsia-300",
    glow: "shadow-[0_0_24px_rgba(232,121,249,0.25)]",
    pill: "border-fuchsia-400/40 bg-fuchsia-500/15 text-fuchsia-100",
    arrow: "#f0abfc",
  },
};

const sp = {
  fill: "none",
  stroke: "currentColor" as const,
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg {...sp} className={className}>
      <circle cx={11} cy={11} r={6} />
      <path d="M16 16l5 5" />
    </svg>
  );
}
function ListIcon({ className }: { className?: string }) {
  return (
    <svg {...sp} className={className}>
      <rect x={4} y={4} width={16} height={16} rx={2} />
      <path d="M8 9h8M8 13h6M8 17h4" />
    </svg>
  );
}
function EyeIcon({ className }: { className?: string }) {
  return (
    <svg {...sp} className={className}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx={12} cy={12} r={3} />
    </svg>
  );
}
function CodeIcon({ className }: { className?: string }) {
  return (
    <svg {...sp} className={className}>
      <path d="M9 7l-5 5 5 5" />
      <path d="M15 7l5 5-5 5" />
    </svg>
  );
}
function BeakerIcon({ className }: { className?: string }) {
  return (
    <svg {...sp} className={className}>
      <path d="M10 3v6l-5 10a2 2 0 002 3h10a2 2 0 002-3l-5-10V3" />
      <path d="M9 3h6" />
    </svg>
  );
}
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg {...sp} className={className}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function PrIcon({ className }: { className?: string }) {
  return (
    <svg {...sp} className={className}>
      <circle cx={6} cy={6} r={2} />
      <circle cx={6} cy={18} r={2} />
      <circle cx={18} cy={18} r={2} />
      <path d="M6 8v8" />
      <path d="M6 6h6a6 6 0 016 6v6" />
    </svg>
  );
}
function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={16} cy={11} r={5} />
      <path d="M6 26 C8 20, 24 20, 26 26" />
    </svg>
  );
}

type Phase = {
  step: number;
  tone: Tone;
  label: string;
  agents: string[];
  icon: ReactNode;
};

const PHASES: Phase[] = [
  {
    step: 3,
    tone: "cyan",
    label: "리서치",
    agents: ["코드베이스 탐색", "git 히스토리", "웹 베스트 프랙티스"],
    icon: <SearchIcon className="h-full w-full" />,
  },
  {
    step: 4,
    tone: "amber",
    label: "계획 수립",
    agents: ["플래너"],
    icon: <ListIcon className="h-full w-full" />,
  },
  {
    step: 5,
    tone: "violet",
    label: "계획 리뷰",
    agents: ["리뷰어 A", "리뷰어 B"],
    icon: <EyeIcon className="h-full w-full" />,
  },
  {
    step: 6,
    tone: "emerald",
    label: "구현",
    agents: ["프론트엔드", "백엔드"],
    icon: <CodeIcon className="h-full w-full" />,
  },
  {
    step: 7,
    tone: "rose",
    label: "테스트",
    agents: ["테스터"],
    icon: <BeakerIcon className="h-full w-full" />,
  },
  {
    step: 8,
    tone: "sky",
    label: "코드 리뷰",
    agents: ["아키텍처", "보안", "가독성"],
    icon: <ShieldIcon className="h-full w-full" />,
  },
  {
    step: 9,
    tone: "fuchsia",
    label: "PR 생성",
    agents: ["→ 유저에게 전달"],
    icon: <PrIcon className="h-full w-full" />,
  },
];

const T_STEPS = [
  T_STEP3,
  T_STEP4,
  T_STEP5,
  T_STEP6,
  T_STEP7,
  T_STEP8,
  T_STEP9,
];

function DArrow({
  x1,
  y1,
  x2,
  y2,
  delay,
  color,
  width = 2,
  headLen = 10,
  headW = 6,
  duration = 0.7,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
  color: string;
  width?: number;
  headLen?: number;
  headW?: number;
  duration?: number;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const L = Math.hypot(dx, dy) || 1;
  const ux = dx / L;
  const uy = dy / L;
  const bx = x2 - ux * headLen;
  const by = y2 - uy * headLen;
  const px = -uy;
  const py = ux;
  const w1x = bx + px * headW;
  const w1y = by + py * headW;
  const w2x = bx - px * headW;
  const w2y = by - py * headW;
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      <motion.path
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, delay, ease: "easeOut" }}
      />
      <motion.polygon
        points={`${x2},${y2} ${w1x},${w1y} ${w2x},${w2y}`}
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: delay + duration * 0.85 }}
      />
    </motion.g>
  );
}

function User() {
  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{
        left: USER_CX - USER_R,
        top: USER_CY - USER_R,
        width: USER_R * 2,
      }}
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: T_STEP1, ease: "easeOut" }}
    >
      <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-rose-400/60 bg-rose-500/15 text-rose-200 shadow-[0_0_18px_rgba(244,63,94,0.25)]">
        <UserIcon className="h-7 w-7" />
      </div>
      <span className="mt-1 text-[10px] font-medium text-neutral-400">
        User
      </span>
    </motion.div>
  );
}

function SpeechBubble() {
  return (
    <motion.div
      className="absolute flex items-center rounded-2xl border border-rose-400/45 bg-rose-500/10 px-5 py-3 shadow-[0_0_20px_rgba(244,63,94,0.15)]"
      style={{
        left: BUBBLE_L,
        top: BUBBLE_T,
        width: BUBBLE_R - BUBBLE_L,
        height: BUBBLE_B - BUBBLE_T,
      }}
      initial={{ opacity: 0, x: -10, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: T_STEP1 + 0.15, ease: "easeOut" }}
    >
      <span className="mr-3 rounded-full border border-rose-400/50 bg-rose-500/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-rose-200">
        STEP 1
      </span>
      <span className="text-[15px] text-rose-50">
        “앱에 사용자 로그인 기능을 만들어줘. 소셜 로그인까지 포함해서.”
      </span>
    </motion.div>
  );
}

function MainAgent() {
  return (
    <motion.div
      className="absolute"
      style={{ left: MAIN_L, top: MAIN_T, width: MAIN_W, height: MAIN_H }}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
    >
      <motion.div
        className="absolute -inset-3 rounded-[28px] bg-violet-400/25 blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0.55] }}
        transition={{
          duration: 1.2,
          delay: T_STEP2,
          times: [0, 0.35, 1],
          ease: "easeOut",
        }}
      />
      <div className="relative flex h-full w-full items-center gap-3 rounded-2xl border-2 border-violet-400/65 bg-violet-500/12 px-4 shadow-[0_0_28px_rgba(167,139,250,0.35)]">
        <img
          src={claudeCodeImage}
          alt=""
          className="h-11 w-11 shrink-0 rounded-lg object-contain"
        />
        <div className="flex min-w-0 flex-col">
          <span className="text-[15px] font-semibold text-violet-50">
            Claude Code
          </span>
          <span className="text-[11.5px] text-violet-200/85">
            메인 에이전트 · 오케스트레이터
          </span>
        </div>
        <motion.span
          className="absolute -top-2.5 right-3 rounded-full border border-violet-300/70 bg-violet-500/30 px-2 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-wider text-violet-50"
          initial={{ opacity: 0, y: -4, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, delay: T_STEP2 + 0.15 }}
        >
          STEP 2 · 요구 수신
        </motion.span>
      </div>
    </motion.div>
  );
}

function PhaseCard({ phase, idx }: { phase: Phase; idx: number }) {
  const t = TONE[phase.tone];
  const activateAt = T_STEPS[idx];
  return (
    <motion.div
      className={`absolute rounded-2xl border-2 ${t.border} ${t.bg} ${t.glow}`}
      style={{
        left: cardL(idx),
        top: PIPELINE_T,
        width: CARD_W,
        height: CARD_H,
      }}
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: activateAt, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between px-3 pt-3">
        <span
          className={`rounded-full border ${t.pill} px-2 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-wider`}
        >
          STEP {phase.step}
        </span>
        <span className={`${t.accent} h-[18px] w-[18px]`}>{phase.icon}</span>
      </div>
      <div className={`px-3 pt-3 text-[16px] font-semibold ${t.text}`}>
        {phase.label}
      </div>
      <div className="mt-1 px-3 text-[10px] text-neutral-400">
        {phase.agents.length === 1
          ? "1 agent"
          : `${phase.agents.length} agents`}
      </div>
      <div className="mt-2.5 flex flex-col gap-1.5 px-3">
        {phase.agents.map((a, j) => (
          <motion.div
            key={a}
            className={`rounded-md border ${t.pill} px-2 py-1 text-[11px]`}
            initial={{ opacity: 0, x: -3 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
              delay: activateAt + 0.25 + j * 0.12,
            }}
          >
            {a}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function WorkflowSlide() {
  return (
    <SlideLayout
      title="서브에이전트와 함께하는 워크플로우"
      subtitle="메인 에이전트는 서브에이전트들을 적절한 타이밍에 호출하는 오케스트레이터 역할을 해요"
    >
      <div
        className="relative text-neutral-200"
        style={{ width: W, height: H }}
      >
        <svg
          className="pointer-events-none absolute inset-0"
          width={W}
          height={H}
        >
          <DArrow
            x1={BUBBLE_R + 4}
            y1={BUBBLE_CY}
            x2={MAIN_L - 4}
            y2={MAIN_T + MAIN_H / 2}
            delay={T_STEP1 + 0.55}
            color="#fda4af"
            duration={0.55}
          />

          <DArrow
            x1={MAIN_CX}
            y1={MAIN_T + MAIN_H + 2}
            x2={cardCX(0)}
            y2={PIPELINE_T - 6}
            delay={T_STEP3 - 0.15}
            color="#c4b5fd"
            duration={0.85}
          />

          {PHASES.slice(1).map((_, i) => {
            const fromIdx = i;
            const toIdx = i + 1;
            const fromTone = TONE[PHASES[toIdx].tone];
            return (
              <DArrow
                key={`pipe-${toIdx}`}
                x1={cardR(fromIdx) + 2}
                y1={CARD_CY}
                x2={cardL(toIdx) - 2}
                y2={CARD_CY}
                delay={T_STEPS[toIdx] - 0.2}
                color={fromTone.arrow}
                duration={0.5}
                headLen={9}
                headW={5}
              />
            );
          })}
        </svg>

        <User />
        <SpeechBubble />
        <MainAgent />

        {PHASES.map((phase, i) => (
          <PhaseCard key={phase.step} phase={phase} idx={i} />
        ))}

        <motion.div
          className="absolute"
          style={{
            left: cardL(CARD_COUNT - 1) + CARD_W / 2 - 80,
            top: PIPELINE_T + CARD_H + 10,
            width: 160,
          }}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: T_STEP9 + 0.6 }}
        >
          <div className="mx-auto rounded-full border border-fuchsia-400/55 bg-fuchsia-500/15 px-3 py-1 text-center font-mono text-[10.5px] text-fuchsia-100 shadow-[0_0_18px_rgba(232,121,249,0.3)]">
            ✓ 유저에게 PR 전달
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
