import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";
import claudeCodeImage from "../assets/claude-code.png";

type Tone =
  | "amber"
  | "violet"
  | "cyan"
  | "slate"
  | "sky"
  | "rose"
  | "emerald"
  | "neutral";

const TONE_CLS: Record<Tone, { card: string; tag: string; label: string }> = {
  amber: {
    card: "border-amber-400/50 bg-amber-500/10",
    tag: "text-amber-300",
    label: "text-amber-100",
  },
  violet: {
    card: "border-violet-400/50 bg-violet-500/10",
    tag: "text-violet-300",
    label: "text-violet-100",
  },
  cyan: {
    card: "border-cyan-400/50 bg-cyan-500/10",
    tag: "text-cyan-300",
    label: "text-cyan-100",
  },
  slate: {
    card: "border-white/15 bg-neutral-800/40",
    tag: "text-neutral-400",
    label: "text-neutral-100",
  },
  sky: {
    card: "border-sky-400/50 bg-sky-500/10",
    tag: "text-sky-300",
    label: "text-sky-100",
  },
  rose: {
    card: "border-rose-400/50 bg-rose-500/10",
    tag: "text-rose-300",
    label: "text-rose-100",
  },
  emerald: {
    card: "border-emerald-400/50 bg-emerald-500/10",
    tag: "text-emerald-300",
    label: "text-emerald-100",
  },
  neutral: {
    card: "border-dashed border-neutral-500/50 bg-neutral-800/50",
    tag: "text-neutral-400",
    label: "text-neutral-200",
  },
};

type Row = { tag: string; label: string; tone: Tone };

const MAIN_BASE: Row[] = [
  { tag: "SYSTEM", label: "system prompt", tone: "amber" },
  { tag: "TOOLS", label: "Task, Read, Edit, Bash…", tone: "violet" },
  { tag: "MCP", label: "linear, github, sentry…", tone: "cyan" },
  { tag: "GLOBAL", label: "~/.claude/CLAUDE.md", tone: "slate" },
  { tag: "REPO", label: "./CLAUDE.md", tone: "slate" },
];

const EXPLORE_BASE: Row[] = [
  { tag: "SYSTEM", label: "Explore agent prompt", tone: "amber" },
  { tag: "TOOLS", label: "Glob, Grep, Read", tone: "violet" },
];

const USER_MSG = "메인 화면에 로그인 버튼을 달아줘";
const THINK_MSG = "파일시스템 탐색은 Explore에게 위임하자";

const TASK_GOAL =
  "메인 화면 엔트리 파일과 재사용 가능한 인증 로직 위치를 찾아줘";
const TASK_FORMAT =
  "{ entrypoint: string, auth_modules: string[], 추천: string }";

const OPS = [
  'Glob("src/**/*.tsx")',
  'Grep("login|signIn")',
  'Read("src/routes/home.tsx")',
  'Read("src/auth/session.ts")',
  'Read("src/components/Header.tsx")',
];

const SUMMARY_COMPACT =
  "entrypoint=home.tsx · auth=session.ts · Header에 버튼 추가 추천";

const STEP = 1.6;
const BASE_STAGGER = 0.1;
const T_BASE = 0.35;
const T_BASE_DONE = T_BASE + MAIN_BASE.length * BASE_STAGGER;
const T_USER = T_BASE_DONE + 0.2;
const T_THINK = T_USER + STEP;
const T_TASK = T_THINK + STEP;
const T_TRANSFER = T_TASK + STEP;
const T_GOAL_RECV = T_TRANSFER + 0.5;
const T_WORK = T_GOAL_RECV + STEP;
const OP_GAP = STEP / OPS.length;
const T_SUMMARY_EXPLORE = T_WORK + OPS.length * OP_GAP + 0.15;
const T_RETURN = T_SUMMARY_EXPLORE + STEP;
const T_SUMMARY_MAIN = T_RETURN + 0.5;

function ContextRow({
  row,
  delay,
  initialScale = 1,
}: {
  row: Row;
  delay: number;
  initialScale?: number;
}) {
  const t = TONE_CLS[row.tone];
  return (
    <motion.div
      className={`flex items-center justify-between rounded-md border px-2.5 py-1 ${t.card}`}
      initial={{ opacity: 0, y: 4, scale: initialScale }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
    >
      <span className={`truncate text-[11px] font-medium ${t.label}`}>
        {row.label}
      </span>
      <span
        className={`shrink-0 pl-2 font-mono text-[8px] font-semibold uppercase tracking-wider ${t.tag}`}
      >
        {row.tag}
      </span>
    </motion.div>
  );
}

function OpRow({ op, delay }: { op: string; delay: number }) {
  return (
    <motion.div
      className="flex items-center gap-2 rounded border border-sky-400/25 bg-sky-500/5 px-2 py-1 font-mono text-[10.5px]"
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay }}
    >
      <span className="text-sky-300">›</span>
      <span className="truncate text-sky-100">{op}</span>
      <motion.span
        className="ml-auto text-[9px] uppercase tracking-wider text-emerald-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: delay + 0.3 }}
      >
        ✓
      </motion.span>
    </motion.div>
  );
}

function TaskCallBlock({ delay }: { delay: number }) {
  return (
    <motion.div
      className="mt-1 rounded-md border border-violet-400/50 bg-violet-500/10 px-2.5 py-1.5 font-mono text-[10.5px] leading-snug text-violet-100 shadow-[0_0_18px_rgba(167,139,250,0.25)]"
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      <div>
        <span className="text-violet-300">Task</span>
        <span className="text-neutral-400">({"{"}</span>
      </div>
      <div className="ml-3">
        <span className="text-sky-300">subagent_type</span>
        <span className="text-neutral-400">: </span>
        <span className="text-amber-200">"Explore"</span>
        <span className="text-neutral-400">,</span>
      </div>
      <div className="ml-3">
        <span className="text-sky-300">goal</span>
        <span className="text-neutral-400">: </span>
        <span className="text-emerald-200">"{TASK_GOAL}"</span>
        <span className="text-neutral-400">,</span>
      </div>
      <div className="ml-3">
        <span className="text-sky-300">output_format</span>
        <span className="text-neutral-400">: </span>
        <span className="text-emerald-200">"{TASK_FORMAT}"</span>
      </div>
      <div>
        <span className="text-neutral-400">{"}"})</span>
      </div>
    </motion.div>
  );
}

function Arrow({
  direction,
  label,
  delay,
}: {
  direction: "right" | "left";
  label: string;
  delay: number;
}) {
  const path = direction === "right" ? "M6 12 L118 12" : "M118 12 L6 12";
  const head =
    direction === "right" ? "M110 6 L118 12 L110 18" : "M14 6 L6 12 L14 18";
  return (
    <motion.div
      className="flex flex-col items-center gap-1 text-neutral-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      <span className="whitespace-nowrap font-mono text-[10px] text-neutral-400">
        {label}
      </span>
      <svg width={124} height={24} viewBox="0 0 124 24" fill="none">
        <motion.path
          d={path}
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay, ease: "easeOut" }}
        />
        <motion.path
          d={head}
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: delay + 0.75 }}
        />
      </svg>
    </motion.div>
  );
}

function PanelHeader({
  tone,
  label,
  icon,
}: {
  tone: "violet" | "emerald";
  label: string;
  icon: React.ReactNode;
}) {
  const color = tone === "violet" ? "text-violet-300" : "text-emerald-300";
  return (
    <div className="absolute -top-3 left-4 flex items-center gap-1.5 rounded-full bg-neutral-950 px-2 py-0.5">
      {icon}
      <span
        className={`font-mono text-[10px] font-semibold uppercase tracking-wider ${color}`}
      >
        {label}
      </span>
    </div>
  );
}

function ExploreIcon({ className }: { className?: string }) {
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

export function ExploreSubagentSlide() {
  return (
    <SlideLayout title="메인 에이전트의 컨텍스트가 절약됩니다">
      <div className="grid w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-stretch gap-5">
        {/* Main agent panel */}
        <div className="relative rounded-2xl border border-violet-400/40 bg-violet-400/5 px-3.5 pt-5 pb-3">
          <PanelHeader
            tone="violet"
            label="Claude Code (메인)"
            icon={
              <img
                src={claudeCodeImage}
                alt=""
                className="h-4 w-4 rounded object-contain"
              />
            }
          />
          <div className="flex flex-col gap-1">
            {MAIN_BASE.map((r, i) => (
              <ContextRow
                key={r.tag}
                row={r}
                delay={T_BASE + i * BASE_STAGGER}
              />
            ))}
            <ContextRow
              row={{ tag: "USER", label: `"${USER_MSG}"`, tone: "rose" }}
              delay={T_USER}
              initialScale={0.96}
            />
            <ContextRow
              row={{
                tag: "THINK",
                label: `💭 ${THINK_MSG}`,
                tone: "neutral",
              }}
              delay={T_THINK}
              initialScale={0.96}
            />
            <TaskCallBlock delay={T_TASK} />
            <ContextRow
              row={{ tag: "RESULT", label: SUMMARY_COMPACT, tone: "emerald" }}
              delay={T_SUMMARY_MAIN}
              initialScale={0.96}
            />
          </div>
        </div>

        {/* Arrows column */}
        <div className="flex flex-col items-center justify-center gap-6 px-1">
          <Arrow
            direction="right"
            label="Task(goal, output_format)"
            delay={T_TRANSFER}
          />
          <Arrow direction="left" label="summary" delay={T_RETURN} />
        </div>

        {/* Explore agent panel */}
        <div className="relative rounded-2xl border border-emerald-400/40 bg-emerald-400/5 px-3.5 pt-5 pb-3">
          <PanelHeader
            tone="emerald"
            label="Explore (서브에이전트)"
            icon={
              <span className="text-emerald-300">
                <ExploreIcon className="h-4 w-4" />
              </span>
            }
          />
          <div className="flex flex-col gap-1">
            {EXPLORE_BASE.map((r, i) => (
              <ContextRow
                key={r.tag}
                row={r}
                delay={T_BASE + i * BASE_STAGGER}
              />
            ))}
            <ContextRow
              row={{ tag: "GOAL", label: TASK_GOAL, tone: "rose" }}
              delay={T_GOAL_RECV}
              initialScale={0.96}
            />
            <ContextRow
              row={{ tag: "FORMAT", label: TASK_FORMAT, tone: "cyan" }}
              delay={T_GOAL_RECV + 0.2}
              initialScale={0.96}
            />
            {OPS.map((op, i) => (
              <OpRow key={op} op={op} delay={T_WORK + i * OP_GAP} />
            ))}
            <ContextRow
              row={{
                tag: "SUMMARY",
                label: SUMMARY_COMPACT,
                tone: "emerald",
              }}
              delay={T_SUMMARY_EXPLORE}
              initialScale={0.96}
            />
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
