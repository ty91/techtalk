import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";

type Kind =
  | "doc"
  | "tool"
  | "agent"
  | "hint"
  | "memory"
  | "web"
  | "db"
  | "user"
  | "history";

type Item = {
  kind: Kind;
  label: string;
  x: number;
  y: number;
  w: number;
  rot: number;
};

const STYLE: Record<Kind, { card: string; tag: string; label: string }> = {
  doc: {
    card: "border-sky-400/40 bg-sky-500/10",
    tag: "text-sky-300",
    label: "text-sky-100",
  },
  tool: {
    card: "border-violet-400/40 bg-violet-500/10",
    tag: "text-violet-300",
    label: "text-violet-100",
  },
  agent: {
    card: "border-amber-400/50 bg-amber-500/10",
    tag: "text-amber-300",
    label: "text-amber-100",
  },
  hint: {
    card: "border-yellow-400/40 bg-yellow-500/10",
    tag: "text-yellow-300",
    label: "text-yellow-100",
  },
  memory: {
    card: "border-emerald-400/40 bg-emerald-500/10",
    tag: "text-emerald-300",
    label: "text-emerald-100",
  },
  web: {
    card: "border-cyan-400/40 bg-cyan-500/10",
    tag: "text-cyan-300",
    label: "text-cyan-100",
  },
  db: {
    card: "border-orange-400/40 bg-orange-500/10",
    tag: "text-orange-300",
    label: "text-orange-100",
  },
  user: {
    card: "border-rose-400/70 bg-rose-500/20",
    tag: "text-rose-200",
    label: "text-rose-50",
  },
  history: {
    card: "border-slate-400/40 bg-slate-500/10",
    tag: "text-slate-300",
    label: "text-slate-100",
  },
};

const KIND_TAG: Record<Kind, string> = {
  doc: "DOC",
  tool: "TOOL",
  agent: "AGENT",
  hint: "HINT",
  memory: "MEMORY",
  web: "WEB",
  db: "DB",
  user: "USER",
  history: "HISTORY",
};

const ITEMS: Item[] = [
  { kind: "doc", label: "spec_v3.md", x: 15, y: 20, w: 140, rot: -3 },
  { kind: "tool", label: "fetch_url()", x: 170, y: 30, w: 125, rot: 2 },
  { kind: "doc", label: "Q1_report.pdf", x: 310, y: 15, w: 150, rot: -1 },
  { kind: "tool", label: "run_sql()", x: 475, y: 35, w: 120, rot: 3 },
  { kind: "web", label: "검색 결과 3건", x: 610, y: 20, w: 175, rot: -2 },

  {
    kind: "agent",
    label: "AGENT_INSTRUCTIONS.md (512 lines)",
    x: 20,
    y: 100,
    w: 290,
    rot: 1,
  },
  { kind: "tool", label: "send_email()", x: 325, y: 115, w: 135, rot: -2 },
  { kind: "hint", label: "+ 응답 포맷 규칙", x: 475, y: 105, w: 135, rot: 2 },
  { kind: "memory", label: "user_profile.md", x: 625, y: 120, w: 160, rot: -1 },

  { kind: "memory", label: "feedback.md", x: 15, y: 190, w: 140, rot: -2 },
  { kind: "hint", label: "+ 보안 가이드", x: 170, y: 205, w: 125, rot: 1 },
  {
    kind: "user",
    label: "오늘 지표를 포함해서 이번 분기 예상 실적을 PDF 리포트로 작성해줘",
    x: 310,
    y: 185,
    w: 320,
    rot: 0,
  },
  { kind: "tool", label: "create_pdf()", x: 645, y: 200, w: 140, rot: 3 },

  { kind: "doc", label: "kpi_dashboard.xlsx", x: 15, y: 280, w: 165, rot: 2 },
  { kind: "tool", label: "read_file()", x: 200, y: 295, w: 125, rot: -3 },
  { kind: "memory", label: "project.md", x: 340, y: 285, w: 130, rot: 1 },
  {
    kind: "db",
    label: "SELECT * FROM sales_q1…",
    x: 485,
    y: 290,
    w: 175,
    rot: -2,
  },
  { kind: "hint", label: "+ 톤&매너", x: 675, y: 300, w: 115, rot: 2 },

  { kind: "history", label: "(32 messages)", x: 30, y: 370, w: 175, rot: -1 },
  { kind: "doc", label: "checklist.txt", x: 225, y: 365, w: 135, rot: 3 },
  { kind: "tool", label: "search_web()", x: 380, y: 375, w: 135, rot: 2 },
  { kind: "hint", label: "+ 예외 처리", x: 535, y: 380, w: 130, rot: -1 },
];

const CONTAINER_W = 820;
const CONTAINER_H = 450;

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

const ITEM_STAGGER = 0.04;
const ARROW_DELAY = 0.1 + ITEMS.length * ITEM_STAGGER + 0.3;
const AGENT_DELAY = ARROW_DELAY + 0.25;
const BUBBLE_DELAY_MS = (AGENT_DELAY + 0.5) * 1000;

export function ContextDumpSlide() {
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setBubble(true), BUBBLE_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <SlideLayout
      title="컨텍스트에 이것저것 때려넣기"
      subtitle="컨텍스트 크기도 충분히 크니까 다 때려넣어주면 알아서 해줄까..요?"
    >
      <div className="flex items-center justify-center gap-6">
        <motion.div
          className="relative shrink-0 rounded-3xl border border-emerald-400/40 bg-emerald-400/5"
          style={{ width: CONTAINER_W, height: CONTAINER_H }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute -top-3 left-6 rounded-full bg-neutral-950 px-3 font-mono text-sm font-medium tracking-wide text-emerald-300">
            CONTEXT
          </div>

          {ITEMS.map((item, i) => {
            const s = STYLE[item.kind];
            return (
              <motion.div
                key={i}
                className={`absolute rounded-lg border px-2.5 py-1.5 shadow-sm ${s.card}`}
                style={{ left: item.x, top: item.y, width: item.w }}
                initial={{ opacity: 0, y: 10, scale: 0.9, rotate: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: item.rot }}
                transition={{
                  duration: 0.35,
                  delay: 0.1 + i * ITEM_STAGGER,
                  ease: "easeOut",
                }}
              >
                <div
                  className={`font-mono text-[10px] font-semibold uppercase tracking-wider ${s.tag}`}
                >
                  {KIND_TAG[item.kind]}
                </div>
                <div className={`text-xs leading-snug ${s.label}`}>
                  {item.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.svg
          viewBox="0 0 60 20"
          width={60}
          height={20}
          className="shrink-0 text-sky-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: ARROW_DELAY }}
        >
          <line
            x1={2}
            y1={10}
            x2={48}
            y2={10}
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <polygon points="58,10 46,5 46,15" fill="currentColor" />
        </motion.svg>

        <motion.div
          className="flex shrink-0 flex-col items-center gap-3"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: AGENT_DELAY }}
        >
          <motion.div
            className="relative rounded-2xl border border-white/30 bg-white/10 px-5 py-2"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: bubble ? 1 : 0, y: bubble ? 0 : 6 }}
            transition={{ duration: 0.4 }}
          >
            <motion.span
              className="block text-3xl leading-none tracking-widest text-neutral-100"
              animate={bubble ? { opacity: [0.5, 1, 0.5] } : undefined}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              …
            </motion.span>
            <div className="absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 border-b border-r border-white/30 bg-white/10" />
          </motion.div>
          <div className="rounded-full border border-violet-400/60 bg-violet-500/15 p-3 text-violet-100 shadow-[0_0_24px_rgba(167,139,250,0.25)]">
            <AgentIcon className="h-16 w-16" />
          </div>
          <div className="text-xs uppercase tracking-wider text-neutral-500">
            Agent
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
