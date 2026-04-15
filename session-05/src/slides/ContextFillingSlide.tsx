import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";

type BaseCard = {
  tag: string;
  label: string;
  cardCls: string;
  tagCls: string;
  labelCls: string;
};

type Action = {
  kind: "file" | "web";
  label: string;
  tag: string;
  preview: string[];
  cardCls: string;
  tagCls: string;
  labelCls: string;
};

const BASE_CARDS: BaseCard[] = [
  {
    tag: "SYSTEM",
    label: "시스템 프롬프트",
    cardCls: "border-amber-400/50 bg-amber-500/10",
    tagCls: "text-amber-300",
    labelCls: "text-amber-100",
  },
  {
    tag: "TOOL",
    label: "read_file()",
    cardCls: "border-violet-400/40 bg-violet-500/10",
    tagCls: "text-violet-300",
    labelCls: "text-violet-100",
  },
  {
    tag: "TOOL",
    label: "search_web()",
    cardCls: "border-violet-400/40 bg-violet-500/10",
    tagCls: "text-violet-300",
    labelCls: "text-violet-100",
  },
  {
    tag: "MCP",
    label: "github::list_issues",
    cardCls: "border-cyan-400/40 bg-cyan-500/10",
    tagCls: "text-cyan-300",
    labelCls: "text-cyan-100",
  },
  {
    tag: "MCP",
    label: "linear::create_task",
    cardCls: "border-cyan-400/40 bg-cyan-500/10",
    tagCls: "text-cyan-300",
    labelCls: "text-cyan-100",
  },
];

const ACTIONS: Action[] = [
  {
    kind: "file",
    label: "README.md",
    tag: "FILE",
    preview: [
      "# Project overview",
      "이 프로젝트는 ...",
      "## 실행 방법",
      "pnpm install && pnpm dev",
    ],
    cardCls: "border-sky-400/50 bg-sky-500/10",
    tagCls: "text-sky-300",
    labelCls: "text-sky-100",
  },
  {
    kind: "file",
    label: "src/api/router.ts",
    tag: "FILE",
    preview: [
      "import { Router } from ...",
      "export const router = ...",
      "router.get('/users', ...)",
      "router.post('/items', ...)",
    ],
    cardCls: "border-sky-400/50 bg-sky-500/10",
    tagCls: "text-sky-300",
    labelCls: "text-sky-100",
  },
  {
    kind: "web",
    label: "docs.anthropic.com/agents",
    tag: "WEB",
    preview: [
      "Building effective agents",
      "Agents are systems that ...",
      "When to use agents vs ...",
      "Common patterns include ...",
    ],
    cardCls: "border-emerald-400/50 bg-emerald-500/10",
    tagCls: "text-emerald-300",
    labelCls: "text-emerald-100",
  },
  {
    kind: "web",
    label: "github.com/.../issues/42",
    tag: "WEB",
    preview: [
      "Bug: timeout on long queries",
      "Repro: 1. open dashboard...",
      "Expected: response in 2s",
      "Actual: hangs for 30s+",
    ],
    cardCls: "border-emerald-400/50 bg-emerald-500/10",
    tagCls: "text-emerald-300",
    labelCls: "text-emerald-100",
  },
];

const BASE_DELAY = 0.2;
const BASE_STAGGER = 0.08;
const BASE_DONE = BASE_DELAY + BASE_CARDS.length * BASE_STAGGER + 0.2;
const ACTION_STEP = 1.1;

function AgentIcon({ className }: { className?: string }) {
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
      <rect x={16} y={22} width={48} height={42} rx={10} />
      <circle cx={30} cy={40} r={3.5} fill="currentColor" stroke="none" />
      <circle cx={50} cy={40} r={3.5} fill="currentColor" stroke="none" />
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
      <line x1={10} y1={12} x2={16} y2={12} />
      <line x1={10} y1={16} x2={16} y2={16} />
    </svg>
  );
}

function WebIcon({ className }: { className?: string }) {
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
      <circle cx={12} cy={12} r={9} />
      <path d="M3 12 L21 12" />
      <path d="M12 3 C16 7, 16 17, 12 21" />
      <path d="M12 3 C8 7, 8 17, 12 21" />
    </svg>
  );
}

function ActionLine({ action, index }: { action: Action; index: number }) {
  const Icon = action.kind === "file" ? FileIcon : WebIcon;
  const verb = action.kind === "file" ? "read_file" : "fetch_url";
  const appearDelay = BASE_DONE + index * ACTION_STEP;
  return (
    <motion.div
      className="flex items-center gap-3 rounded-lg border border-white/10 bg-neutral-900/60 px-3 py-2.5 font-mono text-[13px]"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: appearDelay, ease: "easeOut" }}
    >
      <motion.div
        className={`shrink-0 ${action.tagCls}`}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 0.9,
          delay: appearDelay,
          repeat: 2,
          ease: "easeInOut",
        }}
      >
        <Icon className="h-4 w-4" />
      </motion.div>
      <span className="text-neutral-500">{verb}(</span>
      <span className={action.labelCls}>{action.label}</span>
      <span className="text-neutral-500">)</span>
      <motion.span
        className="ml-auto text-[10px] uppercase tracking-wider text-emerald-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: appearDelay + 0.9 }}
      >
        ✓ ok
      </motion.span>
    </motion.div>
  );
}

function BaseCardRow({ card, index }: { card: BaseCard; index: number }) {
  return (
    <motion.div
      className={`flex items-center justify-between rounded-lg border px-3 py-2 ${card.cardCls}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: BASE_DELAY + index * BASE_STAGGER,
        ease: "easeOut",
      }}
    >
      <span className={`text-[13px] font-medium ${card.labelCls}`}>
        {card.label}
      </span>
      <span
        className={`font-mono text-[9px] font-semibold uppercase tracking-wider ${card.tagCls}`}
      >
        {card.tag}
      </span>
    </motion.div>
  );
}

function ContentBlock({ action, index }: { action: Action; index: number }) {
  const appearDelay = BASE_DONE + index * ACTION_STEP + 0.55;
  return (
    <motion.div
      className={`rounded-xl border px-4 py-3 ${action.cardCls}`}
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: appearDelay, ease: "easeOut" }}
    >
      <div className="mb-1.5 flex items-center justify-between">
        <span className={`text-[13px] font-semibold ${action.labelCls}`}>
          {action.label}
        </span>
        <span
          className={`font-mono text-[9px] font-semibold uppercase tracking-wider ${action.tagCls}`}
        >
          {action.tag}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {action.preview.map((line, i) => (
          <div
            key={i}
            className="font-mono text-[11px] leading-snug text-neutral-300/90"
          >
            {line}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function ContextFillingSlide() {
  return (
    <SlideLayout
      title="에이전틱하게 행동할수록 빠르게 채워지는 컨텍스트"
      subtitle="파일 읽고 웹서핑도 하다 보면 컨텍스트가 금방 차버려요"
    >
      <div className="grid w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-start gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-violet-400/60 bg-violet-500/15 p-2 text-violet-100 shadow-[0_0_24px_rgba(167,139,250,0.25)]">
              <AgentIcon className="h-10 w-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-neutral-100">
                Agent
              </span>
              <span className="text-[11px] uppercase tracking-wider text-neutral-500">
                working...
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {ACTIONS.map((a, i) => (
              <ActionLine key={a.label} action={a} index={i} />
            ))}
          </div>
        </div>

        <motion.svg
          viewBox="0 0 60 20"
          width={50}
          height={18}
          className="mt-16 shrink-0 text-neutral-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: BASE_DONE }}
        >
          <line
            x1={2}
            y1={10}
            x2={48}
            y2={10}
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="3 3"
          />
          <polygon points="58,10 46,5 46,15" fill="currentColor" />
        </motion.svg>

        <div className="relative rounded-2xl border border-emerald-400/40 bg-emerald-400/5 px-4 pt-6 pb-4">
          <div className="absolute -top-3 left-5 rounded-full bg-neutral-950 px-3 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-300">
            CONTEXT
          </div>
          <div className="flex flex-col gap-1.5">
            {BASE_CARDS.map((c, i) => (
              <BaseCardRow key={c.label} card={c} index={i} />
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {ACTIONS.map((a, i) => (
              <ContentBlock key={a.label} action={a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
