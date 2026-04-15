import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";

type Kind = "doc" | "tool" | "user" | "history" | "profile";

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
  user: "USER",
  history: "HISTORY",
  profile: "PROFILE",
};

const CURATED_W = 290;
const CURATED_H = 470;
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

const KEPT_TOOLS = [
  "check_reservation()",
  "list_reservations()",
  "cancel_reservation()",
  "process_refund()",
  "send_email()",
];

const KEPT_DOCS = ["cancellation_policy.md", "refund_policy.md"];

type RowProps = {
  kind: Kind;
  label: string;
  y: number;
  h: number;
  highlight?: boolean;
};

function CuratedRow({ kind, label, y, h, highlight }: RowProps) {
  const s = STYLE[kind];
  return (
    <div
      className={`absolute flex items-center gap-2 rounded-lg border px-2.5 py-1 shadow-sm ${s.card} ${
        highlight
          ? "ring-2 ring-violet-300/80 ring-offset-2 ring-offset-neutral-950"
          : ""
      }`}
      style={{ left: CUR_X, top: y, width: CUR_IW, height: h }}
    >
      <span
        className={`font-mono text-[8px] font-semibold uppercase tracking-wider ${s.tag}`}
      >
        {KIND_TAG[kind]}
      </span>
      <span className={`text-[11px] leading-tight ${s.label}`}>{label}</span>
    </div>
  );
}

function CuratedContext() {
  return (
    <div
      className="relative shrink-0 rounded-3xl border border-emerald-400/50 bg-emerald-400/5"
      style={{ width: CURATED_W, height: CURATED_H }}
    >
      <div className="absolute -top-3 left-6 rounded-full bg-neutral-950 px-3 font-mono text-sm font-medium tracking-wide text-emerald-300">
        CURATED CONTEXT
      </div>

      <div
        className="absolute flex items-center rounded-lg border-2 border-yellow-400/50 bg-yellow-500/10 px-3 shadow-sm"
        style={{
          left: CUR_X,
          top: CUR.system.y,
          width: CUR_IW,
          height: CUR.system.h,
        }}
      >
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-yellow-300">
          SYSTEM PROMPT
        </span>
      </div>

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
            highlight={i === 0}
          />
        );
      })}

      {KEPT_DOCS.map((label, i) => {
        const pos = CUR[`doc${i}` as "doc0" | "doc1"];
        return <CuratedRow key={label} kind="doc" label={label} y={pos.y} h={pos.h} />;
      })}

      <CuratedRow
        kind="profile"
        label="고객 ID: cust_a1b2c3d4"
        y={CUR.profile.y}
        h={CUR.profile.h}
      />
      <CuratedRow
        kind="history"
        label="(요약 + 최근 2개)"
        y={CUR.history.y}
        h={CUR.history.h}
      />
      <CuratedRow
        kind="user"
        label="4월 17일 숙소 예약 취소할게요"
        y={CUR.user.y}
        h={CUR.user.h}
      />
    </div>
  );
}

function ZoomConnector() {
  return (
    <svg viewBox="0 0 120 470" className="h-[470px] w-[120px] shrink-0">
      <line
        x1={0}
        y1={82}
        x2={118}
        y2={20}
        stroke="#c4b5fd"
        strokeWidth={1.2}
        strokeDasharray="4 4"
        opacity={0.6}
      />
      <line
        x1={0}
        y1={98}
        x2={118}
        y2={450}
        stroke="#c4b5fd"
        strokeWidth={1.2}
        strokeDasharray="4 4"
        opacity={0.6}
      />
    </svg>
  );
}

function ToolDefinitionCard() {
  return (
    <div
      className="relative shrink-0 rounded-2xl border border-violet-400/50 bg-violet-500/5"
      style={{ width: 520, height: 470 }}
    >
      <div className="absolute -top-3 left-6 rounded-full bg-neutral-950 px-3 font-mono text-sm font-medium tracking-wide text-violet-300">
        TOOL DEFINITION
      </div>

      <div className="flex h-full flex-col gap-4 px-7 py-7">
        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-violet-300">
            name
          </div>
          <div className="mt-1 font-mono text-xl text-violet-100">check_reservation</div>
        </div>

        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-violet-300">
            description
          </div>
          <div className="mt-1 text-[15px] leading-relaxed text-neutral-100">
            예약 ID로 고객의 예약을 조회합니다. 상태, 체크인/체크아웃 날짜,
            객실 정보를 반환해요.
          </div>
        </div>

        <div className="min-h-0 flex-1">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-violet-300">
            input_schema
          </div>
          <pre className="mt-1 overflow-hidden rounded-lg border border-white/10 bg-neutral-950/60 p-3 font-mono text-[12px] leading-relaxed text-neutral-200">
{`{
  "type": "object",
  "properties": {
    "reservation_id": {
      "type": "string",
      "description": "조회할 예약의 고유 ID (예: res_abc123)"
    }
  },
  "required": ["reservation_id"]
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

export function ToolSetSlide() {
  return (
    <SlideLayout
      title="적절한 도구 모음"
      subtitle="필요한 동작을 수행할 수 있는 도구들만 정확히 쥐어줘야 해요"
    >
      <motion.div
        className="flex items-center justify-center gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <CuratedContext />
        <ZoomConnector />
        <ToolDefinitionCard />
      </motion.div>
    </SlideLayout>
  );
}
