import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";
import claudeCodeImage from "../assets/claude-code.png";

const W = 1200;
const H = 540;

const STEP = 1.6;
const T_ACTORS = 0.3;
const T_DISPATCH = T_ACTORS + STEP;
const T_GOAL = T_DISPATCH + 0.4;
const T_WORK = T_DISPATCH + STEP;
const T_SUMMARY = T_WORK + STEP;
const T_FINAL = T_SUMMARY + STEP;

const Y_MAIN = 10;
const MAIN_H = 112;
const MAIN_W = 560;
const MAIN_CX = W / 2;
const Y_MAIN_BOT = Y_MAIN + MAIN_H;

const Y_LANE = Y_MAIN_BOT + 70;
const LANE_W = 340;
const LANE_H = 330;
const LANE_CX = [220, 600, 980];

type Tone = "amber" | "cyan" | "emerald";

const TONE: Record<
  Tone,
  {
    border: string;
    bg: string;
    text: string;
    badge: string;
    arrow: string;
    glow: string;
    accent: string;
  }
> = {
  amber: {
    border: "border-amber-400/60",
    bg: "bg-amber-500/8",
    text: "text-amber-100",
    badge: "border-amber-400/55 bg-amber-500/20 text-amber-100",
    arrow: "#fbbf24",
    glow: "shadow-[0_0_22px_rgba(251,191,36,0.22)]",
    accent: "text-amber-300",
  },
  cyan: {
    border: "border-cyan-400/60",
    bg: "bg-cyan-500/8",
    text: "text-cyan-100",
    badge: "border-cyan-400/55 bg-cyan-500/20 text-cyan-100",
    arrow: "#67e8f9",
    glow: "shadow-[0_0_22px_rgba(103,232,249,0.22)]",
    accent: "text-cyan-300",
  },
  emerald: {
    border: "border-emerald-400/60",
    bg: "bg-emerald-500/8",
    text: "text-emerald-100",
    badge: "border-emerald-400/55 bg-emerald-500/20 text-emerald-100",
    arrow: "#6ee7b7",
    glow: "shadow-[0_0_22px_rgba(110,231,183,0.22)]",
    accent: "text-emerald-300",
  },
};

type Lane = {
  id: string;
  tone: Tone;
  label: string;
  goal: string;
  ops: string[];
  summary: string;
};

const LANES: Lane[] = [
  {
    id: "auth",
    tone: "amber",
    label: "Explore #1",
    goal: "재사용 가능한 인증 로직 위치",
    ops: ['Grep("signIn|useAuth")', 'Read("src/auth/session.ts")'],
    summary: "useAuth 훅 재사용 가능",
  },
  {
    id: "entry",
    tone: "cyan",
    label: "Explore #2",
    goal: "메인 화면 엔트리·Header 컴포넌트",
    ops: ['Glob("src/routes/*.tsx")', 'Read("src/components/Header.tsx")'],
    summary: "Header.tsx에 버튼 추가 적합",
  },
  {
    id: "design",
    tone: "emerald",
    label: "Explore #3",
    goal: "기존 버튼·디자인 시스템 조사",
    ops: ['Glob("src/ui/*.tsx")', 'Read("src/ui/Button.tsx")'],
    summary: "ui/Button · variant=primary 권장",
  },
];

const FINAL_SUMMARY =
  'Header.tsx에 <Button variant="primary"> 삽입 · onClick → useAuth.signIn';

function SearchIcon({ className }: { className?: string }) {
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
      <circle cx={14} cy={14} r={7} />
      <line x1={19} y1={19} x2={26} y2={26} />
    </svg>
  );
}

function DArrow({
  x1,
  y1,
  x2,
  y2,
  delay,
  color,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
  color: string;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const L = Math.hypot(dx, dy) || 1;
  const ux = dx / L;
  const uy = dy / L;
  const headLen = 12;
  const headW = 7;
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
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeOpacity={0.85}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.85, delay, ease: "easeOut" }}
      />
      <motion.polygon
        points={`${x2},${y2} ${w1x},${w1y} ${w2x},${w2y}`}
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: delay + 0.78 }}
      />
    </motion.g>
  );
}

function MainCard() {
  return (
    <motion.div
      className="absolute rounded-2xl border-2 border-violet-400/60 bg-violet-500/10 shadow-[0_0_34px_rgba(167,139,250,0.35)]"
      style={{
        left: MAIN_CX - MAIN_W / 2,
        top: Y_MAIN,
        width: MAIN_W,
        height: MAIN_H,
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: T_ACTORS, ease: "easeOut" }}
    >
      <div className="flex items-center gap-3 px-4 pt-3">
        <img
          src={claudeCodeImage}
          alt=""
          className="h-9 w-9 rounded object-contain"
        />
        <span className="text-[15px] font-semibold text-violet-100">
          Claude Code (메인)
        </span>
        <motion.span
          className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-violet-400/50 bg-violet-500/20 px-2.5 py-0.5 font-mono text-[11px] text-violet-100"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: T_DISPATCH - 0.1 }}
        >
          <span className="text-violet-300">⎇</span>
          Task() × 3 병렬 dispatch
        </motion.span>
      </div>
      <motion.div
        className="mx-4 mt-2.5 rounded-md border border-emerald-400/55 bg-emerald-500/15 px-3 py-1.5 text-[12.5px] text-emerald-100 shadow-[0_0_18px_rgba(52,211,153,0.28)]"
        initial={{ opacity: 0, y: 6, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, delay: T_FINAL, ease: "easeOut" }}
      >
        <span className="mr-2 font-mono text-[9px] uppercase tracking-wider text-emerald-300">
          synthesis
        </span>
        {FINAL_SUMMARY}
      </motion.div>
    </motion.div>
  );
}

function OpLine({
  op,
  tone,
  delay,
}: {
  op: string;
  tone: Tone;
  delay: number;
}) {
  const t = TONE[tone];
  return (
    <motion.div
      className={`flex items-center gap-2 rounded border ${t.border} bg-neutral-900/45 px-2.5 py-1.5 font-mono text-[11px] ${t.text}`}
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <span className={`${t.accent} opacity-80`}>›</span>
      <span className="truncate">{op}</span>
      <motion.span
        className="ml-auto text-[9px] uppercase tracking-wider text-emerald-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: delay + 0.45 }}
      >
        ✓
      </motion.span>
    </motion.div>
  );
}

function LaneCard({ lane, idx }: { lane: Lane; idx: number }) {
  const t = TONE[lane.tone];
  const left = LANE_CX[idx] - LANE_W / 2;
  return (
    <motion.div
      className={`absolute rounded-2xl border-2 ${t.border} ${t.bg} ${t.glow}`}
      style={{
        left,
        top: Y_LANE,
        width: LANE_W,
        height: LANE_H,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: T_ACTORS + idx * 0.1,
        ease: "easeOut",
      }}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-3.5 py-2.5">
        <span
          className={`rounded-full border ${t.badge} px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider`}
        >
          {lane.label}
        </span>
        <span className={`ml-auto ${t.accent}`}>
          <SearchIcon className="h-4 w-4" />
        </span>
      </div>

      <motion.div
        className="mx-3 mt-3 rounded-md border border-white/15 bg-neutral-900/60 px-3 py-2 text-[12px] text-neutral-100"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: T_GOAL + idx * 0.1 }}
      >
        <span
          className={`mr-2 font-mono text-[9px] uppercase tracking-wider ${t.accent}`}
        >
          goal
        </span>
        {lane.goal}
      </motion.div>

      <div className="mx-3 mt-2.5 space-y-1.5">
        {lane.ops.map((op, j) => (
          <OpLine
            key={op}
            op={op}
            tone={lane.tone}
            delay={T_WORK + idx * 0.15 + j * 0.4}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-x-3 bottom-3 rounded-md border border-emerald-400/55 bg-emerald-500/15 px-3 py-2 text-[12px] text-emerald-100 shadow-[0_0_16px_rgba(52,211,153,0.28)]"
        initial={{ opacity: 0, y: 6, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.4,
          delay: T_SUMMARY + idx * 0.18,
          ease: "easeOut",
        }}
      >
        <span className="mr-2 font-mono text-[9px] uppercase tracking-wider text-emerald-300">
          summary
        </span>
        {lane.summary}
      </motion.div>
    </motion.div>
  );
}

export function ParallelExploreSlide() {
  return (
    <SlideLayout
      title="추가적인 장점"
      subtitle="서브에이전트 여러 개를 병렬로 호출해서, 더 많은 탐색을 더 빠르게 마칠 수도 있어요"
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
          {LANES.map((lane, i) => {
            const t = TONE[lane.tone];
            const x1 = MAIN_CX + (i - 1) * 60;
            const y1 = Y_MAIN_BOT + 2;
            const x2 = LANE_CX[i];
            const y2 = Y_LANE - 6;
            return (
              <DArrow
                key={lane.id}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                delay={T_DISPATCH + i * 0.08}
                color={t.arrow}
              />
            );
          })}
        </svg>

        <MainCard />
        {LANES.map((lane, i) => (
          <LaneCard key={lane.id} lane={lane} idx={i} />
        ))}
      </div>
    </SlideLayout>
  );
}
