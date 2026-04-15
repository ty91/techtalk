import { useEffect, useState } from "react";
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

const CUR_W = 240;
const CUR_X = 16;
const CUR_IW = 208;

const BASE = {
  system: { y: 16, h: 32 },
  tool0: { y: 54, h: 28 },
  tool1: { y: 88, h: 28 },
  tool2: { y: 122, h: 28 },
  tool3: { y: 156, h: 28 },
  tool4: { y: 190, h: 28 },
  doc0: { y: 228, h: 28 },
  doc1: { y: 262, h: 28 },
  profile: { y: 300, h: 28 },
};

const GOOD_CUR = {
  ...BASE,
  history: { y: 338, h: 28 },
  user: { y: 376, h: 36 },
};
const GOOD_H = 428;

const BAD_CUR = {
  ...BASE,
  reservations: { y: 338, h: 96 },
  history: { y: 444, h: 28 },
  user: { y: 482, h: 36 },
};
const BAD_H = 534;

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
};

function Row({ kind, label, y, h }: RowProps) {
  const s = STYLE[kind];
  return (
    <div
      className={`absolute flex items-center gap-2 rounded-lg border px-2 py-1 shadow-sm ${s.card}`}
      style={{ left: CUR_X, top: y, width: CUR_IW, height: h }}
    >
      <span
        className={`font-mono text-[7px] font-semibold uppercase tracking-wider ${s.tag}`}
      >
        {KIND_TAG[kind]}
      </span>
      <span className={`text-[10px] leading-tight ${s.label}`}>{label}</span>
    </div>
  );
}

function SystemRow({ y, h }: { y: number; h: number }) {
  return (
    <div
      className="absolute flex items-center rounded-lg border-2 border-yellow-400/50 bg-yellow-500/10 px-2 shadow-sm"
      style={{ left: CUR_X, top: y, width: CUR_IW, height: h }}
    >
      <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-yellow-300">
        SYSTEM PROMPT
      </span>
    </div>
  );
}

function SharedCuratedItems({
  cur,
}: {
  cur: typeof BASE;
}) {
  return (
    <>
      <SystemRow y={cur.system.y} h={cur.system.h} />
      {KEPT_TOOLS.map((label, i) => {
        const pos = cur[`tool${i}` as "tool0" | "tool1" | "tool2" | "tool3" | "tool4"];
        return <Row key={label} kind="tool" label={label} y={pos.y} h={pos.h} />;
      })}
      {KEPT_DOCS.map((label, i) => {
        const pos = cur[`doc${i}` as "doc0" | "doc1"];
        return <Row key={label} kind="doc" label={label} y={pos.y} h={pos.h} />;
      })}
      <Row
        kind="profile"
        label="고객 ID: cust_a1b2c3d4"
        y={cur.profile.y}
        h={cur.profile.h}
      />
    </>
  );
}

function BadReservations({ y, h }: { y: number; h: number }) {
  const items = [
    "res_9f8a7  2026-04-17  confirmed",
    "res_3c4d1  2026-03-05  completed",
    "res_77ab9  2026-02-11  cancelled",
    "res_52e0f  2025-12-24  completed",
    "... (28개 더)",
  ];
  return (
    <motion.div
      className="absolute rounded-lg border border-orange-400/50 bg-orange-500/10 px-2 py-1.5 shadow-sm"
      style={{ left: CUR_X, top: y, width: CUR_IW, height: h }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
    >
      <div className="font-mono text-[7px] font-semibold uppercase tracking-wider text-orange-300">
        RESERVATIONS (전체 이력 32건)
      </div>
      <div className="mt-1 space-y-0.5 font-mono text-[8.5px] leading-tight text-orange-100">
        {items.map((it) => (
          <div key={it}>{it}</div>
        ))}
      </div>
    </motion.div>
  );
}

function BadContext() {
  return (
    <div
      className="relative rounded-3xl border border-rose-400/50 bg-rose-400/5"
      style={{ width: CUR_W, height: BAD_H }}
    >
      <div className="absolute -top-3 left-5 rounded-full bg-neutral-950 px-3 font-mono text-xs font-medium tracking-wide text-rose-300">
        CONTEXT
      </div>
      <SharedCuratedItems cur={BAD_CUR} />
      <BadReservations y={BAD_CUR.reservations.y} h={BAD_CUR.reservations.h} />
      <Row
        kind="history"
        label="(요약 + 최근 2개)"
        y={BAD_CUR.history.y}
        h={BAD_CUR.history.h}
      />
      <Row
        kind="user"
        label="4월 17일 숙소 예약 취소할게요"
        y={BAD_CUR.user.y}
        h={BAD_CUR.user.h}
      />
    </div>
  );
}

function GoodContext() {
  return (
    <div
      className="relative rounded-3xl border border-emerald-400/50 bg-emerald-400/5"
      style={{ width: CUR_W, height: GOOD_H }}
    >
      <div className="absolute -top-3 left-5 rounded-full bg-neutral-950 px-3 font-mono text-xs font-medium tracking-wide text-emerald-300">
        CONTEXT
      </div>
      <SharedCuratedItems cur={GOOD_CUR} />
      <Row
        kind="history"
        label="(요약 + 최근 2개)"
        y={GOOD_CUR.history.y}
        h={GOOD_CUR.history.h}
      />
      <Row
        kind="user"
        label="4월 17일 숙소 예약 취소할게요"
        y={GOOD_CUR.user.y}
        h={GOOD_CUR.user.h}
      />
    </div>
  );
}

type FlowStep =
  | {
      kind: "tool-call";
      name: string;
      args: string;
    }
  | {
      kind: "tool-result";
      lines: string[];
    }
  | {
      kind: "think";
      text: string;
    }
  | {
      kind: "agent-msg";
      text: string;
    };

const FLOW: FlowStep[] = [
  {
    kind: "tool-call",
    name: "list_reservations",
    args: 'user_id="cust_a1b2c3d4", status="confirmed"',
  },
  {
    kind: "tool-result",
    lines: ["res_9f8a7  2026-04-17  confirmed"],
  },
  {
    kind: "think",
    text: "취소 대상: res_9f8a7 → 상세 확인 필요",
  },
  {
    kind: "tool-call",
    name: "check_reservation",
    args: 'reservation_id="res_9f8a7"',
  },
  {
    kind: "tool-result",
    lines: [
      'status: "confirmed"',
      'date: "2026-04-17"',
      'location: "제주 ABCD 펜션"',
    ],
  },
  {
    kind: "agent-msg",
    text:
      '"4월 17일에 제주도의 ABCD 펜션 예약을 취소하시려는 것이 맞나요?"',
  },
];

function StepCard({
  step,
  index,
  revealed,
}: {
  step: FlowStep;
  index: number;
  revealed: number;
}) {
  const visible = revealed > index;
  const base = "rounded-lg border px-3 py-2 shadow-sm";

  let content: React.ReactNode = null;
  let style = "";

  if (step.kind === "tool-call") {
    style = "border-violet-400/50 bg-violet-500/10";
    content = (
      <>
        <div className="font-mono text-[8px] font-semibold uppercase tracking-wider text-violet-300">
          AGENT → TOOL
        </div>
        <div className="mt-0.5 font-mono text-[11px] text-violet-100">
          {step.name}(<span className="text-violet-300">{step.args}</span>)
        </div>
      </>
    );
  } else if (step.kind === "tool-result") {
    style = "border-sky-400/50 bg-sky-500/10";
    content = (
      <>
        <div className="font-mono text-[8px] font-semibold uppercase tracking-wider text-sky-300">
          TOOL RESULT
        </div>
        <div className="mt-0.5 space-y-0.5 font-mono text-[10px] leading-tight text-sky-100">
          {step.lines.map((l) => (
            <div key={l}>{l}</div>
          ))}
        </div>
      </>
    );
  } else if (step.kind === "think") {
    style = "border-yellow-400/50 bg-yellow-500/10";
    content = (
      <>
        <div className="font-mono text-[8px] font-semibold uppercase tracking-wider text-yellow-300">
          AGENT (internal)
        </div>
        <div className="mt-0.5 text-[11px] text-yellow-100">{step.text}</div>
      </>
    );
  } else {
    style = "border-rose-400/60 bg-rose-500/15";
    content = (
      <>
        <div className="font-mono text-[8px] font-semibold uppercase tracking-wider text-rose-200">
          AGENT → USER
        </div>
        <div className="mt-0.5 text-[11px] leading-snug text-rose-50">
          {step.text}
        </div>
      </>
    );
  }

  return (
    <motion.div
      className={`${base} ${style}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {content}
    </motion.div>
  );
}

function DownConnector({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className="flex h-4 items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-full w-px bg-neutral-600" />
    </motion.div>
  );
}

function AgentFlow() {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const timers: number[] = [];
    FLOW.forEach((_, i) => {
      timers.push(
        window.setTimeout(() => setRevealed(i + 1), 1200 + i * 1100)
      );
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  return (
    <div
      className="relative rounded-3xl border border-emerald-400/40 bg-emerald-400/5 px-4 pt-5 pb-4"
      style={{ width: 380 }}
    >
      <div className="absolute -top-3 left-5 rounded-full bg-neutral-950 px-3 font-mono text-xs font-medium tracking-wide text-emerald-300">
        AGENT FLOW
      </div>

      <div className="flex flex-col">
        {FLOW.map((step, i) => (
          <div key={i}>
            <StepCard step={step} index={i} revealed={revealed} />
            {i < FLOW.length - 1 && <DownConnector visible={revealed > i} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseLabel({
  tone,
  tag,
  text,
}: {
  tone: "bad" | "good";
  tag: string;
  text: string;
}) {
  const color =
    tone === "bad" ? "text-rose-300" : "text-emerald-300";
  return (
    <div className="mb-8 flex items-baseline justify-center gap-2">
      <span className={`font-mono text-sm font-semibold uppercase tracking-wider ${color}`}>
        {tag}
      </span>
      <span className="text-sm text-neutral-300">{text}</span>
    </div>
  );
}

export function ContextRetrievalSlide() {
  return (
    <SlideLayout
      title="맥락 검색"
      subtitle={
        "필요할 것 같은 정보를 전부 미리 추가하는게 아니라,\n에이전트가 필요한 정보를 점진적으로 찾아낼 수 있어야 해요"
      }
    >
      <div className="flex items-start justify-center gap-10">
        <div className="flex flex-col items-center">
          <CaseLabel tone="bad" tag="BAD" text="예약 정보를 미리 다 때려박기" />
          <BadContext />
        </div>

        <div className="flex flex-col items-center">
          <CaseLabel
            tone="good"
            tag="GOOD"
            text="필요할 때만 툴로 조회"
          />
          <div className="flex items-start gap-5">
            <GoodContext />
            <AgentFlow />
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
