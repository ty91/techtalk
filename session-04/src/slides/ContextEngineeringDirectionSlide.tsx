import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";

type Kind = "doc" | "tool" | "hint" | "user" | "history" | "profile";

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
  hint: {
    card: "border-yellow-400/40 bg-yellow-500/10",
    tag: "text-yellow-300",
    label: "text-yellow-100",
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
  profile: {
    card: "border-cyan-400/40 bg-cyan-500/10",
    tag: "text-cyan-300",
    label: "text-cyan-100",
  },
};

const KIND_TAG: Record<Kind, string> = {
  doc: "DOC",
  tool: "TOOL",
  hint: "HINT",
  user: "USER",
  history: "HISTORY",
  profile: "PROFILE",
};

const MESSY_W = 520;
const MESSY_H = 470;
const CURATED_W = 290;
const CURATED_H = 470;

type MessyItem = {
  id: string;
  kind: Kind;
  label: string;
  x: number;
  y: number;
  w: number;
  rot: number;
};

const MESSY_ITEMS: MessyItem[] = [
  // Row 1
  { id: "h1", kind: "hint", label: "+ 역할: 고객지원 AI", x: 10, y: 15, w: 120, rot: -3 },
  { id: "t1", kind: "tool", label: "check_reservation()", x: 140, y: 15, w: 130, rot: 2 },
  { id: "t5", kind: "tool", label: "search_hotels()", x: 280, y: 15, w: 115, rot: -2 },
  { id: "d3", kind: "doc", label: "pricing_2024.pdf", x: 400, y: 15, w: 110, rot: 2 },
  // Row 2
  { id: "d1", kind: "doc", label: "cancellation_policy.md", x: 10, y: 85, w: 145, rot: 1 },
  { id: "t6", kind: "tool", label: "create_booking()", x: 160, y: 85, w: 120, rot: 3 },
  { id: "h2", kind: "hint", label: "+ 응답 톤 & 매너", x: 285, y: 85, w: 115, rot: -2 },
  { id: "t8", kind: "tool", label: "submit_review()", x: 405, y: 85, w: 110, rot: -1 },
  // Row 3 (user message spans wider)
  { id: "user", kind: "user", label: "4월 17일 숙소 예약 취소할게요", x: 10, y: 160, w: 260, rot: 0 },
  { id: "h3", kind: "hint", label: "+ 환불 정책 가이드", x: 280, y: 160, w: 120, rot: 1 },
  { id: "t4", kind: "tool", label: "send_email()", x: 405, y: 160, w: 110, rot: 3 },
  // Row 4
  { id: "t3", kind: "tool", label: "process_refund()", x: 10, y: 235, w: 120, rot: -3 },
  { id: "d5", kind: "doc", label: "onboarding_guide.md", x: 135, y: 235, w: 145, rot: 2 },
  { id: "t7", kind: "tool", label: "get_room_photos()", x: 285, y: 235, w: 125, rot: -2 },
  { id: "d4", kind: "doc", label: "marketing.pdf", x: 415, y: 235, w: 100, rot: 1 },
  // Row 5
  { id: "hist", kind: "history", label: "(32 messages)", x: 10, y: 325, w: 135, rot: -1 },
  { id: "h4", kind: "hint", label: "+ 에스컬레이션 규칙", x: 150, y: 325, w: 125, rot: 2 },
  { id: "d2", kind: "doc", label: "refund_policy.md", x: 280, y: 325, w: 130, rot: -1 },
  { id: "t2", kind: "tool", label: "cancel_reservation()", x: 415, y: 325, w: 100, rot: 3 },
  // Row 6
  { id: "t9", kind: "tool", label: "list_reservations()", x: 10, y: 395, w: 140, rot: -2 },
  { id: "p1", kind: "profile", label: "user_id: cust_a1b2c3d4", x: 155, y: 395, w: 180, rot: 3 },
  { id: "h5", kind: "hint", label: "+ 환불 한도 $200", x: 340, y: 395, w: 115, rot: -1 },
  { id: "d6", kind: "doc", label: "faq.md", x: 460, y: 395, w: 55, rot: 2 },
];

const KEPT_TOOLS = [
  "check_reservation()",
  "list_reservations()",
  "cancel_reservation()",
  "process_refund()",
  "send_email()",
];

const KEPT_DOCS = ["cancellation_policy.md", "refund_policy.md"];

const CUR_X = 20;
const CUR_IW = 250;
const CUR = {
  system: { y: 18, h: 36 },
  tool0: { y: 66, h: 32 },
  tool1: { y: 104, h: 32 },
  tool2: { y: 142, h: 32 },
  tool3: { y: 180, h: 32 },
  tool4: { y: 218, h: 32 },
  doc0: { y: 260, h: 32 },
  doc1: { y: 298, h: 32 },
  profile: { y: 340, h: 32 },
  history: { y: 378, h: 32 },
  user: { y: 420, h: 42 },
};

const EVENTS_MS = [
  1400, // 1: SYSTEM
  1900, // 2: tool 0
  2150, // 3: tool 1
  2400, // 4: tool 2
  2650, // 5: tool 3
  2900, // 6: tool 4
  3500, // 7: doc 0
  3800, // 8: doc 1
  4300, // 9: profile
  4900, // 10: history
  5600, // 11: user
  6500, // 12: agent
  7500, // 13: bang
];

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
      <rect x={32} y={52} width={16} height={4} rx={2} fill="currentColor" stroke="none" />
    </svg>
  );
}

function Arrow({ visible, color }: { visible: boolean; color: string }) {
  return (
    <motion.svg
      viewBox="0 0 60 20"
      width={50}
      height={20}
      className={`shrink-0 ${color}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
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
  );
}

type CuratedRowProps = {
  kind: Kind;
  label: string;
  y: number;
  h: number;
  visible: boolean;
};

function CuratedRow({ kind, label, y, h, visible }: CuratedRowProps) {
  const s = STYLE[kind];
  return (
    <motion.div
      className={`absolute flex items-center gap-2 rounded-lg border px-2.5 py-1 shadow-sm ${s.card}`}
      style={{ left: CUR_X, top: y, width: CUR_IW, height: h }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <span
        className={`font-mono text-[8px] font-semibold uppercase tracking-wider ${s.tag}`}
      >
        {KIND_TAG[kind]}
      </span>
      <span className={`text-[11px] leading-tight ${s.label}`}>{label}</span>
    </motion.div>
  );
}

export function ContextEngineeringDirectionSlide() {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const timers: number[] = [];
    EVENTS_MS.forEach((t, i) => {
      timers.push(window.setTimeout(() => setRevealed(i + 1), t));
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  const sysVisible = revealed >= 1;
  const toolVisible = (i: number) => revealed >= 2 + i;
  const docVisible = (i: number) => revealed >= 7 + i;
  const profileVisible = revealed >= 9;
  const histVisible = revealed >= 10;
  const userVisible = revealed >= 11;
  const agentVisible = revealed >= 12;
  const bang = revealed >= 13;

  return (
    <SlideLayout title="컨텍스트 엔지니어링의 큰 방향성">
      <div className="flex items-center justify-center gap-3">
        {/* Messy context */}
        <div
          className="relative shrink-0 rounded-3xl border border-neutral-500/40 bg-neutral-500/5"
          style={{ width: MESSY_W, height: MESSY_H }}
        >
          <div className="absolute -top-3 left-6 rounded-full bg-neutral-950 px-3 font-mono text-sm font-medium tracking-wide text-neutral-400">
            MESSY CONTEXT
          </div>
          {MESSY_ITEMS.map((item, i) => {
            const s = STYLE[item.kind];
            return (
              <motion.div
                key={item.id}
                className={`absolute rounded-lg border px-2 py-1 shadow-sm ${s.card}`}
                style={{ left: item.x, top: item.y, width: item.w }}
                initial={{ opacity: 0, scale: 0.9, rotate: item.rot }}
                animate={{ opacity: 1, scale: 1, rotate: item.rot }}
                transition={{
                  duration: 0.35,
                  delay: 0.1 + i * 0.03,
                  ease: "easeOut",
                }}
              >
                <div
                  className={`font-mono text-[8px] font-semibold uppercase tracking-wider ${s.tag}`}
                >
                  {KIND_TAG[item.kind]}
                </div>
                <div className={`text-[10px] leading-tight ${s.label}`}>
                  {item.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        <Arrow visible={sysVisible} color="text-emerald-400" />

        {/* Curated context */}
        <div
          className="relative shrink-0 rounded-3xl border border-emerald-400/50 bg-emerald-400/5"
          style={{ width: CURATED_W, height: CURATED_H }}
        >
          <div className="absolute -top-3 left-6 rounded-full bg-neutral-950 px-3 font-mono text-sm font-medium tracking-wide text-emerald-300">
            CURATED CONTEXT
          </div>

          {/* SYSTEM PROMPT */}
          <motion.div
            className="absolute flex items-center rounded-lg border-2 border-yellow-400/50 bg-yellow-500/10 px-3 shadow-sm"
            style={{
              left: CUR_X,
              top: CUR.system.y,
              width: CUR_IW,
              height: CUR.system.h,
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={{
              opacity: sysVisible ? 1 : 0,
              y: sysVisible ? 0 : 6,
            }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-yellow-300">
              SYSTEM PROMPT
            </span>
          </motion.div>

          {/* Tools stacked vertically */}
          {KEPT_TOOLS.map((label, i) => {
            const pos =
              CUR[`tool${i}` as "tool0" | "tool1" | "tool2" | "tool3" | "tool4"];
            return (
              <CuratedRow
                key={label}
                kind="tool"
                label={label}
                y={pos.y}
                h={pos.h}
                visible={toolVisible(i)}
              />
            );
          })}

          {/* Docs */}
          {KEPT_DOCS.map((label, i) => {
            const pos = CUR[`doc${i}` as "doc0" | "doc1"];
            return (
              <CuratedRow
                key={label}
                kind="doc"
                label={label}
                y={pos.y}
                h={pos.h}
                visible={docVisible(i)}
              />
            );
          })}

          {/* Profile */}
          <CuratedRow
            kind="profile"
            label="고객 ID: cust_a1b2c3d4"
            y={CUR.profile.y}
            h={CUR.profile.h}
            visible={profileVisible}
          />

          {/* History */}
          <CuratedRow
            kind="history"
            label="(요약 + 최근 2개)"
            y={CUR.history.y}
            h={CUR.history.h}
            visible={histVisible}
          />

          {/* User */}
          <CuratedRow
            kind="user"
            label="4월 17일 숙소 예약 취소할게요"
            y={CUR.user.y}
            h={CUR.user.h}
            visible={userVisible}
          />
        </div>

        <Arrow visible={agentVisible} color="text-sky-400" />

        {/* Agent */}
        <motion.div
          className="flex shrink-0 flex-col items-center gap-2"
          initial={{ opacity: 0, x: 10 }}
          animate={{
            opacity: agentVisible ? 1 : 0,
            x: agentVisible ? 0 : 10,
          }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative rounded-2xl border border-white/30 bg-white/10 px-5 py-2">
            <motion.span
              key={bang ? "bang" : "dots"}
              className={
                bang
                  ? "block text-4xl font-semibold leading-none tracking-widest text-violet-300"
                  : "block text-3xl leading-none tracking-widest text-neutral-100"
              }
              initial={{ opacity: 0, scale: 0.7 }}
              animate={
                bang
                  ? { opacity: 1, scale: [0.7, 1.25, 1] }
                  : { opacity: [0.5, 1, 0.5], scale: 1 }
              }
              transition={
                bang
                  ? { duration: 0.5, ease: "easeOut" }
                  : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
              }
            >
              {bang ? "!" : "…"}
            </motion.span>
            <div className="absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 border-b border-r border-white/30 bg-white/10" />
          </div>
          <div className="rounded-full border border-violet-400/60 bg-violet-500/15 p-3 text-violet-100 shadow-[0_0_24px_rgba(167,139,250,0.25)]">
            <AgentIcon className="h-14 w-14" />
          </div>
          <div className="text-xs uppercase tracking-wider text-neutral-500">
            Agent
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
