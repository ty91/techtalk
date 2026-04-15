import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";

type Tone = "amber" | "violet" | "cyan" | "slate" | "sky" | "rose" | "neutral";

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
  neutral: {
    card: "border-dashed border-neutral-500/50 bg-neutral-800/50",
    tag: "text-neutral-400",
    label: "text-neutral-200",
  },
};

type BaseRow = { tag: string; label: string; tone: Tone };

const BASE_CONTEXT: BaseRow[] = [
  { tag: "SYSTEM", label: "system prompt", tone: "amber" },
  { tag: "TOOLS", label: "Read, Edit, Bash, Grep…", tone: "violet" },
  { tag: "MCP", label: "linear, github, sentry…", tone: "cyan" },
  { tag: "GLOBAL", label: "~/.claude/CLAUDE.md", tone: "slate" },
  { tag: "REPO", label: "./CLAUDE.md", tone: "slate" },
];

const FILES = [
  "package.json",
  "tsconfig.json",
  "vite.config.ts",
  "src/main.tsx",
  "src/App.tsx",
  "src/routes/index.tsx",
  "src/routes/home.tsx",
  "src/components/Header.tsx",
  "src/components/Nav.tsx",
  "src/components/Button.tsx",
  "src/auth/session.ts",
  "src/api/client.ts",
];

const USER_MSG = "메인 화면에 로그인 버튼을 달아줘";
const THINKING_MSG = "작업하기 전에 저장소 구조부터 파악해야겠다…";

const BASE_STAGGER = 0.12;
const BASE_DELAY = 0.4;
const BASE_DONE = BASE_DELAY + BASE_CONTEXT.length * BASE_STAGGER + 0.5;
const USER_AT = BASE_DONE;
const THINKING_AT = USER_AT + 1.4;
const READ_START = THINKING_AT + 1.4;
const READ_STEP = 0.85;

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

function FileIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 3 L15 3 L19 7 L19 21 L7 21 Z" />
      <path d="M15 3 L15 7 L19 7" />
    </svg>
  );
}

function ContextRow({
  row,
  delay,
  initialScale = 1,
}: {
  row: BaseRow;
  delay: number;
  initialScale?: number;
}) {
  const t = TONE_CLS[row.tone];
  return (
    <motion.div
      className={`flex items-center justify-between rounded-md border px-2.5 py-1 ${t.card}`}
      initial={{ opacity: 0, y: 4, scale: initialScale }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
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

function UserBubble() {
  return (
    <motion.div
      className="flex items-start gap-2.5"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="shrink-0 rounded-full border border-rose-400/50 bg-rose-500/15 p-1.5 text-rose-200">
        <UserIcon className="h-5 w-5" />
      </div>
      <div className="rounded-2xl border border-rose-400/40 bg-rose-500/10 px-3.5 py-2 text-sm text-rose-50">
        “{USER_MSG}”
      </div>
    </motion.div>
  );
}

function AgentHeader() {
  return (
    <motion.div
      className="mt-5 flex items-center gap-2.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.35 }}
    >
      <div className="rounded-full border border-violet-400/60 bg-violet-500/15 p-2 text-violet-100 shadow-[0_0_20px_rgba(167,139,250,0.25)]">
        <AgentIcon className="h-9 w-9" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-neutral-100">
          Claude Code
        </span>
        <span className="text-[10px] uppercase tracking-wider text-neutral-500">
          exploring repo…
        </span>
      </div>
    </motion.div>
  );
}

function ThinkingBubble() {
  return (
    <motion.div
      className="mt-3 self-start rounded-2xl border border-dashed border-neutral-500/50 bg-neutral-800/50 px-3.5 py-2 text-[13px] italic text-neutral-300"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: THINKING_AT - 0.35 }}
    >
      💭 {THINKING_MSG}
    </motion.div>
  );
}

function ReadLine({ file, index }: { file: string; index: number }) {
  const delay = READ_START + index * READ_STEP;
  return (
    <motion.div
      className="flex items-center gap-2 rounded border border-sky-400/25 bg-sky-500/5 px-2 py-1 font-mono text-[11px]"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay }}
    >
      <motion.span
        className="text-sky-300"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 0.8, delay, repeat: 1 }}
      >
        <FileIcon className="h-3.5 w-3.5" />
      </motion.span>
      <span className="text-neutral-500">Read(</span>
      <span className="truncate text-sky-200">{file}</span>
      <span className="text-neutral-500">)</span>
      <motion.span
        className="ml-auto text-[9px] uppercase tracking-wider text-emerald-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: delay + 0.35 }}
      >
        ✓
      </motion.span>
    </motion.div>
  );
}

function FileContextRow({ file, index }: { file: string; index: number }) {
  const delay = READ_START + index * READ_STEP + 0.2;
  return (
    <motion.div
      className="flex items-center justify-between rounded-md border border-sky-400/40 bg-sky-500/10 px-2.5 py-1"
      initial={{ opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
    >
      <span className="truncate font-mono text-[10px] text-sky-100">
        {file}
      </span>
      <span className="shrink-0 pl-2 font-mono text-[8px] font-semibold uppercase tracking-wider text-sky-300">
        FILE
      </span>
    </motion.div>
  );
}

export function AgenticReadSlide() {
  return (
    <SlideLayout title="파일을 읽는 것도 에이전틱하게 바꾼다면?">
      <div className="grid w-full max-w-6xl grid-cols-[1.15fr_1fr] items-start gap-8">
        {/* Left: Scene */}
        <div className="flex flex-col">
          <UserBubble />
          <AgentHeader />
          <ThinkingBubble />
          <div className="mt-3 flex flex-col gap-1">
            {FILES.map((f, i) => (
              <ReadLine key={f} file={f} index={i} />
            ))}
          </div>
        </div>

        {/* Right: Context */}
        <div className="relative self-stretch rounded-2xl border border-emerald-400/40 bg-emerald-400/5 px-4 pt-5 pb-4">
          <div className="absolute -top-2.5 left-5 rounded-full bg-neutral-950 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
            CONTEXT
          </div>
          <div className="flex flex-col gap-1">
            {BASE_CONTEXT.map((row, i) => (
              <ContextRow
                key={row.tag + row.label}
                row={row}
                delay={BASE_DELAY + i * BASE_STAGGER}
              />
            ))}
            <ContextRow
              row={{ tag: "USER", label: `“${USER_MSG}”`, tone: "rose" }}
              delay={USER_AT}
              initialScale={0.96}
            />
            <ContextRow
              row={{
                tag: "THINK",
                label: `💭 ${THINKING_MSG}`,
                tone: "neutral",
              }}
              delay={THINKING_AT}
              initialScale={0.96}
            />
            {FILES.map((f, i) => (
              <FileContextRow key={f} file={f} index={i} />
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
