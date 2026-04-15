import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";

type Source = { label: string; card: string };

const SOURCES: Source[] = [
  {
    label: "유저 프롬프트",
    card: "border-sky-400/50 bg-sky-500/10 text-sky-100",
  },
  {
    label: "시스템 프롬프트",
    card: "border-amber-400/50 bg-amber-500/10 text-amber-100",
  },
  {
    label: "대화 기록",
    card: "border-slate-400/50 bg-slate-500/10 text-slate-100",
  },
  {
    label: "문서",
    card: "border-emerald-400/50 bg-emerald-500/10 text-emerald-100",
  },
  {
    label: "도구 정의",
    card: "border-orange-400/50 bg-orange-500/10 text-orange-100",
  },
  {
    label: "메모리",
    card: "border-rose-400/50 bg-rose-500/10 text-rose-100",
  },
];

const RIGHT_W = 480;
const RIGHT_H = 280;
const R_LLM_CX = 410;
const R_LLM_CY = RIGHT_H / 2;
const R_LLM_R = 42;
const CARD_X = 15;
const CARD_W = 170;
const CARD_H = 36;
const CARD_GAP = 8;
const STACK_H = SOURCES.length * CARD_H + (SOURCES.length - 1) * CARD_GAP;
const STACK_TOP = (RIGHT_H - STACK_H) / 2;

const D = {
  leftBox: 0.25,
  leftArrow: 0.6,
  leftLlm: 0.85,
  leftCaption: 1.05,
  centerArrow: 1.45,
  rightLlm: 1.95,
  rightCards: 2.05,
  rightLines: 2.45,
  rightCaption: 3.1,
};

function LLMBadge({ size = 84 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full border-2 border-violet-400/70 bg-violet-500/15 text-violet-100 shadow-[0_0_24px_rgba(167,139,250,0.25)]"
      style={{ width: size, height: size }}
    >
      <span className="text-base font-semibold">LLM</span>
    </div>
  );
}

export function ContextExpansionSlide() {
  return (
    <SlideLayout title="컨텍스트의 의미를 확장시키기">
      <div className="flex w-full max-w-6xl items-center justify-center gap-8">
        <LeftDiagram />
        <motion.svg
          viewBox="0 0 100 60"
          width={100}
          height={60}
          className="shrink-0 text-emerald-400"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: D.centerArrow }}
        >
          <polygon
            points="4,22 62,22 62,6 96,30 62,54 62,38 4,38"
            fill="currentColor"
          />
        </motion.svg>
        <RightDiagram />
      </div>
    </SlideLayout>
  );
}

function LeftDiagram() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="flex items-center justify-center gap-3"
        style={{ height: RIGHT_H }}
      >
        <motion.div
          className="rounded-xl border border-teal-400/50 bg-teal-500/10 p-3"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: D.leftBox }}
        >
          <div className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-teal-300">
            Tokens
          </div>
          <div className="grid grid-cols-5 gap-1.5" style={{ width: 150 }}>
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="h-3 rounded-sm bg-teal-400/60" />
            ))}
          </div>
        </motion.div>

        <motion.svg
          width={56}
          height={20}
          viewBox="0 0 56 20"
          className="shrink-0 text-sky-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: D.leftArrow }}
        >
          <line
            x1={2}
            y1={10}
            x2={46}
            y2={10}
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <polygon points="54,10 44,5 44,15" fill="currentColor" />
        </motion.svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: D.leftLlm }}
        >
          <LLMBadge />
        </motion.div>
      </div>
      <motion.div
        className="text-center text-xl text-neutral-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: D.leftCaption }}
      >
        기술적인 의미의{" "}
        <span className="text-neutral-200">'LLM 입력'</span>
      </motion.div>
    </div>
  );
}

function RightDiagram() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative" style={{ width: RIGHT_W, height: RIGHT_H }}>
        <svg
          className="pointer-events-none absolute inset-0"
          viewBox={`0 0 ${RIGHT_W} ${RIGHT_H}`}
          width={RIGHT_W}
          height={RIGHT_H}
        >
          {SOURCES.map((_, i) => {
            const y = STACK_TOP + i * (CARD_H + CARD_GAP) + CARD_H / 2;
            const x1 = CARD_X + CARD_W + 2;
            const x2 = R_LLM_CX - R_LLM_R - 2;
            const c1x = x1 + (x2 - x1) * 0.55;
            const c2x = x1 + (x2 - x1) * 0.75;
            return (
              <motion.path
                key={i}
                d={`M ${x1},${y} C ${c1x},${y} ${c2x},${R_LLM_CY} ${x2},${R_LLM_CY}`}
                fill="none"
                stroke="rgb(167 139 250 / 0.55)"
                strokeWidth={1.4}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 0.55,
                  delay: D.rightLines + i * 0.06,
                }}
              />
            );
          })}
        </svg>

        {SOURCES.map((src, i) => (
          <motion.div
            key={src.label}
            className={`absolute flex items-center rounded-md border px-3.5 text-sm ${src.card}`}
            style={{
              left: CARD_X,
              top: STACK_TOP + i * (CARD_H + CARD_GAP),
              width: CARD_W,
              height: CARD_H,
            }}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: D.rightCards + i * 0.07 }}
          >
            {src.label}
          </motion.div>
        ))}

        <motion.div
          className="absolute"
          style={{
            left: R_LLM_CX - R_LLM_R,
            top: R_LLM_CY - R_LLM_R,
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: D.rightLlm }}
        >
          <LLMBadge size={R_LLM_R * 2} />
        </motion.div>
      </div>

      <motion.div
        className="text-center text-xl text-neutral-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: D.rightCaption }}
      >
        좀 더 확장된 의미의,{" "}
        <span className="text-neutral-200">'LLM에게 주어지는 정보'</span>
      </motion.div>
    </div>
  );
}
