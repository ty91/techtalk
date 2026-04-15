import type { ReactNode } from "react";
import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";
import claudeCodeImage from "../assets/claude-code.png";

const W = 1280;
const H = 580;

const X_USER = 140;
const X_CC = 480;
const X_EXPLORE = 1140;

const Y_LIFELINE_TOP = 130;
const Y_LIFELINE_BOT = 560;

const Y_USER_ARROW = 200;
const Y_TASK = 335;
const TASK_PANEL_W = 540;
const TASK_PANEL_H = 154;
const TASK_PANEL_CX = (X_CC + X_EXPLORE) / 2;
const TASK_PANEL_LEFT = TASK_PANEL_CX - TASK_PANEL_W / 2;
const TASK_PANEL_RIGHT = TASK_PANEL_CX + TASK_PANEL_W / 2;
const Y_WORK = 450;
const Y_RESP = 525;

const S = 1.6;
const T_ACTORS = 0.25;
const T_USER = T_ACTORS + S;
const T_TASK = T_USER + S;
const T_TASK_PANEL = T_TASK + 0.35;
const T_TASK_GOAL = T_TASK + 0.65;
const T_TASK_FORMAT = T_TASK + 0.95;
const T_TASK_OUT = T_TASK + 1.2;
const T_WORK = T_TASK + S;
const T_RESP = T_WORK + S;

const USER_MSG = "메인 화면에 로그인 버튼을 달아줘";
const TASK_GOAL =
  "메인 화면 엔트리 파일과 재사용 가능한 인증 로직 위치를 찾아줘";
const TASK_FORMAT =
  "{ entrypoint: string, auth_modules: string[], 추천: string }";
const RESP_SUMMARY =
  'entrypoint="src/routes/home.tsx", auth_modules=[session.ts, client.ts], 추천="Header에 로그인 버튼 추가"';

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

type ActorTone = "rose" | "violet" | "emerald";
const ACTOR_TONE: Record<ActorTone, string> = {
  rose: "border-rose-400/60 bg-rose-500/15 text-rose-100 shadow-[0_0_24px_rgba(244,63,94,0.28)]",
  violet:
    "border-violet-400/60 bg-violet-500/15 text-violet-100 shadow-[0_0_24px_rgba(167,139,250,0.28)]",
  emerald:
    "border-emerald-400/60 bg-emerald-500/15 text-emerald-100 shadow-[0_0_24px_rgba(52,211,153,0.28)]",
};

function Actor({
  x,
  tone,
  icon,
  label,
  delay,
}: {
  x: number;
  tone: ActorTone;
  icon: ReactNode;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute flex flex-col items-center -translate-x-1/2"
      style={{ left: x, top: 0 }}
      initial={{ opacity: 0, y: -8, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      <div
        className={`flex h-20 w-20 items-center justify-center rounded-2xl border ${ACTOR_TONE[tone]}`}
      >
        {icon}
      </div>
      <span className="mt-2 whitespace-nowrap text-[13px] font-semibold text-neutral-100">
        {label}
      </span>
    </motion.div>
  );
}

function Lifeline({ x, delay }: { x: number; delay: number }) {
  return (
    <motion.path
      d={`M ${x} ${Y_LIFELINE_TOP} L ${x} ${Y_LIFELINE_BOT}`}
      stroke="#d4d4d4"
      strokeOpacity={0.22}
      strokeWidth={1}
      strokeDasharray="5 7"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    />
  );
}

function HArrow({
  x1,
  x2,
  y,
  delay,
  color,
  withHead = true,
}: {
  x1: number;
  x2: number;
  y: number;
  delay: number;
  color: string;
  withHead?: boolean;
}) {
  const dir = Math.sign(x2 - x1);
  const headBaseX = x2 - dir * 10;
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, delay }}
    >
      <motion.path
        d={`M ${x1} ${y} L ${x2} ${y}`}
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.75, delay, ease: "easeOut" }}
      />
      {withHead && (
        <motion.polygon
          points={`${x2},${y} ${headBaseX},${y - 7} ${headBaseX},${y + 7}`}
          fill={color}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: delay + 0.7 }}
        />
      )}
    </motion.g>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-950/95 font-mono text-[11px] font-bold text-neutral-100 ring-1 ring-white/30">
      {n}
    </span>
  );
}

function UserMsgLabel() {
  const cx = (X_USER + X_CC) / 2;
  return (
    <motion.div
      className="absolute flex -translate-x-1/2 -translate-y-full items-center gap-2 whitespace-nowrap pb-1.5"
      style={{ left: cx, top: Y_USER_ARROW }}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: T_USER, ease: "easeOut" }}
    >
      <StepBadge n={1} />
      <div className="rounded-lg border border-rose-400/50 bg-rose-500/15 px-3 py-1.5 text-[13px] text-rose-50">
        “{USER_MSG}”
      </div>
    </motion.div>
  );
}

function TaskPanel() {
  return (
    <motion.div
      className="absolute overflow-hidden rounded-2xl border-2 border-violet-400/70 bg-violet-500/10 shadow-[0_0_44px_rgba(167,139,250,0.45)]"
      style={{
        left: TASK_PANEL_LEFT,
        top: Y_TASK - TASK_PANEL_H / 2,
        width: TASK_PANEL_W,
      }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay: T_TASK_PANEL, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2 border-b border-violet-400/30 bg-violet-500/20 px-3.5 py-2">
        <StepBadge n={2} />
        <span className="font-mono text-[12px] font-semibold text-violet-100">
          Task request · subagent_type=&quot;Explore&quot;
        </span>
      </div>
      <div className="space-y-2 px-4 py-3.5 font-mono text-[13px] leading-relaxed">
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: T_TASK_GOAL }}
        >
          <span className="shrink-0 text-sky-300">goal:</span>
          <span className="text-emerald-100">&quot;{TASK_GOAL}&quot;</span>
        </motion.div>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: T_TASK_FORMAT }}
        >
          <span className="shrink-0 text-sky-300">output_format:</span>
          <span className="text-emerald-100">{TASK_FORMAT}</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

function WorkingIndicator() {
  return (
    <motion.div
      className="absolute flex -translate-x-1/2 items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-500/10 px-3 py-1.5 text-[12px] text-emerald-100 shadow-[0_0_20px_rgba(52,211,153,0.3)]"
      style={{ left: X_EXPLORE, top: Y_WORK }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: T_WORK }}
    >
      <StepBadge n={3} />
      <span>파일시스템 탐색 중</span>
      <span className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1 w-1 rounded-full bg-emerald-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{
              duration: 1.1,
              delay: T_WORK + 0.3 + i * 0.18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </span>
    </motion.div>
  );
}

function ResponseLabel() {
  const cx = (X_CC + X_EXPLORE) / 2;
  return (
    <motion.div
      className="absolute flex -translate-x-1/2 -translate-y-full items-center gap-2 pb-1.5"
      style={{ left: cx, top: Y_RESP, maxWidth: 720 }}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: T_RESP, ease: "easeOut" }}
    >
      <StepBadge n={4} />
      <div className="rounded-lg border border-emerald-400/50 bg-emerald-500/15 px-3 py-1.5 font-mono text-[12px] text-emerald-100">
        {RESP_SUMMARY}
      </div>
    </motion.div>
  );
}

export function ExploreDelegationSlide() {
  return (
    <SlideLayout title="파일시스템 탐색을 담당하는 서브에이전트">
      <div className="relative text-neutral-200" style={{ width: W, height: H }}>
        <svg
          className="pointer-events-none absolute inset-0"
          width={W}
          height={H}
        >
          <Lifeline x={X_USER} delay={T_ACTORS + 0.1} />
          <Lifeline x={X_CC} delay={T_ACTORS + 0.2} />
          <Lifeline x={X_EXPLORE} delay={T_ACTORS + 0.3} />

          <HArrow
            x1={X_USER + 40}
            x2={X_CC - 40}
            y={Y_USER_ARROW}
            delay={T_USER + 0.2}
            color="#fda4af"
          />
          <HArrow
            x1={X_CC + 40}
            x2={TASK_PANEL_LEFT - 6}
            y={Y_TASK}
            delay={T_TASK}
            color="#c4b5fd"
            withHead={false}
          />
          <HArrow
            x1={TASK_PANEL_RIGHT + 6}
            x2={X_EXPLORE - 40}
            y={Y_TASK}
            delay={T_TASK_OUT}
            color="#c4b5fd"
          />
          <HArrow
            x1={X_EXPLORE - 40}
            x2={X_CC + 40}
            y={Y_RESP}
            delay={T_RESP + 0.2}
            color="#86efac"
          />
        </svg>

        <Actor
          x={X_USER}
          tone="rose"
          icon={<UserIcon className="h-10 w-10" />}
          label="User"
          delay={T_ACTORS}
        />
        <Actor
          x={X_CC}
          tone="violet"
          icon={
            <img
              src={claudeCodeImage}
              alt=""
              className="h-12 w-12 object-contain"
            />
          }
          label="Claude Code (메인)"
          delay={T_ACTORS + 0.15}
        />
        <Actor
          x={X_EXPLORE}
          tone="emerald"
          icon={<SearchIcon className="h-10 w-10" />}
          label="Explore (서브에이전트)"
          delay={T_ACTORS + 0.3}
        />

        <UserMsgLabel />
        <TaskPanel />
        <WorkingIndicator />
        <ResponseLabel />
      </div>
    </SlideLayout>
  );
}
